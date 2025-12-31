import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/layout';
import {
  Truck,
  Calculator,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  HelpCircle,
  ArrowRight,
  Scale,
  PoundSterling,
  FileText,
  AlertTriangle,
  Info
} from 'lucide-react';
import { calculateTransportCost, formatRange } from '../data/pricingData';

const faqs = [
  {
    q: 'How much does crane transport cost?',
    a: 'Crane transport costs vary by size: small cranes (under 50t) cost £150-350 for local delivery, medium cranes (50-100t) cost £300-600, large cranes (100-200t) cost £500-1,000+, and heavy cranes (200t+) can cost £800-1,500+. These costs cover delivery to site and collection afterwards, with mileage charges on top for longer distances.'
  },
  {
    q: 'What is included in crane transport costs?',
    a: 'Transport costs typically include loading the crane at the depot, delivery to your site, and collection after hire. Some companies include a set number of miles (e.g., 25-50 miles) in the base rate, with additional mileage charged per mile. Transport of counterweights, jibs, and accessories may be charged separately for larger cranes.'
  },
  {
    q: 'Do large cranes need escort vehicles?',
    a: 'Yes, cranes over 100 tonnes typically require escort vehicles for road transport due to their size and weight. This adds £200-700 to transport costs depending on distance. Very large cranes (200t+) may need police escorts for certain routes, which requires advance planning and additional permits.'
  },
  {
    q: 'How is transport distance calculated?',
    a: 'Distance is measured from the crane company\'s depot to your site. Most companies have multiple depots, so they will usually dispatch from the nearest location with available equipment. When getting quotes, ask which depot the crane will come from to understand true transport costs.'
  },
  {
    q: 'Can I reduce crane transport costs?',
    a: 'Yes, several strategies can reduce transport costs: choose a crane company with a depot near your site, combine multiple lifts into one hire period, book well in advance so companies can optimise their logistics, and consider slightly smaller cranes that are easier (and cheaper) to transport if they meet your requirements.'
  },
  {
    q: 'Are transport costs included in crane hire quotes?',
    a: 'Sometimes. Some crane companies include transport in their daily rate (especially for local work), while others quote it separately. Always ask whether transport/mobilisation is included when comparing quotes. Contract lift quotes usually include transport; CPA hire often charges it separately.'
  },
  {
    q: 'What about transporting crawler cranes?',
    a: 'Crawler cranes cannot travel on roads, so they must be transported on low-loaders. This is more expensive than mobile cranes which can drive themselves for shorter distances. Large crawler cranes may need multiple loads for the crane, counterweights, and boom sections, significantly increasing transport costs.'
  },
  {
    q: 'Do I need permits for crane transport?',
    a: 'The crane company handles transport permits as part of their operations. However, very large or heavy loads may require special permits, route planning, and movement restrictions (e.g., night-time only). These costs are usually passed on to the customer and can add £100-500 depending on requirements.'
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

const tonnageOptions = [
  { value: 25, label: 'Small (up to 25t)', category: 'small' },
  { value: 40, label: 'City Crane (25-50t)', category: 'small' },
  { value: 75, label: 'Medium Mobile (50-80t)', category: 'medium' },
  { value: 100, label: 'Large Mobile (80-100t)', category: 'medium' },
  { value: 150, label: 'Heavy (100-160t)', category: 'large' },
  { value: 200, label: 'Very Heavy (160-200t)', category: 'large' },
  { value: 300, label: 'Super Heavy (200-400t)', category: 'heavy' },
  { value: 500, label: 'Mega (400t+)', category: 'heavy' }
];

const distancePresets = [
  { value: 10, label: '10 miles (local)' },
  { value: 25, label: '25 miles' },
  { value: 50, label: '50 miles' },
  { value: 75, label: '75 miles' },
  { value: 100, label: '100 miles' },
  { value: 150, label: '150+ miles' }
];

interface TransportResult {
  tonnage: number;
  distance: number;
  category: string;
  baseCost: { min: number; max: number };
  mileageCost: { min: number; max: number };
  escortCost?: { min: number; max: number };
  totalOneWay: { min: number; max: number };
  totalReturn: { min: number; max: number };
  escortRequired: boolean;
  notes: string[];
}

export default function TransportCalculator() {
  const [tonnage, setTonnage] = useState<number>(40);
  const [distance, setDistance] = useState<number>(25);
  const [includeReturn, setIncludeReturn] = useState(true);
  const [result, setResult] = useState<TransportResult | null>(null);

  const calculate = () => {
    const transportResult = calculateTransportCost(tonnage, distance);

    const notes: string[] = [];

    if (tonnage >= 100) {
      notes.push('Large cranes may require route surveys before transport');
    }
    if (tonnage >= 200) {
      notes.push('Super heavy cranes often need multiple transport loads');
      notes.push('Police escort may be required for some routes');
    }
    if (distance > 100) {
      notes.push('Long distance transport may have overnight costs');
    }
    if (transportResult.escortRequired) {
      notes.push('Escort vehicle(s) required for this crane size');
    }

    const totalOneWay = transportResult.total;
    const totalReturn = {
      min: totalOneWay.min * 2,
      max: totalOneWay.max * 2
    };

    let category = 'Small';
    if (tonnage >= 200) category = 'Super Heavy';
    else if (tonnage >= 100) category = 'Large';
    else if (tonnage >= 50) category = 'Medium';

    setResult({
      tonnage,
      distance,
      category,
      baseCost: transportResult.baseCost,
      mileageCost: transportResult.mileageCost,
      escortCost: transportResult.escortCost,
      totalOneWay,
      totalReturn,
      escortRequired: transportResult.escortRequired,
      notes
    });
  };

  const resetCalculator = () => {
    setTonnage(40);
    setDistance(25);
    setIncludeReturn(true);
    setResult(null);
  };

  return (
    <>
      <SEOHead
        title="Crane Transport Cost Calculator UK | Mobilisation & Delivery"
        description="Calculate crane transport and mobilisation costs for UK deliveries. Estimate delivery charges based on crane size and distance. Includes escort vehicle costs for large cranes."
        keywords="crane transport cost, crane delivery cost, crane mobilisation, crane haulage, low loader cost, crane escort vehicle, crane transport UK, heavy haulage cost"
        canonicalUrl="/transport-cost-calculator"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/#calculators' },
          { name: 'Transport Calculator', url: '/transport-cost-calculator' }
        ]}
        calculatorName="Crane Transport Cost Calculator"
        aggregateRating={{ value: '4.6', count: '52' }}
        faqs={faqs}
        howToSteps={[
          { name: 'Select Crane Size', text: 'Choose the tonnage of crane being transported' },
          { name: 'Enter Distance', text: 'Input the distance from depot to your site in miles' },
          { name: 'Choose Return Option', text: 'Specify if you need delivery and collection or one-way only' },
          { name: 'Get Estimate', text: 'See transport cost breakdown including escort vehicles if required' }
        ]}
      />

      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-200 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Transport Calculator</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Crane Transport Calculator</h1>
              <p className="text-primary-200 mt-1">Estimate mobilisation and delivery costs</p>
            </div>
          </div>
          <p className="text-primary-100 max-w-3xl">
            Calculate the cost of transporting a crane to your site. Includes base delivery charges, 
            mileage costs, and escort vehicles for larger cranes.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-primary-200 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Updated January 2026
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              52 ratings
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary-500" />
            Quick Answer: Crane Transport Costs UK
          </h2>
          <p className="text-gray-700 quick-answer">
            <strong>Crane transport costs £150-£1,500+ depending on crane size and distance.</strong> Small cranes (under 50t): £150-400. Medium cranes (50-100t): £300-700. Large cranes (100-200t): £500-1,200 including escorts. Super heavy (200t+): £800-1,500+. Costs are typically charged each way (delivery + collection).
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary-500" />
              Calculate Transport Cost
            </h2>

            <div className="space-y-6">
              <div>
                <label className="font-semibold text-gray-900 block mb-3">Crane Size / Tonnage</label>
                <div className="grid grid-cols-2 gap-2">
                  {tonnageOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setTonnage(opt.value)}
                      className={`p-3 rounded-xl text-left transition border-2 ${
                        tonnage === opt.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className={`font-semibold text-sm ${tonnage === opt.value ? 'text-primary-700' : 'text-gray-900'}`}>
                        {opt.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-900 block mb-3">Distance (miles)</label>
                <input
                  type="number"
                  min="1"
                  value={distance}
                  onChange={(e) => setDistance(Math.max(1, parseInt(e.target.value) || 1))}
                  className="input mb-3"
                  placeholder="Enter distance in miles"
                />
                <div className="flex flex-wrap gap-2">
                  {distancePresets.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setDistance(preset.value)}
                      className={`quick-chip ${distance === preset.value ? 'quick-chip-active' : 'quick-chip-inactive'}`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-900 block mb-3">Transport Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIncludeReturn(true)}
                    className={`p-4 rounded-xl text-left transition border-2 ${
                      includeReturn
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className={`font-bold ${includeReturn ? 'text-primary-700' : 'text-gray-900'}`}>
                      Return Trip
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Delivery + collection</p>
                    <p className="text-xs text-gray-500">Most common</p>
                  </button>
                  <button
                    onClick={() => setIncludeReturn(false)}
                    className={`p-4 rounded-xl text-left transition border-2 ${
                      !includeReturn
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className={`font-bold ${!includeReturn ? 'text-primary-700' : 'text-gray-900'}`}>
                      One Way
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Delivery only</p>
                    <p className="text-xs text-gray-500">Or collection only</p>
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
                  <h3 className="text-lg font-semibold text-primary-100 mb-2">
                    Estimated Transport Cost
                  </h3>
                  <p className="text-4xl md:text-5xl font-bold mb-1">
                    {formatRange(
                      includeReturn ? result.totalReturn.min : result.totalOneWay.min,
                      includeReturn ? result.totalReturn.max : result.totalOneWay.max
                    )}
                  </p>
                  <p className="text-primary-200 text-sm">
                    {includeReturn ? 'Delivery + collection (return trip)' : 'One way only'}
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Cost Breakdown</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Crane Size</span>
                      <span className="font-medium">{result.category} ({result.tonnage}t)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Distance</span>
                      <span className="font-medium">{result.distance} miles</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Base Delivery Cost</span>
                      <span className="font-medium">{formatRange(result.baseCost.min, result.baseCost.max)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Mileage ({result.distance} miles)</span>
                      <span className="font-medium">{formatRange(result.mileageCost.min, result.mileageCost.max)}</span>
                    </div>
                    {result.escortRequired && result.escortCost && (
                      <div className="flex justify-between py-2 border-b text-amber-700">
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          Escort Vehicle
                        </span>
                        <span className="font-medium">{formatRange(result.escortCost.min, result.escortCost.max)}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">One Way Total</span>
                      <span className="font-medium">{formatRange(result.totalOneWay.min, result.totalOneWay.max)}</span>
                    </div>
                    {includeReturn && (
                      <div className="flex justify-between py-3 font-bold text-lg">
                        <span>Return Trip Total</span>
                        <span className="text-primary-600">{formatRange(result.totalReturn.min, result.totalReturn.max)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {result.notes.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      Important Notes
                    </h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      {result.notes.map((note, index) => (
                        <li key={index}>• {note}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.escortRequired && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Escort Required
                    </h4>
                    <p className="text-amber-700 text-sm">
                      Cranes over 100 tonnes require escort vehicles for road transport. 
                      Very large cranes may need police escorts on certain routes, adding to costs and requiring advance planning.
                    </p>
                  </div>
                )}

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Cost Saving Tips</h4>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Ask which depot the crane comes from - closer is cheaper</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Combine multiple lifts to spread transport cost</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Book in advance for better logistics rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Contract lift often includes transport in the price</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-6 text-center">
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Get Quotes With Transport</h3>
                  <p className="text-primary-800 mb-4">Most quotes include transport - compare all-in prices</p>
                  <Link to="/get-quotes" className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                    Get Free Quotes
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Calculate Transport Costs</h3>
                <p className="text-gray-500">
                  Select crane size and distance to estimate transport and mobilisation costs.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Transport Cost Guide */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">UK Crane Transport Cost Guide</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Crane Size</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Base Cost</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Per Mile</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Escort</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Typical Total*</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Small (under 50t)</td>
                  <td className="py-3 px-4 text-center text-gray-600">£100 - £200</td>
                  <td className="py-3 px-4 text-center text-gray-600">£2 - £3</td>
                  <td className="py-3 px-4 text-center text-gray-600">Not required</td>
                  <td className="py-3 px-4 text-center font-semibold text-primary-600">£150 - £350</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Medium (50-100t)</td>
                  <td className="py-3 px-4 text-center text-gray-600">£200 - £350</td>
                  <td className="py-3 px-4 text-center text-gray-600">£3 - £5</td>
                  <td className="py-3 px-4 text-center text-gray-600">Not required</td>
                  <td className="py-3 px-4 text-center font-semibold text-primary-600">£300 - £600</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Large (100-200t)</td>
                  <td className="py-3 px-4 text-center text-gray-600">£350 - £500</td>
                  <td className="py-3 px-4 text-center text-gray-600">£5 - £8</td>
                  <td className="py-3 px-4 text-center text-amber-600">£200 - £400</td>
                  <td className="py-3 px-4 text-center font-semibold text-primary-600">£550 - £1,100</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Super Heavy (200t+)</td>
                  <td className="py-3 px-4 text-center text-gray-600">£500 - £800</td>
                  <td className="py-3 px-4 text-center text-gray-600">£8 - £12</td>
                  <td className="py-3 px-4 text-center text-amber-600">£400 - £700</td>
                  <td className="py-3 px-4 text-center font-semibold text-primary-600">£800 - £1,500+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * Typical total based on 25-mile delivery (one way). Actual costs vary by supplier and specific requirements.
          </p>
        </div>
      </section>

      {/* What Affects Transport Cost */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What Affects Transport Costs?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <Scale className="w-8 h-8 text-primary-500 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Crane Size & Weight</h3>
            <p className="text-gray-600 text-sm">
              Larger cranes need bigger low-loaders and may require multiple loads for counterweights and boom sections. Very heavy cranes need special transport permits.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <MapPin className="w-8 h-8 text-primary-500 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Distance</h3>
            <p className="text-gray-600 text-sm">
              Most companies charge a base rate plus per-mile cost. Longer distances also increase driver hours and may require overnight stays for very long hauls.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <Truck className="w-8 h-8 text-primary-500 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Escort Vehicles</h3>
            <p className="text-gray-600 text-sm">
              Cranes over 100t typically need escort vehicles. Super heavy loads may need police escorts on certain routes, requiring advance planning and permits.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <Clock className="w-8 h-8 text-primary-500 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Timing</h3>
            <p className="text-gray-600 text-sm">
              Very large loads may be restricted to night-time movement. Rush jobs or weekend deliveries often incur premium charges.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <FileText className="w-8 h-8 text-primary-500 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Permits</h3>
            <p className="text-gray-600 text-sm">
              Abnormal loads need movement permits. Special routes, bridge crossings, and urban areas may require additional permissions and planning.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <AlertTriangle className="w-8 h-8 text-primary-500 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Site Access</h3>
            <p className="text-gray-600 text-sm">
              Difficult site access may require additional manoeuvring time. Very restricted sites might need smaller transport vehicles making multiple trips.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
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
            Get All-In Crane Hire Quotes
          </h2>
          <p className="text-primary-100 mb-6">
            Most crane companies include transport in their quotes. Get up to 3 free quotes now.
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
            UK transport costs
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
