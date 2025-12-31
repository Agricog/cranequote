import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/layout';
import {
  PoundSterling,
  Calculator,
  Clock,
  MapPin,
  Users,
  HelpCircle,
  ArrowRight,
  Scale,
  Truck,
  FileText,
  Info,
  TrendingDown
} from 'lucide-react';
import { craneTypes, getCraneById } from '../data/craneTypes';
import { regions, getRegionById } from '../data/regions';
import { calculateHireCost, formatCurrency, formatRange, CONTRACT_LIFT_MULTIPLIER } from '../data/pricingData';

const faqs = [
  {
    q: 'How much does crane hire cost in the UK?',
    a: 'UK crane hire typically costs £300-£2,500+ per day depending on crane type and capacity. City cranes (13-50t) cost £400-650/day, mobile cranes (20-100t) cost £550-1,500/day, all-terrain cranes (35-220t) cost £800-2,500/day, and crawler cranes start at £1,000/day. Contract lift adds 80-120% to CPA hire rates.'
  },
  {
    q: 'What is included in crane hire prices?',
    a: 'CPA (bare) hire typically includes the crane and operator only. You are responsible for lift planning (Appointed Person), slingers/banksmen, insurance, and permits. Contract lift includes everything: crane, operator, lift planning, supervision, slingers, and insurance. Always confirm what is included when getting quotes.'
  },
  {
    q: 'Why do crane hire prices vary by region?',
    a: 'Regional price differences reflect local supply and demand, transport distances from depots, operating costs, and competition. London is typically 30% above national average due to congestion, access restrictions, and high demand. Northern regions are often 5-10% below average due to lower operating costs and good crane availability.'
  },
  {
    q: 'Is it cheaper to hire a crane for a week than daily?',
    a: 'Yes, weekly and monthly hire rates offer significant discounts. Typically you can save 10% on weekly hire (5+ days) and 20% on monthly hire (20+ days) compared to daily rates. If your project spans multiple days, always ask for weekly rates rather than paying daily.'
  },
  {
    q: 'What is the difference between CPA hire and contract lift?',
    a: 'CPA (Construction Plant-hire Association) hire means you rent the crane and operator but handle everything else yourself. Contract lift is a fully managed service where the crane company takes full responsibility for planning, insurance, supervision, and execution. Contract lift costs more but provides peace of mind and is recommended for complex lifts.'
  },
  {
    q: 'Are there any additional costs beyond the daily rate?',
    a: 'Yes, additional costs may include: transport/mobilisation (£200-800+), permits for road closures or airspace (£50-300), overtime for early/late work, weekend premiums (typically +50%), slingers/banksmen if not included (£160-280/day each), and fuel for long hire periods.'
  },
  {
    q: 'How do I get the best price on crane hire?',
    a: 'To get the best price: book in advance (2+ weeks), be flexible on dates if possible, hire for full weeks rather than odd days, get multiple quotes (we recommend 3), consider off-peak times, and have accurate lift specifications ready. Clear site access also reduces costs.'
  },
  {
    q: 'Do crane hire prices include the operator?',
    a: 'Most crane hire includes an operator as standard - this is safest as operators know their machines. However, some HIAB/truck-mounted cranes offer self-drive options if you have trained staff. Always confirm operator inclusion and check their certifications (CPCS card).'
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
    title: 'CPA vs Contract Lift',
    description: 'Compare hire options',
    href: '/cpa-vs-contract-lift',
    icon: FileText,
    color: 'text-purple-600',
    bg: 'bg-purple-50 hover:bg-purple-100'
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

const durationOptions = [
  { value: 1, label: '1 day' },
  { value: 2, label: '2 days' },
  { value: 3, label: '3 days' },
  { value: 5, label: '1 week (5 days)' },
  { value: 10, label: '2 weeks' },
  { value: 20, label: '1 month (20 days)' }
];

interface CalculationResult {
  baseDailyRate: { min: number; max: number };
  regionalAdjusted: { min: number; max: number };
  contractLiftRate?: { min: number; max: number };
  totalForDuration: { min: number; max: number };
  perDay: { min: number; max: number };
  savings?: { weekly: number; monthly: number };
  craneName: string;
  tonnageLabel: string;
  regionName: string;
  regionMultiplier: number;
  duration: number;
  isContractLift: boolean;
}

export default function HireCostCalculator() {
  const [craneType, setCraneType] = useState('');
  const [tonnage, setTonnage] = useState('');
  const [duration, setDuration] = useState(1);
  const [region, setRegion] = useState('midlands');
  const [hireType, setHireType] = useState<'cpa' | 'contract'>('cpa');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const selectedCrane = craneType ? getCraneById(craneType) : null;
  const selectedRegion = getRegionById(region);

  const calculate = () => {
    if (!craneType || !tonnage) {
      alert('Please select crane type and tonnage');
      return;
    }

    const costResult = calculateHireCost(
      craneType,
      tonnage,
      duration,
      region,
      hireType === 'contract'
    );

    if (!costResult) {
      alert('Unable to calculate - please check your selections');
      return;
    }

    const crane = getCraneById(craneType);
    const regionData = getRegionById(region);

    setResult({
      ...costResult,
      craneName: crane?.name || '',
      tonnageLabel: tonnage,
      regionName: regionData?.name || '',
      regionMultiplier: regionData?.multiplier || 1,
      duration,
      isContractLift: hireType === 'contract'
    });
  };

  const resetCalculator = () => {
    setCraneType('');
    setTonnage('');
    setDuration(1);
    setRegion('midlands');
    setHireType('cpa');
    setResult(null);
  };

  const formatMultiplier = (multiplier: number): string => {
    if (multiplier === 1) return 'Baseline';
    const percent = (multiplier - 1) * 100;
    return percent > 0 ? `+${percent.toFixed(0)}%` : `${percent.toFixed(0)}%`;
  };

  return (
    <>
      <SEOHead
        title="Crane Hire Cost Calculator UK 2025 | Instant Price Estimates"
        description="Free UK crane hire cost calculator. Get instant price estimates for mobile crane, tower crane, HIAB and crawler crane hire. Compare CPA vs contract lift rates. Regional pricing for all UK areas."
        keywords="crane hire cost, crane hire prices UK, mobile crane hire cost, how much does crane hire cost, crane hire rates, contract lift cost, CPA crane hire prices, crane hire calculator"
        canonicalUrl="/crane-hire-cost-calculator"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/#calculators' },
          { name: 'Hire Cost Calculator', url: '/crane-hire-cost-calculator' }
        ]}
        calculatorName="Crane Hire Cost Calculator UK"
        aggregateRating={{ value: '4.8', count: '124' }}
        faqs={faqs}
        howToSteps={[
          { name: 'Select Crane Type', text: 'Choose from city crane, mobile, all-terrain, crawler, tower, HIAB, or spider crane' },
          { name: 'Choose Tonnage', text: 'Select the capacity range that matches your lifting requirements' },
          { name: 'Set Duration', text: 'Enter how many days you need the crane - weekly rates offer discounts' },
          { name: 'Select Region', text: 'Choose your UK region for accurate local pricing' },
          { name: 'Choose Hire Type', text: 'Select CPA hire or contract lift based on your requirements' },
          { name: 'Get Estimate', text: 'Receive instant cost estimate with breakdown and savings tips' }
        ]}
      />

      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-200 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Hire Cost Calculator</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <PoundSterling className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Crane Hire Cost Calculator</h1>
              <p className="text-primary-200 mt-1">Get instant UK price estimates</p>
            </div>
          </div>
          <p className="text-primary-100 max-w-3xl">
            Calculate crane hire costs based on crane type, capacity, duration, and your UK region. 
            Compare CPA hire and contract lift prices with our free estimator.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-primary-200 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Updated January 2026
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              124 ratings
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary-500" />
            Quick Answer: UK Crane Hire Prices 2025
          </h2>
          <p className="text-gray-700 quick-answer mb-4">
            <strong>UK crane hire costs £300-£2,500+ per day.</strong> City cranes: £400-650/day. Mobile cranes: £550-1,500/day. All-terrain: £800-2,500/day. Tower cranes: £2,000-4,500/week. Contract lift adds 80-120% but includes full service. London prices are 30% higher than average.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-50 p-3 rounded-xl text-center">
              <div className="text-xs text-gray-600 font-medium">City Crane</div>
              <div className="text-lg font-bold text-gray-900">£400-650</div>
              <div className="text-xs text-gray-500">/day</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl text-center">
              <div className="text-xs text-blue-600 font-medium">Mobile</div>
              <div className="text-lg font-bold text-blue-700">£550-1,500</div>
              <div className="text-xs text-gray-500">/day</div>
            </div>
            <div className="bg-green-50 p-3 rounded-xl text-center">
              <div className="text-xs text-green-600 font-medium">All-Terrain</div>
              <div className="text-lg font-bold text-green-700">£800-2,500</div>
              <div className="text-xs text-gray-500">/day</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-xl text-center">
              <div className="text-xs text-purple-600 font-medium">Crawler</div>
              <div className="text-lg font-bold text-purple-700">£1,000+</div>
              <div className="text-xs text-gray-500">/day</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary-500" />
              Calculate Hire Cost
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">1</span>
                  <label className="font-semibold text-gray-900">Crane Type</label>
                </div>
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
                {selectedCrane && (
                  <p className="text-sm text-gray-500 mt-2">{selectedCrane.description}</p>
                )}
              </div>

              {selectedCrane && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">2</span>
                    <label className="font-semibold text-gray-900">Tonnage / Capacity</label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedCrane.tonnageRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => setTonnage(range.label)}
                        className={`p-3 rounded-xl text-left transition border-2 ${
                          tonnage === range.label
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className={`font-bold ${tonnage === range.label ? 'text-primary-700' : 'text-gray-900'}`}>
                          {range.label}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatRange(range.dailyRateMin, range.dailyRateMax)}/day
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">3</span>
                  <label className="font-semibold text-gray-900">Hire Duration</label>
                </div>
                <select
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="select"
                >
                  {durationOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {duration >= 5 && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    {duration >= 20 ? '20% monthly discount applied' : '10% weekly discount applied'}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">4</span>
                  <label className="font-semibold text-gray-900">UK Region</label>
                </div>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="select"
                >
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({formatMultiplier(r.multiplier)})
                    </option>
                  ))}
                </select>
                {selectedRegion && (
                  <p className="text-sm text-gray-500 mt-2">{selectedRegion.description}</p>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">5</span>
                  <label className="font-semibold text-gray-900">Hire Type</label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setHireType('cpa')}
                    className={`p-4 rounded-xl text-left transition border-2 ${
                      hireType === 'cpa'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className={`font-bold ${hireType === 'cpa' ? 'text-primary-700' : 'text-gray-900'}`}>
                      CPA Hire
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Crane + operator only</p>
                    <p className="text-xs text-gray-500">You manage the lift</p>
                  </button>
                  <button
                    onClick={() => setHireType('contract')}
                    className={`p-4 rounded-xl text-left transition border-2 ${
                      hireType === 'contract'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className={`font-bold ${hireType === 'contract' ? 'text-primary-700' : 'text-gray-900'}`}>
                      Contract Lift
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Fully managed service</p>
                    <p className="text-xs text-gray-500">+{((CONTRACT_LIFT_MULTIPLIER.typical - 1) * 100).toFixed(0)}% typical</p>
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={calculate}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Cost
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
                  <h3 className="text-lg font-semibold text-primary-100 mb-2">Estimated Total Cost</h3>
                  <p className="text-4xl md:text-5xl font-bold mb-1">
                    {formatRange(result.totalForDuration.min, result.totalForDuration.max)}
                  </p>
                  <p className="text-primary-200 text-sm">
                    For {result.duration} day{result.duration > 1 ? 's' : ''} hire
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-200">Effective daily rate</span>
                      <span className="font-semibold">{formatRange(result.perDay.min, result.perDay.max)}/day</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Cost Breakdown</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Crane Type</span>
                      <span className="font-medium">{result.craneName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Capacity</span>
                      <span className="font-medium">{result.tonnageLabel}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Base Daily Rate</span>
                      <span className="font-medium">{formatRange(result.baseDailyRate.min, result.baseDailyRate.max)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Region ({result.regionName})</span>
                      <span className="font-medium">{formatMultiplier(result.regionMultiplier)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Regional Rate</span>
                      <span className="font-medium">{formatRange(result.regionalAdjusted.min, result.regionalAdjusted.max)}/day</span>
                    </div>
                    {result.isContractLift && result.contractLiftRate && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Contract Lift Rate</span>
                        <span className="font-medium">{formatRange(result.contractLiftRate.min, result.contractLiftRate.max)}/day</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{result.duration} day{result.duration > 1 ? 's' : ''}</span>
                    </div>
                    {result.duration >= 5 && (
                      <div className="flex justify-between py-2 border-b text-green-600">
                        <span>Discount Applied</span>
                        <span className="font-medium">{result.duration >= 20 ? '20%' : '10%'}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-3 font-bold text-lg">
                      <span>Total Estimate</span>
                      <span className="text-primary-600">{formatRange(result.totalForDuration.min, result.totalForDuration.max)}</span>
                    </div>
                  </div>
                </div>

                {result.savings && (result.savings.weekly > 0 || result.savings.monthly > 0) && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <TrendingDown className="w-5 h-5" />
                      Potential Savings
                    </h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      {result.duration < 5 && (
                        <li>• Book for 5+ days to save ~{formatCurrency(result.savings.weekly)} (10% weekly discount)</li>
                      )}
                      {result.duration < 20 && (
                        <li>• Book for 20+ days to save ~{formatCurrency(result.savings.monthly)} (20% monthly discount)</li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Not Included in Estimate
                  </h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Transport/mobilisation costs ({hireType === 'cpa' ? 'typically £200-800' : 'may be included'})</li>
                    <li>• Permits (road closures, airspace if required)</li>
                    {hireType === 'cpa' && <li>• Slingers/banksmen (£160-280/day each)</li>}
                    <li>• Weekend or overtime premiums</li>
                    <li>• Fuel for extended hire periods</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-6 text-center">
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Get Actual Quotes</h3>
                  <p className="text-primary-800 mb-4">Compare prices from up to 3 crane companies in your area</p>
                  <Link to="/get-quotes" className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                    Get Free Quotes
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <PoundSterling className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Select Your Requirements</h3>
                <p className="text-gray-500">
                  Choose crane type, tonnage, duration and region to see estimated hire costs.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">UK Crane Hire Prices 2025</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Crane Type</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Tonnage Range</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Daily Rate (CPA)</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Contract Lift</th>
                </tr>
              </thead>
              <tbody>
                {craneTypes.slice(0, 6).map((crane) => {
                  const minRate = Math.min(...crane.tonnageRanges.map(r => r.dailyRateMin));
                  const maxRate = Math.max(...crane.tonnageRanges.map(r => r.dailyRateMax));
                  const minTonnage = Math.min(...crane.tonnageRanges.map(r => r.min));
                  const maxTonnage = Math.max(...crane.tonnageRanges.map(r => r.max));
                  return (
                    <tr key={crane.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">{crane.name}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{minTonnage}-{maxTonnage}t</td>
                      <td className="py-3 px-4 text-center font-semibold text-primary-600">
                        {formatRange(minRate, maxRate)}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {formatRange(Math.round(minRate * 1.8), Math.round(maxRate * 2.2))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * Prices are indicative based on Midlands (baseline) rates. London +30%, South East +15%, North -5-10%. 
            Actual prices vary by supplier and specific requirements.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Regional Pricing Guide</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regions.map((r) => (
            <div key={r.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{r.name}</h3>
                <span className={`text-sm font-bold px-2 py-1 rounded ${
                  r.multiplier > 1 ? 'bg-red-100 text-red-700' : 
                  r.multiplier < 1 ? 'bg-green-100 text-green-700' : 
                  'bg-gray-100 text-gray-700'
                }`}>
                  {formatMultiplier(r.multiplier)}
                </span>
              </div>
              <p className="text-sm text-gray-600">{r.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
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

      <section className="bg-gradient-to-r from-primary-500 to-primary-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Book Your Crane?
          </h2>
          <p className="text-primary-100 mb-6">
            Get up to 3 free quotes from vetted crane hire companies in your area.
          </p>
          <Link to="/get-quotes" className="inline-flex items-center gap-2 btn-accent">
            Get Free Quotes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

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
