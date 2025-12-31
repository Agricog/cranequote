import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/layout';
import {
  Calculator,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  HelpCircle,
  ArrowRight,
  Scale,
  PoundSterling,
  Truck,
  FileText,
  AlertTriangle,
  Info,
  Plus,
  Minus,
  ClipboardList
} from 'lucide-react';
import { craneTypes, getCraneById } from '../data/craneTypes';
import { regions, getRegionById } from '../data/regions';
import { calculateHireCost, calculateTransportCost, formatRange, ancillaryCosts } from '../data/pricingData';

const faqs = [
  {
    q: 'What costs are involved in a crane hire project?',
    a: 'A complete crane hire project typically includes: crane hire (daily/weekly rate), transport (delivery and collection), operator (usually included), slingers/banksmen, permits (road closures, airspace), insurance, and potentially an Appointed Person for CPA hire. Contract lift includes most of these; CPA hire requires you to arrange several separately.'
  },
  {
    q: 'How much does a complete crane hire project cost?',
    a: 'Total project costs vary widely. A simple one-day lift with a city crane might cost £800-1,500 all-in. A week-long project with a 100t mobile crane could be £8,000-15,000. Complex heavy lifts with large cranes, multiple crew, and permits can exceed £20,000+. Our calculator helps you build an accurate budget.'
  },
  {
    q: 'Is contract lift more expensive overall?',
    a: 'Contract lift has a higher daily rate (typically 80-120% more than CPA), but includes services you would otherwise pay for separately: Appointed Person (£400-800/day), slingers (£160-280/day each), insurance, and lift planning. For one-off lifts, the total cost difference is often smaller than expected, and you get peace of mind.'
  },
  {
    q: 'How many slingers do I need?',
    a: 'Most lifts require at least one slinger/signaller. Complex lifts, blind lifts, or tandem operations typically need two or more. The Appointed Person determines crew requirements based on the lift plan. For CPA hire, you must provide slingers; for contract lift, they are included.'
  },
  {
    q: 'What permits might I need for crane work?',
    a: 'Common permits include: road/lane closures (if outriggers extend into roads), lifting over highways, working near airports or flight paths, and planning permission for tower crane installation. Permit costs range from £50-500+ depending on requirements. Contract lift providers usually handle permits for you.'
  },
  {
    q: 'How can I reduce my total crane hire costs?',
    a: 'Cost-saving strategies include: booking in advance, hiring for full weeks (10% discount) or months (20% discount), choosing a crane company with a nearby depot, combining multiple lifts into one hire period, ensuring good site access, and having accurate lift specifications to avoid delays.'
  },
  {
    q: 'Should I budget extra for contingencies?',
    a: 'Yes, we recommend adding 10-15% contingency for unexpected delays, weather hold-ups, or additional requirements discovered on site. Crane hire often involves waiting time charges if the crane cannot work due to site issues, so good preparation saves money.'
  },
  {
    q: 'Are weekend or night lifts more expensive?',
    a: 'Yes, out-of-hours work typically incurs premium charges: weekends usually add 50% to labour costs, and night work can add 50-100%. Some urban areas require night-time lifts due to traffic restrictions, so factor this into your budget when planning.'
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
    description: 'Get hire price estimates',
    href: '/crane-hire-cost-calculator',
    icon: PoundSterling,
    color: 'text-green-600',
    bg: 'bg-green-50 hover:bg-green-100'
  },
  {
    title: 'CPA vs Contract Lift',
    description: 'Compare hire options',
    href: '/cpa-vs-contract-lift',
    icon: FileText,
    color: 'text-purple-600',
    bg: 'bg-purple-50 hover:bg-purple-100'
  }
];

interface ProjectCostResult {
  craneName: string;
  tonnageLabel: string;
  regionName: string;
  duration: number;
  hireType: 'cpa' | 'contract';
  
  hireCost: { min: number; max: number };
  transportCost: { min: number; max: number };
  crewCost: { min: number; max: number };
  permitsCost: { min: number; max: number };
  insuranceCost: { min: number; max: number };
  
  subtotal: { min: number; max: number };
  contingency: { min: number; max: number };
  grandTotal: { min: number; max: number };
  
  perDay: { min: number; max: number };
  
  breakdown: {
    label: string;
    min: number;
    max: number;
    included: boolean;
  }[];
}

export default function TotalProjectCost() {
  const [craneType, setCraneType] = useState('');
  const [tonnage, setTonnage] = useState('');
  const [duration, setDuration] = useState(1);
  const [region, setRegion] = useState('midlands');
  const [hireType, setHireType] = useState<'cpa' | 'contract'>('contract');
  const [transportDistance, setTransportDistance] = useState(25);
  const [numSlingers, setNumSlingers] = useState(1);
  const [needsAP, setNeedsAP] = useState(true);
  const [needsRoadClosure, setNeedsRoadClosure] = useState(false);
  const [needsAirspace, setNeedsAirspace] = useState(false);
  const [contingencyPercent, setContingencyPercent] = useState(10);
  const [result, setResult] = useState<ProjectCostResult | null>(null);

  const selectedCrane = craneType ? getCraneById(craneType) : null;

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

    // Calculate hire cost
    const hireResult = calculateHireCost(
      craneType,
      tonnage,
      duration,
      region,
      hireType === 'contract'
    );

    if (!hireResult) {
      alert('Unable to calculate hire cost');
      return;
    }

    // Calculate transport (return trip)
    const tonnageValue = (tonnageRange.min + tonnageRange.max) / 2;
    const transportResult = calculateTransportCost(tonnageValue, transportDistance);
    const transportCost = {
      min: transportResult.total.min * 2,
      max: transportResult.total.max * 2
    };

    // Calculate crew costs (only for CPA hire)
    let crewCost = { min: 0, max: 0 };
    const breakdown: { label: string; min: number; max: number; included: boolean }[] = [];

    if (hireType === 'cpa') {
      // Slingers
      if (numSlingers > 0) {
        const slingerCost = {
          min: ancillaryCosts.crew.slinger.daily.min * numSlingers * duration,
          max: ancillaryCosts.crew.slinger.daily.max * numSlingers * duration
        };
        crewCost.min += slingerCost.min;
        crewCost.max += slingerCost.max;
        breakdown.push({
          label: `Slinger${numSlingers > 1 ? 's' : ''} (${numSlingers} × ${duration} days)`,
          min: slingerCost.min,
          max: slingerCost.max,
          included: false
        });
      }

      // Appointed Person
      if (needsAP) {
        const apCost = {
          min: ancillaryCosts.crew.operator.daily.min * duration,
          max: ancillaryCosts.crew.operator.daily.max * duration
        };
        crewCost.min += apCost.min;
        crewCost.max += apCost.max;
        breakdown.push({
          label: `Appointed Person (${duration} days)`,
          min: apCost.min,
          max: apCost.max,
          included: false
        });
      }
    }

    // Permits
    let permitsCost = { min: 0, max: 0 };
    if (needsRoadClosure) {
      permitsCost.min += ancillaryCosts.permit.roadClosure.min;
      permitsCost.max += ancillaryCosts.permit.roadClosure.max;
      breakdown.push({
        label: 'Road Closure Permit',
        min: ancillaryCosts.permit.roadClosure.min,
        max: ancillaryCosts.permit.roadClosure.max,
        included: false
      });
    }
    if (needsAirspace) {
      permitsCost.min += ancillaryCosts.permit.airspace.min;
      permitsCost.max += ancillaryCosts.permit.airspace.max;
      breakdown.push({
        label: 'Airspace Permit',
        min: ancillaryCosts.permit.airspace.min,
        max: ancillaryCosts.permit.airspace.max,
        included: false
      });
    }

    // Insurance (only for CPA)
    let insuranceCost = { min: 0, max: 0 };
    if (hireType === 'cpa') {
      insuranceCost = {
        min: ancillaryCosts.insurance.daily.min * duration,
        max: ancillaryCosts.insurance.daily.max * duration
      };
      breakdown.push({
        label: `Lifting Insurance (${duration} days)`,
        min: insuranceCost.min,
        max: insuranceCost.max,
        included: false
      });
    }

    // Calculate totals
    const subtotal = {
      min: hireResult.totalForDuration.min + transportCost.min + crewCost.min + permitsCost.min + insuranceCost.min,
      max: hireResult.totalForDuration.max + transportCost.max + crewCost.max + permitsCost.max + insuranceCost.max
    };

    const contingency = {
      min: Math.round(subtotal.min * (contingencyPercent / 100)),
      max: Math.round(subtotal.max * (contingencyPercent / 100))
    };

    const grandTotal = {
      min: subtotal.min + contingency.min,
      max: subtotal.max + contingency.max
    };

    const perDay = {
      min: Math.round(grandTotal.min / duration),
      max: Math.round(grandTotal.max / duration)
    };

    setResult({
      craneName: crane.name,
      tonnageLabel: tonnage,
      regionName: regionData.name,
      duration,
      hireType,
      hireCost: hireResult.totalForDuration,
      transportCost,
      crewCost,
      permitsCost,
      insuranceCost,
      subtotal,
      contingency,
      grandTotal,
      perDay,
      breakdown
    });
  };

  const resetCalculator = () => {
    setCraneType('');
    setTonnage('');
    setDuration(1);
    setRegion('midlands');
    setHireType('contract');
    setTransportDistance(25);
    setNumSlingers(1);
    setNeedsAP(true);
    setNeedsRoadClosure(false);
    setNeedsAirspace(false);
    setContingencyPercent(10);
    setResult(null);
  };

  return (
    <>
      <SEOHead
        title="Total Crane Hire Project Cost Calculator UK | Complete Budget"
        description="Calculate total crane hire project costs including hire, transport, crew, permits and insurance. Build a complete budget for your UK lifting project with our free calculator."
        keywords="crane hire total cost, crane project budget, crane hire calculator UK, lifting project cost, crane hire quote calculator, crane operation cost, complete crane hire cost"
        canonicalUrl="/total-project-cost"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/#calculators' },
          { name: 'Total Project Cost', url: '/total-project-cost' }
        ]}
        calculatorName="Total Crane Project Cost Calculator"
        aggregateRating={{ value: '4.8', count: '73' }}
        faqs={faqs}
        howToSteps={[
          { name: 'Select Crane', text: 'Choose crane type, tonnage, and hire duration' },
          { name: 'Choose Hire Type', text: 'Select CPA hire or contract lift' },
          { name: 'Add Transport', text: 'Enter distance from depot to site' },
          { name: 'Add Crew & Permits', text: 'Specify slingers, AP, and permit requirements' },
          { name: 'Get Total', text: 'See complete project budget with breakdown' }
        ]}
      />

      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-200 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Total Project Cost</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <ClipboardList className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Total Project Cost Calculator</h1>
              <p className="text-primary-200 mt-1">Build your complete crane hire budget</p>
            </div>
          </div>
          <p className="text-primary-100 max-w-3xl">
            Calculate the total cost of your crane hire project including hire, transport, crew, permits, 
            and contingency. Get a complete budget breakdown in one place.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-primary-200 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Updated January 2026
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              73 ratings
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary-500" />
            Quick Answer: Total Crane Project Costs
          </h2>
          <p className="text-gray-700 quick-answer">
            <strong>Total crane hire project costs typically range from £800 for a simple one-day lift to £20,000+ for complex multi-day operations.</strong> Costs include: crane hire (40-60% of total), transport (10-20%), crew (15-25% for CPA), and permits/insurance (5-15%). Contract lift simplifies budgeting by including most costs in one rate.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary-500" />
              Build Your Budget
            </h2>

            <div className="space-y-6">
              {/* Crane Selection */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary-500" />
                  Crane Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-700 block mb-1">Crane Type</label>
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
                      <label className="text-sm text-gray-700 block mb-1">Tonnage</label>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-700 block mb-1">Duration (days)</label>
                      <input
                        type="number"
                        min="1"
                        value={duration}
                        onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 block mb-1">Region</label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="select"
                      >
                        {regions.map((r) => (
                          <option key={r.id} value={r.id}>{r.shortName}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hire Type */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-500" />
                  Hire Type
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setHireType('cpa')}
                    className={`p-3 rounded-xl text-left transition border-2 ${
                      hireType === 'cpa'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className={`font-bold text-sm ${hireType === 'cpa' ? 'text-primary-700' : 'text-gray-900'}`}>
                      CPA Hire
                    </p>
                    <p className="text-xs text-gray-500">Crane + operator</p>
                  </button>
                  <button
                    onClick={() => setHireType('contract')}
                    className={`p-3 rounded-xl text-left transition border-2 ${
                      hireType === 'contract'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className={`font-bold text-sm ${hireType === 'contract' ? 'text-primary-700' : 'text-gray-900'}`}>
                      Contract Lift
                    </p>
                    <p className="text-xs text-gray-500">Fully managed</p>
                  </button>
                </div>
              </div>

              {/* Transport */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary-500" />
                  Transport
                </h3>
                <div>
                  <label className="text-sm text-gray-700 block mb-1">Distance from depot (miles)</label>
                  <input
                    type="number"
                    min="1"
                    value={transportDistance}
                    onChange={(e) => setTransportDistance(Math.max(1, parseInt(e.target.value) || 1))}
                    className="input"
                  />
                  <p className="text-xs text-gray-500 mt-1">Return trip (delivery + collection) included</p>
                </div>
              </div>

              {/* Crew - CPA only */}
              {hireType === 'cpa' && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Crew (CPA Hire)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-700 block mb-2">Number of Slingers</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setNumSlingers(Math.max(0, numSlingers - 1))}
                          className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-xl font-bold w-8 text-center">{numSlingers}</span>
                        <button
                          onClick={() => setNumSlingers(numSlingers + 1)}
                          className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="needsAP"
                        checked={needsAP}
                        onChange={(e) => setNeedsAP(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <label htmlFor="needsAP" className="text-sm text-gray-700">
                        Appointed Person required (£400-800/day)
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {hireType === 'contract' && (
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <p className="text-purple-800 text-sm flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Contract lift includes Appointed Person, slingers, and lifting insurance in the rate.</span>
                  </p>
                </div>
              )}

              {/* Permits */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-500" />
                  Permits Required
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="roadClosure"
                      checked={needsRoadClosure}
                      onChange={(e) => setNeedsRoadClosure(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300"
                    />
                    <label htmlFor="roadClosure" className="text-sm text-gray-700">
                      Road/lane closure (£100-250)
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="airspace"
                      checked={needsAirspace}
                      onChange={(e) => setNeedsAirspace(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300"
                    />
                    <label htmlFor="airspace" className="text-sm text-gray-700">
                      Airspace permit (£150-300)
                    </label>
                  </div>
                </div>
              </div>

              {/* Contingency */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary-500" />
                  Contingency
                </h3>
                <div className="flex items-center gap-4">
                  {[0, 5, 10, 15, 20].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setContingencyPercent(pct)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        contingencyPercent === pct
                          ? 'bg-primary-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Recommended: 10-15% for weather delays and unforeseen issues</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={calculate}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Total
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
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-semibold text-primary-100 mb-2">Total Project Cost</h3>
                  <p className="text-4xl md:text-5xl font-bold mb-1">
                    {formatRange(result.grandTotal.min, result.grandTotal.max)}
                  </p>
                  <p className="text-primary-200 text-sm">
                    {result.craneName} ({result.tonnageLabel}) • {result.duration} day{result.duration > 1 ? 's' : ''} • {result.hireType === 'contract' ? 'Contract Lift' : 'CPA Hire'}
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-sm">
                    <span className="text-primary-200">Effective cost per day</span>
                    <span className="font-semibold">{formatRange(result.perDay.min, result.perDay.max)}</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Cost Breakdown</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Crane Hire ({result.duration} days)</span>
                      <span className="font-medium">{formatRange(result.hireCost.min, result.hireCost.max)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Transport (return trip)</span>
                      <span className="font-medium">{formatRange(result.transportCost.min, result.transportCost.max)}</span>
                    </div>
                    
                    {result.hireType === 'cpa' && result.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-medium">{formatRange(item.min, item.max)}</span>
                      </div>
                    ))}

                    {result.hireType === 'contract' && (
                      <div className="flex justify-between py-2 border-b text-green-600">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          Crew & Insurance
                        </span>
                        <span className="font-medium">Included</span>
                      </div>
                    )}

                    {(result.permitsCost.min > 0 || result.permitsCost.max > 0) && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Permits</span>
                        <span className="font-medium">{formatRange(result.permitsCost.min, result.permitsCost.max)}</span>
                      </div>
                    )}

                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600 font-medium">Subtotal</span>
                      <span className="font-medium">{formatRange(result.subtotal.min, result.subtotal.max)}</span>
                    </div>

                    {contingencyPercent > 0 && (
                      <div className="flex justify-between py-2 border-b text-amber-700">
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          Contingency ({contingencyPercent}%)
                        </span>
                        <span className="font-medium">{formatRange(result.contingency.min, result.contingency.max)}</span>
                      </div>
                    )}

                    <div className="flex justify-between py-3 text-lg font-bold">
                      <span>Grand Total</span>
                      <span className="text-primary-600">{formatRange(result.grandTotal.min, result.grandTotal.max)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Budget Notes
                  </h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Prices are estimates based on typical UK market rates</li>
                    <li>• Weekend/night work may incur 50%+ premium</li>
                    <li>• Waiting time may be charged if crane cannot work</li>
                    <li>• Get formal quotes to confirm actual prices</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-6 text-center">
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Get Real Quotes</h3>
                  <p className="text-primary-800 mb-4">Compare actual prices from crane companies</p>
                  <Link to="/get-quotes" className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                    Get Free Quotes
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Build Your Project Budget</h3>
                <p className="text-gray-500">
                  Configure your crane hire requirements to see a complete cost breakdown.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What's Included Comparison */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What's Included in Each Hire Type?</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Cost Item</th>
                  <th className="text-center py-4 px-4 font-semibold text-blue-700">CPA Hire</th>
                  <th className="text-center py-4 px-4 font-semibold text-purple-700">Contract Lift</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: 'Crane', cpa: true, contract: true },
                  { item: 'Operator', cpa: true, contract: true },
                  { item: 'Transport', cpa: 'Extra', contract: 'Often included' },
                  { item: 'Appointed Person', cpa: 'You provide', contract: true },
                  { item: 'Lift Plan', cpa: 'You provide', contract: true },
                  { item: 'Slingers/Banksmen', cpa: 'You provide', contract: true },
                  { item: 'Lifting Insurance', cpa: 'You provide', contract: true },
                  { item: 'Full Liability', cpa: 'Your responsibility', contract: 'Crane company' }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">{row.item}</td>
                    <td className="py-3 px-4 text-center">
                      {row.cpa === true ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-sm text-gray-600">{row.cpa}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.contract === true ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-sm text-gray-600">{row.contract}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Get Real Quotes?
          </h2>
          <p className="text-primary-100 mb-6">
            Compare actual prices from up to 3 crane hire companies in your area.
          </p>
          <Link to="/get-quotes" className="inline-flex items-center gap-2 btn-accent">
            Get Free Quotes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Last updated: January 2026
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            UK crane hire pricing
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            Based on industry data
          </span>
        </div>
      </section>
    </>
  );
}
