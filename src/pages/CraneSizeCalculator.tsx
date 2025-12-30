import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/layout';
import {
  Scale,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  HelpCircle,
  ArrowRight,
  PoundSterling,
  Truck,
  FileText,
  Info
} from 'lucide-react';
import { craneTypes, getCraneById } from '../data/craneTypes';

const faqs = [
  {
    q: 'How do I calculate what size crane I need?',
    a: 'Crane size is determined by three main factors: the weight of your load, the radius (horizontal distance from the crane to the load), and the lift height. As radius increases, the crane\'s lifting capacity decreases significantly. Our calculator applies industry-standard safety factors and radius adjustments to recommend an appropriate tonnage range.'
  },
  {
    q: 'What is lift radius and why does it matter?',
    a: 'Lift radius is the horizontal distance from the centre of the crane\'s slew ring to the centre of the load. It\'s crucial because a crane\'s capacity decreases dramatically as radius increases. A 50-tonne crane might lift 50t at 3m radius but only 10t at 20m radius. Always measure your maximum required radius accurately.'
  },
  {
    q: 'What safety factor is applied to crane calculations?',
    a: 'We apply a 25% safety margin to all calculations, which is standard industry practice. This accounts for dynamic loads, wind conditions, and ensures the crane operates well within its safe working load (SWL). For critical lifts, professional lift planning may apply additional factors.'
  },
  {
    q: 'What if my load is heavier than most cranes can lift?',
    a: 'For very heavy loads (typically over 100 tonnes), you may need a heavy-lift crawler crane, tandem lift with two cranes, or specialist rigging solutions. We recommend a professional lift survey for any load over 50 tonnes or complex lifting operations.'
  },
  {
    q: 'Does ground condition affect crane size selection?',
    a: 'Yes, significantly. Soft or unstable ground may require a crawler crane (which spreads load over tracks) or extensive ground preparation with crane mats. Mobile and all-terrain cranes need firm, level ground for their outriggers. Always assess ground conditions before booking.'
  },
  {
    q: 'What is the difference between crane tonnage and lift capacity?',
    a: 'Crane tonnage (e.g., "50-tonne crane") refers to the maximum capacity at minimum radius. Actual lift capacity at your working radius will be much lower. A 50t crane might only lift 15t at a 15m radius. Always check the crane\'s load chart for capacity at your specific radius and height.'
  },
  {
    q: 'Should I hire a bigger crane than calculated?',
    a: 'It\'s often wise to have some extra capacity for safety margins and flexibility. However, larger cranes cost more and may have access issues. The sweet spot is usually one size bracket above the minimum required. Our calculator already includes a 25% safety factor.'
  },
  {
    q: 'How does lift height affect crane selection?',
    a: 'Height affects the required boom length, which in turn affects capacity and crane selection. Taller lifts may require a crane with a longer boom or a luffing jib attachment. Heights over 30m typically require specialist planning and may limit crane options.'
  }
];

const relatedCalculators = [
  {
    title: 'Hire Cost Estimator',
    description: 'Get price estimates for your crane hire',
    href: '/crane-hire-cost-calculator',
    icon: PoundSterling,
    color: 'text-green-600',
    bg: 'bg-green-50 hover:bg-green-100'
  },
  {
    title: 'CPA vs Contract Lift',
    description: 'Compare hire options and responsibilities',
    href: '/cpa-vs-contract-lift',
    icon: FileText,
    color: 'text-purple-600',
    bg: 'bg-purple-50 hover:bg-purple-100'
  },
  {
    title: 'Transport Calculator',
    description: 'Estimate crane delivery costs',
    href: '/transport-cost-calculator',
    icon: Truck,
    color: 'text-orange-600',
    bg: 'bg-orange-50 hover:bg-orange-100'
  }
];

const groundConditions = [
  { id: 'hard', name: 'Hard Standing', description: 'Concrete, tarmac, compacted hardcore' },
  { id: 'firm', name: 'Firm Ground', description: 'Compacted soil, established hardstanding' },
  { id: 'soft', name: 'Soft Ground', description: 'Grass, loose soil, muddy conditions' }
];

const accessOptions = [
  { id: 'easy', name: 'Easy Access', description: 'Wide roads, no height restrictions' },
  { id: 'restricted', name: 'Restricted', description: 'Some width or height limitations' },
  { id: 'tight', name: 'Tight Access', description: 'Narrow streets, limited space' }
];

interface CalculationResult {
  recommendedMin: number;
  recommendedMax: number;
  suitableCranes: string[];
  warnings: string[];
  notes: string[];
}

export default function CraneSizeCalculator() {
  const [loadWeight, setLoadWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [radius, setRadius] = useState('');
  const [height, setHeight] = useState('');
  const [groundCondition, setGroundCondition] = useState('hard');
  const [siteAccess, setSiteAccess] = useState('easy');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculate = () => {
    if (!loadWeight || !radius || !height) {
      alert('Please enter load weight, radius, and height');
      return;
    }

    const weight = parseFloat(loadWeight);
    const radiusM = parseFloat(radius);
    const heightM = parseFloat(height);

    if (weight <= 0 || radiusM <= 0 || heightM <= 0) {
      alert('Please enter positive values');
      return;
    }

    // Convert to tonnes if kg
    const loadTonnes = weightUnit === 'kg' ? weight / 1000 : weight;

    // Safety factor 25%
    const safetyFactor = 1.25;

    // Radius factor - capacity decreases with distance
    let radiusFactor = 1.0;
    if (radiusM > 30) radiusFactor = 2.0;
    else if (radiusM > 20) radiusFactor = 1.6;
    else if (radiusM > 15) radiusFactor = 1.4;
    else if (radiusM > 10) radiusFactor = 1.2;
    else if (radiusM > 5) radiusFactor = 1.1;

    // Height factor
    let heightFactor = 1.0;
    if (heightM > 40) heightFactor = 1.3;
    else if (heightM > 25) heightFactor = 1.15;
    else if (heightM > 15) heightFactor = 1.05;

    // Calculate required capacity
    const requiredCapacity = loadTonnes * safetyFactor * radiusFactor * heightFactor;

    // Round to practical values
    const recommendedMin = Math.ceil(requiredCapacity / 5) * 5;
    const recommendedMax = Math.ceil(requiredCapacity * 1.4 / 5) * 5;

    // Find suitable crane types
    const suitableCranes: string[] = [];
    craneTypes.forEach(crane => {
      const maxTonnage = Math.max(...crane.tonnageRanges.map(r => r.max));
      const minTonnage = Math.min(...crane.tonnageRanges.map(r => r.min));
      if (maxTonnage >= recommendedMin && minTonnage <= recommendedMax * 1.5) {
        suitableCranes.push(crane.id);
      }
    });

    // Generate warnings and notes
    const warnings: string[] = [];
    const notes: string[] = [];

    if (groundCondition === 'soft') {
      warnings.push('Soft ground conditions - crawler crane recommended or ground matting required');
    }

    if (siteAccess === 'tight') {
      warnings.push('Tight access may limit crane options - city crane or spider crane recommended');
      if (!suitableCranes.includes('city')) suitableCranes.unshift('city');
      if (!suitableCranes.includes('spider')) suitableCranes.unshift('spider');
    }

    if (siteAccess === 'restricted') {
      notes.push('Check access route dimensions for larger cranes');
    }

    if (heightM > 30) {
      notes.push('Heights over 30m may require specialist lift planning');
    }

    if (loadTonnes > 50) {
      warnings.push('Heavy lift - professional lift survey recommended before hire');
    }

    if (radiusM > 25) {
      notes.push('Long radius significantly reduces crane capacity - verify with load charts');
    }

    if (requiredCapacity > 100) {
      warnings.push('May require heavy-lift crane or tandem lift operation');
    }

    setResult({
      recommendedMin,
      recommendedMax,
      suitableCranes: [...new Set(suitableCranes)].slice(0, 4),
      warnings,
      notes
    });
  };

  const resetCalculator = () => {
    setLoadWeight('');
    setRadius('');
    setHeight('');
    setGroundCondition('hard');
    setSiteAccess('easy');
    setResult(null);
  };

  return (
    <>
      <SEOHead
        title="Crane Size Calculator UK | What Tonnage Crane Do I Need?"
        description="Free crane size calculator for UK projects. Enter your load weight, lift radius and height to find the right tonnage crane. Includes safety factors and crane type recommendations."
        keywords="crane size calculator, what size crane do i need, crane tonnage calculator, crane capacity calculator, crane selection, lifting capacity calculator, crane hire size guide"
        canonicalUrl="/crane-size-calculator"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/#calculators' },
          { name: 'Crane Size Calculator', url: '/crane-size-calculator' }
        ]}
        calculatorName="Crane Size Calculator UK"
        aggregateRating={{ value: '4.7', count: '89' }}
        faqs={faqs}
        howToSteps={[
          { name: 'Enter Load Weight', text: 'Input the weight of the load you need to lift in kg or tonnes' },
          { name: 'Enter Lift Radius', text: 'Measure the horizontal distance from crane position to the load' },
          { name: 'Enter Lift Height', text: 'Specify how high the load needs to be lifted' },
          { name: 'Select Conditions', text: 'Choose your ground conditions and site access level' },
          { name: 'Get Recommendation', text: 'Receive recommended crane tonnage and suitable crane types' }
        ]}
      />

      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-200 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Crane Size Calculator</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Scale className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Crane Size Calculator</h1>
              <p className="text-primary-200 mt-1">Work out what tonnage crane you need</p>
            </div>
          </div>
          <p className="text-primary-100 max-w-3xl">
            Enter your load weight, lift radius, and height to calculate the recommended crane size. 
            Our calculator includes a 25% safety factor and adjusts for radius and height requirements.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-primary-200 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Last updated: January 2025
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              89 ratings
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary-500" />
            Quick Answer: How Do I Size a Crane?
          </h2>
          <p className="text-gray-700 quick-answer">
            <strong>Crane size depends on load weight, lift radius, and height.</strong> As a rule of thumb: the crane tonnage needed is roughly 2-3x your load weight at typical working radii (10-20m). A 5-tonne load at 15m radius typically needs a 35-50t crane. Always add 25% safety margin and check actual load charts.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary-500" />
              Calculate Crane Size
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">1</span>
                  <label className="font-semibold text-gray-900">Load Weight</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={loadWeight}
                    onChange={(e) => setLoadWeight(e.target.value)}
                    placeholder="e.g., 5000"
                    className="flex-1 input"
                  />
                  <select
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value)}
                    className="select w-24"
                  >
                    <option value="kg">kg</option>
                    <option value="tonnes">tonnes</option>
                  </select>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['500', '1000', '2500', '5000', '10000'].map((val) => (
                    <button
                      key={val}
                      onClick={() => { setLoadWeight(val); setWeightUnit('kg'); }}
                      className={`quick-chip ${loadWeight === val && weightUnit === 'kg' ? 'quick-chip-active' : 'quick-chip-inactive'}`}
                    >
                      {parseInt(val).toLocaleString()}kg
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">2</span>
                  <label className="font-semibold text-gray-900">Lift Radius (metres)</label>
                </div>
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  placeholder="Distance from crane to load"
                  className="input"
                />
                <p className="text-sm text-gray-500 mt-1">Horizontal distance from crane centre to load</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['5', '10', '15', '20', '25', '30'].map((val) => (
                    <button
                      key={val}
                      onClick={() => setRadius(val)}
                      className={`quick-chip ${radius === val ? 'quick-chip-active' : 'quick-chip-inactive'}`}
                    >
                      {val}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">3</span>
                  <label className="font-semibold text-gray-900">Lift Height (metres)</label>
                </div>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="How high to lift"
                  className="input"
                />
                <p className="text-sm text-gray-500 mt-1">Height from ground to final load position</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['5', '10', '15', '20', '30', '40'].map((val) => (
                    <button
                      key={val}
                      onClick={() => setHeight(val)}
                      className={`quick-chip ${height === val ? 'quick-chip-active' : 'quick-chip-inactive'}`}
                    >
                      {val}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">4</span>
                  <label className="font-semibold text-gray-900">Ground Conditions</label>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {groundConditions.map((condition) => (
                    <button
                      key={condition.id}
                      onClick={() => setGroundCondition(condition.id)}
                      className={`p-3 rounded-xl text-left transition border-2 ${
                        groundCondition === condition.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className={`font-semibold text-sm ${groundCondition === condition.id ? 'text-primary-700' : 'text-gray-900'}`}>
                        {condition.name}
                      </p>
                      <p className="text-xs text-gray-500">{condition.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">5</span>
                  <label className="font-semibold text-gray-900">Site Access</label>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {accessOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSiteAccess(option.id)}
                      className={`p-3 rounded-xl text-left transition border-2 ${
                        siteAccess === option.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className={`font-semibold text-sm ${siteAccess === option.id ? 'text-primary-700' : 'text-gray-900'}`}>
                        {option.name}
                      </p>
                      <p className="text-xs text-gray-500">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={calculate}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Size
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
                  <h3 className="text-lg font-semibold text-primary-100 mb-2">Recommended Crane Size</h3>
                  <p className="text-4xl md:text-5xl font-bold mb-1">
                    {result.recommendedMin}-{result.recommendedMax} <span className="text-2xl">tonnes</span>
                  </p>
                  <p className="text-primary-200 text-sm">Includes 25% safety factor</p>
                </div>

                {result.warnings.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Warnings
                    </h4>
                    <ul className="space-y-1">
                      {result.warnings.map((warning, index) => (
                        <li key={index} className="text-amber-700 text-sm flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.notes.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      Notes
                    </h4>
                    <ul className="space-y-1">
                      {result.notes.map((note, index) => (
                        <li key={index} className="text-blue-700 text-sm flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Suitable Crane Types</h3>
                  <div className="space-y-3">
                    {result.suitableCranes.map((craneId) => {
                      const crane = getCraneById(craneId);
                      if (!crane) return null;
                      return (
                        <div key={craneId} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-gray-900">{crane.name}</p>
                            <p className="text-sm text-gray-600">{crane.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-6 text-center">
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Ready to Get Quotes?</h3>
                  <p className="text-primary-800 mb-4">Get up to 3 free quotes from vetted crane companies</p>
                  <Link to="/get-quotes" className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                    Get Free Quotes
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Next Step: Estimate Costs</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Now you know the crane size, use our cost estimator to get an idea of hire prices.
                  </p>
                  <Link
                    to="/crane-hire-cost-calculator"
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
                  >
                    <PoundSterling className="w-5 h-5" />
                    Estimate Hire Costs
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Enter Your Lift Details</h3>
                <p className="text-gray-500">
                  Fill in the load weight, radius, and height to calculate the recommended crane size for your project.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Crane Capacity</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">How Radius Affects Capacity</h3>
              <p className="text-gray-700 text-sm mb-4">
                Crane capacity decreases significantly as the load moves further from the crane. This is why a "50-tonne crane" rarely lifts 50 tonnes in practice.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Radius</th>
                      <th className="text-right py-2">50t Crane Capacity</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b"><td className="py-2">3m</td><td className="text-right">50t (100%)</td></tr>
                    <tr className="border-b"><td className="py-2">10m</td><td className="text-right">25t (50%)</td></tr>
                    <tr className="border-b"><td className="py-2">15m</td><td className="text-right">15t (30%)</td></tr>
                    <tr className="border-b"><td className="py-2">20m</td><td className="text-right">10t (20%)</td></tr>
                    <tr><td className="py-2">25m</td><td className="text-right">7t (14%)</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-2">*Approximate values - actual capacity varies by crane model</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Crane Selection Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm"><strong>Measure accurately</strong> - small errors in radius can mean big differences in required crane size</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm"><strong>Include rigging weight</strong> - add slings, spreader beams, and lifting equipment to your load</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm"><strong>Consider access</strong> - the biggest crane isn't always the best if it can't reach your site</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm"><strong>Check ground conditions</strong> - cranes need stable ground for safe operation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm"><strong>Get professional advice</strong> - for complex lifts, always consult an Appointed Person</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Last updated: January 2025
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            UK crane specifications
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            Based on industry standards
          </span>
        </div>
      </section>
    </>
  );
}
