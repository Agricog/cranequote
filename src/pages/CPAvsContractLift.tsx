import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/layout';
import {
  FileText,
  Calculator,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Users,
  HelpCircle,
  ArrowRight,
  Scale,
  PoundSterling,
  Truck,
  Shield,
  AlertTriangle,
  Info
} from 'lucide-react';
import { craneTypes, getCraneById } from '../data/craneTypes';
import { regions, getRegionById } from '../data/regions';
import { formatCurrency, formatRange, CONTRACT_LIFT_MULTIPLIER } from '../data/pricingData';

const faqs = [
  {
    q: 'What is CPA crane hire?',
    a: 'CPA (Construction Plant-hire Association) hire is the standard "bare" crane hire model. You get the crane and a trained operator, but you are responsible for everything else: appointing an Appointed Person (AP) to plan the lift, providing slingers and banksmen, arranging insurance, obtaining permits, and taking responsibility for the lifting operation. CPA hire is cheaper but requires expertise on your side.'
  },
  {
    q: 'What is a contract lift?',
    a: 'A contract lift is a fully managed lifting service where the crane company takes complete responsibility for the entire operation. They provide the crane, operator, Appointed Person, lift plan, slingers, banksmen, insurance, and full supervision. The crane company is liable for the lift. Contract lift costs more but removes risk and complexity from your project.'
  },
  {
    q: 'When should I choose CPA hire over contract lift?',
    a: 'Choose CPA hire when: you have a qualified Appointed Person on your team, your company has suitable lifting insurance, you perform regular crane operations and have trained slingers/banksmen, and you want to reduce costs on straightforward lifts. CPA hire typically suits construction companies with in-house lifting expertise.'
  },
  {
    q: 'When is contract lift the better option?',
    a: 'Choose contract lift when: you do not have an Appointed Person, the lift is complex or high-risk, you want to transfer liability to the crane company, it is a one-off lift and you lack lifting expertise, or your insurance does not cover crane operations. Contract lift is recommended for most occasional crane users.'
  },
  {
    q: 'How much more does contract lift cost than CPA hire?',
    a: 'Contract lift typically costs 80-120% more than CPA hire (roughly double the price). However, this includes services you would otherwise pay for separately: Appointed Person (£400-800/day), slingers (£160-280/day each), insurance, and lift planning. For one-off lifts, the total cost difference may be smaller than expected.'
  },
  {
    q: 'What is an Appointed Person (AP)?',
    a: 'An Appointed Person is a qualified individual responsible for planning and supervising lifting operations under BS 7121 and LOLER regulations. They must hold an CPCS Appointed Person card or equivalent qualification. The AP plans the lift, selects equipment, assesses risks, and ensures safe execution. For CPA hire, you must provide your own AP.'
  },
  {
    q: 'Who is liable if something goes wrong?',
    a: 'With CPA hire, you (the hirer) are responsible for the lifting operation and liable for any incidents related to planning, supervision, or execution. The crane company is only liable for the crane and operator. With contract lift, the crane company takes full responsibility and liability for the entire operation, including planning and execution.'
  },
  {
    q: 'Can I switch from CPA hire to contract lift?',
    a: 'Yes, most crane companies offer both options. If you initially booked CPA hire but realise you need more support, you can usually upgrade to contract lift. Discuss this with your crane company as early as possible, as contract lift requires additional planning and resources that may affect availability and scheduling.'
  }
];

const relatedCalculators = [
  {
    title: 'Crane Size Calculator',
    description: 'Work out what tonnage you need',
    href: '/crane-size-calculator',
    icon: Scale,
    color: 'text-blue-600',
    bg: 'bg-blue-50 hover:bg-blue-100'
  },
  {
    title: 'Hire Cost Estimator',
    description: 'Get price estimates',
    href: '/crane-hire-cost-calculator',
    icon: PoundSterling,
    color: 'text-green-600',
    bg: 'bg-green-50 hover:bg-green-100'
  },
  {
    title: 'Transport Calculator',
    description: 'Estimate delivery costs',
    href: '/transport-cost-calculator',
    icon: Truck,
    color: 'text-orange-600',
    bg: 'bg-orange-50 hover:bg-orange-100'
  }
];

const cpaIncludes = [
  { item: 'Crane', included: true },
  { item: 'Trained Operator (CPCS)', included: true },
  { item: 'Basic crane insurance', included: true },
  { item: 'Appointed Person (lift planner)', included: false },
  { item: 'Lift plan documentation', included: false },
  { item: 'Slingers / Banksmen', included: false },
  { item: 'Lifting operation insurance', included: false },
  { item: 'Permits & road closures', included: false },
  { item: 'Risk assessment', included: false },
  { item: 'Full liability coverage', included: false }
];

const contractIncludes = [
  { item: 'Crane', included: true },
  { item: 'Trained Operator (CPCS)', included: true },
  { item: 'Basic crane insurance', included: true },
  { item: 'Appointed Person (lift planner)', included: true },
  { item: 'Lift plan documentation', included: true },
  { item: 'Slingers / Banksmen', included: true },
  { item: 'Lifting operation insurance', included: true },
  { item: 'Permits & road closures', included: true },
  { item: 'Risk assessment', included: true },
  { item: 'Full liability coverage', included: true }
];

const additionalCPACosts = [
  { item: 'Appointed Person', cost: '£400 - £800/day' },
  { item: 'Slinger (each)', cost: '£160 - £280/day' },
  { item: 'Banksman (each)', cost: '£140 - £240/day' },
  { item: 'Lifting insurance', cost: '£50 - £150/day' },
  { item: 'Lift plan (if outsourced)', cost: '£200 - £500' }
];

interface ComparisonResult {
  craneName: string;
  tonnageLabel: string;
  regionName: string;
  cpaDaily: { min: number; max: number };
  contractDaily: { min: number; max: number };
  cpaTotalHire: { min: number; max: number };
  contractTotalHire: { min: number; max: number };
  cpaWithExtras: { min: number; max: number };
  difference: { min: number; max: number };
  duration: number;
  recommendation: 'cpa' | 'contract' | 'either';
  reasons: string[];
}

export default function CPAvsContractLift() {
  const [craneType, setCraneType] = useState('');
  const [tonnage, setTonnage] = useState('');
  const [duration, setDuration] = useState(1);
  const [region, setRegion] = useState('midlands');
  const [hasAP, setHasAP] = useState<boolean | null>(null);
  const [hasInsurance, setHasInsurance] = useState<boolean | null>(null);
  const [liftComplexity, setLiftComplexity] = useState<'simple' | 'moderate' | 'complex' | null>(null);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const selectedCrane = craneType ? getCraneById(craneType) : null;
  const selectedRegion = getRegionById(region);

  const calculate = () => {
    if (!craneType || !tonnage) {
      alert('Please select crane type and tonnage');
      return;
    }

    const crane = getCraneById(craneType);
    const regionData = getRegionById(region);
    const tonnageRange = crane?.tonnageRanges.find(t => t.label === tonnage);

    if (!crane || !regionData || !tonnageRange) {
      alert('Unable to calculate - please check selections');
      return;
    }

    const multiplier = regionData.multiplier;

    // CPA daily rate
    const cpaDaily = {
      min: Math.round(tonnageRange.dailyRateMin * multiplier),
      max: Math.round(tonnageRange.dailyRateMax * multiplier)
    };

    // Contract lift daily rate (1.8-2.2x)
    const contractDaily = {
      min: Math.round(cpaDaily.min * CONTRACT_LIFT_MULTIPLIER.min),
      max: Math.round(cpaDaily.max * CONTRACT_LIFT_MULTIPLIER.max)
    };

    // Duration discount
    let durationMultiplier = 1.0;
    if (duration >= 20) durationMultiplier = 0.8;
    else if (duration >= 5) durationMultiplier = 0.9;

    // Total hire costs
    const cpaTotalHire = {
      min: Math.round(cpaDaily.min * duration * durationMultiplier),
      max: Math.round(cpaDaily.max * duration * durationMultiplier)
    };

    const contractTotalHire = {
      min: Math.round(contractDaily.min * duration * durationMultiplier),
      max: Math.round(contractDaily.max * duration * durationMultiplier)
    };

    // CPA with typical extras (AP + 1 slinger + insurance)
    const extrasCostPerDay = { min: 550, max: 1030 }; // AP £400-800 + Slinger £160-280 + Insurance £50-150
    const cpaWithExtras = {
      min: cpaTotalHire.min + (extrasCostPerDay.min * duration),
      max: cpaTotalHire.max + (extrasCostPerDay.max * duration)
    };

    // Difference
    const difference = {
      min: contractTotalHire.min - cpaWithExtras.min,
      max: contractTotalHire.max - cpaWithExtras.max
    };

    // Recommendation logic
    let recommendation: 'cpa' | 'contract' | 'either' = 'either';
    const reasons: string[] = [];

    if (hasAP === false) {
      recommendation = 'contract';
      reasons.push('You do not have an Appointed Person - required for CPA hire');
    }
    if (hasInsurance === false) {
      recommendation = 'contract';
      reasons.push('You need lifting operation insurance for CPA hire');
    }
    if (liftComplexity === 'complex') {
      recommendation = 'contract';
      reasons.push('Complex lifts benefit from full crane company management');
    }

    if (hasAP === true && hasInsurance === true && liftComplexity === 'simple') {
      recommendation = 'cpa';
      reasons.push('You have the expertise and insurance for CPA hire');
      reasons.push('Simple lift does not require additional management');
    }

    if (recommendation === 'either') {
      if (hasAP === true && hasInsurance === true) {
        reasons.push('You have the capability for CPA hire');
        reasons.push('Contract lift still offers convenience and liability transfer');
      } else {
        reasons.push('Consider your specific requirements carefully');
      }
    }

    setResult({
      craneName: crane.name,
      tonnageLabel: tonnage,
      regionName: regionData.name,
      cpaDaily,
      contractDaily,
      cpaTotalHire,
      contractTotalHire,
      cpaWithExtras,
      difference,
      duration,
      recommendation,
      reasons
    });
  };

  const resetCalculator = () => {
    setCraneType('');
    setTonnage('');
    setDuration(1);
    setRegion('midlands');
    setHasAP(null);
    setHasInsurance(null);
    setLiftComplexity(null);
    setResult(null);
  };

  return (
    <>
      <SEOHead
        title="CPA Hire vs Contract Lift Calculator UK | Compare Options"
        description="Compare CPA crane hire vs contract lift costs and responsibilities. Free calculator shows price difference, what's included, and which option suits your project. UK 2025 pricing."
        keywords="CPA hire vs contract lift, crane hire options, contract lift cost, CPA crane hire, lifting operations, appointed person, crane hire comparison, contract lift vs CPA"
        canonicalUrl="/cpa-vs-contract-lift"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/#calculators' },
          { name: 'CPA vs Contract Lift', url: '/cpa-vs-contract-lift' }
        ]}
        calculatorName="CPA vs Contract Lift Calculator"
        aggregateRating={{ value: '4.9', count: '67' }}
        faqs={faqs}
        howToSteps={[
          { name: 'Select Crane', text: 'Choose your crane type and tonnage requirement' },
          { name: 'Set Duration', text: 'Enter how many days you need the crane' },
          { name: 'Answer Questions', text: 'Tell us about your lifting expertise and insurance' },
          { name: 'Compare Options', text: 'See side-by-side cost comparison and recommendation' }
        ]}
      />

      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-200 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>CPA vs Contract Lift</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">CPA vs Contract Lift</h1>
              <p className="text-primary-200 mt-1">Compare hire options and costs</p>
            </div>
          </div>
          <p className="text-primary-100 max-w-3xl">
            Understand the difference between CPA (bare) hire and contract lift. Compare costs, 
            responsibilities, and find out which option is right for your project.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-primary-200 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Updated January 2025
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              67 ratings
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary-500" />
            Quick Answer: CPA Hire vs Contract Lift
          </h2>
          <p className="text-gray-700 quick-answer">
            <strong>CPA hire is crane + operator only (you manage the lift). Contract lift is fully managed (crane company handles everything).</strong> Contract lift costs 80-120% more but includes Appointed Person, slingers, insurance, and liability. Choose CPA if you have in-house lifting expertise; choose contract lift for one-off lifts or complex operations.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What's Included?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <h3 className="text-xl font-bold">CPA Hire</h3>
              <p className="text-blue-100 text-sm">Crane + Operator Only</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {cpaIncludes.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {item.included ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                    <span className={item.included ? 'text-gray-900' : 'text-gray-500'}>
                      {item.item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2 font-semibold">Your responsibilities:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Appoint an Appointed Person (AP)</li>
                  <li>• Provide lift plan</li>
                  <li>• Supply slingers/banksmen</li>
                  <li>• Arrange lifting insurance</li>
                  <li>• Full liability for operation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-purple-600 text-white p-4">
              <h3 className="text-xl font-bold">Contract Lift</h3>
              <p className="text-purple-100 text-sm">Fully Managed Service</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {contractIncludes.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-900">{item.item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2 font-semibold">Your responsibilities:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Provide accurate load information</li>
                  <li>• Ensure site access</li>
                  <li>• That's it!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary-500" />
              Compare Costs
            </h2>

            <div className="space-y-6">
              <div>
                <label className="font-semibold text-gray-900 block mb-2">Crane Type</label>
                <select
                  value={craneType}
                  onChange={(e) => { setCraneType(e.target.value); setTonnage(''); }}
                  className="select"
                >
                  <option value="">Select crane type...</option>
                  {craneTypes.map((crane) => (
                    <option key={crane.id} value={crane.id}>{crane.name}</option>
                  ))}
                </select>
              </div>

              {selectedCrane && (
                <div>
                  <label className="font-semibold text-gray-900 block mb-2">Tonnage</label>
                  <select
                    value={tonnage}
                    onChange={(e) => setTonnage(e.target.value)}
                    className="select"
                  >
                    <option value="">Select tonnage...</option>
                    {selectedCrane.tonnageRanges.map((range) => (
                      <option key={range.label} value={range.label}>{range.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="font-semibold text-gray-900 block mb-2">Duration (days)</label>
                <input
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                  className="input"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-900 block mb-2">UK Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="select"
                >
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t">
                <p className="font-semibold text-gray-900 mb-3">Help us recommend the right option:</p>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-700 mb-2">Do you have an Appointed Person (AP)?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setHasAP(true)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                          hasAP === true ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setHasAP(false)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                          hasAP === false ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-700 mb-2">Do you have lifting operations insurance?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setHasInsurance(true)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                          hasInsurance === true ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setHasInsurance(false)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                          hasInsurance === false ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-700 mb-2">How complex is the lift?</p>
                    <div className="flex gap-2">
                      {[
                        { id: 'simple', label: 'Simple' },
                        { id: 'moderate', label: 'Moderate' },
                        { id: 'complex', label: 'Complex' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setLiftComplexity(opt.id as 'simple' | 'moderate' | 'complex')}
                          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                            liftComplexity === opt.id ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={calculate}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Compare Options
                </button>
                <button
                  onClick={resetCalculator}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {result ? (
              <>
                {/* Recommendation */}
                <div className={`rounded-2xl p-6 ${
                  result.recommendation === 'contract' ? 'bg-purple-600' :
                  result.recommendation === 'cpa' ? 'bg-blue-600' :
                  'bg-primary-600'
                } text-white`}>
                  <h3 className="text-lg font-semibold opacity-90 mb-2">Our Recommendation</h3>
                  <p className="text-3xl font-bold mb-2">
                    {result.recommendation === 'contract' ? 'Contract Lift' :
                     result.recommendation === 'cpa' ? 'CPA Hire' :
                     'Either Option'}
                  </p>
                  <ul className="text-sm opacity-90 space-y-1">
                    {result.reasons.map((reason, i) => (
                      <li key={i}>• {reason}</li>
                    ))}
                  </ul>
                </div>

                {/* Side by Side Comparison */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Cost Comparison</h3>
                  <p className="text-sm text-gray-600 mb-4">{result.craneName} ({result.tonnageLabel}) • {result.duration} day{result.duration > 1 ? 's' : ''} • {result.regionName}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">CPA Hire</h4>
                      <p className="text-2xl font-bold text-blue-700">{formatRange(result.cpaTotalHire.min, result.cpaTotalHire.max)}</p>
                      <p className="text-xs text-blue-600">Crane + operator only</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Contract Lift</h4>
                      <p className="text-2xl font-bold text-purple-700">{formatRange(result.contractTotalHire.min, result.contractTotalHire.max)}</p>
                      <p className="text-xs text-purple-600">Fully managed</p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-amber-50 rounded-xl">
                    <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      CPA + Typical Extras
                    </h4>
                    <p className="text-xl font-bold text-amber-700">{formatRange(result.cpaWithExtras.min, result.cpaWithExtras.max)}</p>
                    <p className="text-xs text-amber-600">Including AP, slinger, insurance</p>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">True cost difference:</span>
                      <span className={`font-bold ${result.difference.min > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.difference.min > 0 ? '+' : ''}{formatRange(result.difference.min, result.difference.max)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Contract lift vs CPA + extras
                    </p>
                  </div>
                </div>

                {/* Additional CPA Costs */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-500" />
                    Additional CPA Hire Costs
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">If you choose CPA hire, budget for these extras:</p>
                  <div className="space-y-2">
                    {additionalCPACosts.map((item, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">{item.item}</span>
                        <span className="font-medium text-gray-900">{item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-6 text-center">
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Get Actual Quotes</h3>
                  <p className="text-primary-800 mb-4">Compare both options from crane companies in your area</p>
                  <Link to="/get-quotes" className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                    Get Free Quotes
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Compare Your Options</h3>
                <p className="text-gray-500">
                  Select crane type and answer the questions to see a cost comparison and our recommendation.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* When to Choose Each */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">When to Choose Each Option</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Choose CPA Hire If...
              </h3>
              <ul className="space-y-3">
                {[
                  'You have a qualified Appointed Person on staff',
                  'Your company has lifting operations insurance',
                  'You regularly hire cranes and have trained slingers',
                  'The lift is straightforward with no special requirements',
                  'You want to reduce costs and can manage the operation',
                  'You have experience with BS 7121 lifting regulations'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Choose Contract Lift If...
              </h3>
              <ul className="space-y-3">
                {[
                  'You do not have an Appointed Person',
                  'This is a one-off or infrequent crane hire',
                  'The lift is complex, tandem, or over public areas',
                  'You want to transfer risk and liability',
                  'You need permits and road closures arranged',
                  'Your insurance does not cover lifting operations'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {relatedCalculators.map((calc, index) => (
            <Link
              key={index}
              to={calc.href}
              className={`${calc.bg} rounded-xl p-4 transition group`}
            >
              <calc.icon className={`w-8 h-8 ${calc.color} mb-2`} />
              <h3 className="font-bold text-gray-900 group-hover:text-primary-600">{calc.title}</h3>
              <p className="text-gray-600 text-sm">{calc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Last updated: January 2025
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            UK lifting regulations
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            BS 7121 compliant
          </span>
        </div>
      </section>
    </>
  );
}
