import { Link } from 'react-router-dom';
import { SEOHead } from '../components/layout';
import {
  Calculator,
  Scale,
  PoundSterling,
  Truck,
  FileText,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  HelpCircle,
  Building2,
  Shield,
  Zap
} from 'lucide-react';

const calculators = [
  {
    id: 'crane-size',
    title: 'Crane Size Calculator',
    description: 'Work out what tonnage crane you need based on load weight, radius, and height',
    href: '/crane-size-calculator',
    icon: Scale,
    color: 'text-blue-600',
    bg: 'bg-blue-50 hover:bg-blue-100',
    popular: true
  },
  {
    id: 'hire-cost',
    title: 'Hire Cost Estimator',
    description: 'Get instant price estimates for crane hire based on type, duration, and location',
    href: '/crane-hire-cost-calculator',
    icon: PoundSterling,
    color: 'text-green-600',
    bg: 'bg-green-50 hover:bg-green-100',
    popular: true
  },
  {
    id: 'cpa-contract',
    title: 'CPA vs Contract Lift',
    description: 'Compare CPA hire and contract lift options with side-by-side cost breakdown',
    href: '/cpa-vs-contract-lift',
    icon: FileText,
    color: 'text-purple-600',
    bg: 'bg-purple-50 hover:bg-purple-100',
    popular: false
  },
  {
    id: 'transport',
    title: 'Transport Calculator',
    description: 'Calculate crane transport and mobilisation costs based on distance and size',
    href: '/transport-cost-calculator',
    icon: Truck,
    color: 'text-orange-600',
    bg: 'bg-orange-50 hover:bg-orange-100',
    popular: false
  },
  {
    id: 'total-cost',
    title: 'Total Project Cost',
    description: 'Build a complete budget including hire, transport, permits, and crew costs',
    href: '/total-project-cost',
    icon: Calculator,
    color: 'text-primary-600',
    bg: 'bg-primary-50 hover:bg-primary-100',
    popular: true
  }
];

const faqs = [
  {
    q: 'How much does crane hire cost in the UK?',
    a: 'Crane hire in the UK typically costs £300-£2,500+ per day depending on the crane type and capacity. City cranes (13-50t) cost £400-650/day, mobile cranes (20-100t) cost £550-1,500/day, and heavy-lift cranes (100t+) start at £1,500/day. Contract lifts cost 1.8-2.2x more than CPA hire but include operator, planning, and insurance.'
  },
  {
    q: 'What is the difference between CPA hire and contract lift?',
    a: 'CPA (Construction Plant-hire Association) hire means you rent the crane and operator, but you are responsible for lift planning, supervision (Appointed Person), slingers, and insurance. Contract lift is a fully managed service where the crane company handles everything including planning, supervision, and liability. Contract lift costs more but provides peace of mind and is recommended for complex lifts.'
  },
  {
    q: 'What size crane do I need?',
    a: 'The crane size depends on load weight, lift radius (distance from crane to load), and lift height. As a rough guide: under 5 tonnes at short radius needs a HIAB or city crane, 5-20 tonnes typically needs a 35-80t mobile crane, and heavy lifts over 20 tonnes may require 100t+ cranes. Our crane size calculator helps you determine the right capacity for your specific requirements.'
  },
  {
    q: 'How far in advance should I book a crane?',
    a: 'For standard crane hire, book at least 1-2 weeks in advance. For heavy cranes (100t+), large projects, or peak construction season, book 3-4 weeks ahead. Same-day or next-day hire is sometimes possible but costs more and availability is limited. Tower crane installations typically require 4-8 weeks lead time.'
  },
  {
    q: 'What factors affect crane hire prices?',
    a: 'Key factors include: crane type and capacity (tonnage), hire duration (daily vs weekly rates), location (London +30%, North -10%), hire type (CPA vs contract lift), transport distance, site access conditions, timing (weekends and nights cost more), and additional requirements like permits or road closures.'
  },
  {
    q: 'Do I need any permits for crane hire?',
    a: 'You may need permits for: road closures or traffic management, lifting over public areas or highways, operating near airports or flight paths, and planning permissions for tower crane installation. Your crane hire company can advise on permit requirements, and contract lift providers typically handle this for you.'
  }
];

const trustSignals = [
  { icon: Building2, text: '101,000+ UK construction businesses' },
  { icon: Shield, text: 'CPA industry standards' },
  { icon: Zap, text: 'Instant estimates' },
  { icon: Users, text: 'Free to use' }
];

const regionData = [
  { region: 'London', adjustment: '+30%' },
  { region: 'South East', adjustment: '+15%' },
  { region: 'Midlands', adjustment: 'Baseline' },
  { region: 'North West', adjustment: '-5%' },
  { region: 'Scotland', adjustment: '-5%' },
  { region: 'Wales', adjustment: '-5%' }
];

const whyPricesVary = [
  'Crane availability and local competition',
  'Transport distances from depots',
  'Site access and congestion',
  'Local permit requirements',
  'Labour cost variations'
];

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Crane Hire Cost Calculator UK 2025 | Free Quotes & Estimates"
        description="Free UK crane hire cost calculators. Get instant estimates for mobile crane, tower crane, and HIAB hire. Compare CPA hire vs contract lift prices. 2025 pricing data."
        keywords="crane hire cost, crane hire UK, mobile crane hire, crane hire calculator, contract lift cost, CPA crane hire, crane hire prices, tower crane hire, HIAB hire cost"
        canonicalUrl="/"
        breadcrumbs={[{ name: 'Home', url: '/' }]}
        calculatorName="CraneQuote UK - Crane Hire Cost Calculators"
        aggregateRating={{ value: '4.8', count: '156' }}
        faqs={faqs}
      />

      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              UK Crane Hire
              <span className="text-accent-400"> Cost Calculator</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Free instant estimates for crane hire costs. Compare prices, understand your options, and get quotes from local crane companies.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/crane-hire-cost-calculator" className="btn-accent flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Calculate Costs Now
              </Link>
              <Link to="/get-quotes" className="btn-outline border-white text-white hover:bg-white/10 flex items-center gap-2">
                Get Free Quotes
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 pt-8 border-t border-primary-400/30 text-primary-100 text-sm">
              {trustSignals.map((signal, index) => (
                <span key={index} className="flex items-center gap-1.5">
                  <signal.icon className="w-4 h-4" />
                  {signal.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary-500" />
            Quick Answer: How Much Does Crane Hire Cost UK?
          </h2>
          <p className="text-gray-700 mb-4 quick-answer">
            <strong>UK crane hire costs £300-£2,500+ per day depending on crane type and capacity.</strong> City cranes: £400-650/day. Mobile cranes: £550-1,500/day. All-terrain: £800-2,500/day. Contract lift adds 80-120% to CPA rates but includes full service. London prices are 30% higher than national average.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <div className="text-xs text-gray-600 font-medium mb-1">City Crane</div>
              <div className="text-2xl font-bold text-gray-900">£400-650</div>
              <div className="text-xs text-gray-500">/day</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <div className="text-xs text-blue-600 font-medium mb-1">Mobile Crane</div>
              <div className="text-2xl font-bold text-blue-700">£550-1,500</div>
              <div className="text-xs text-gray-500">/day</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <div className="text-xs text-green-600 font-medium mb-1">All-Terrain</div>
              <div className="text-2xl font-bold text-green-700">£800-2,500</div>
              <div className="text-xs text-gray-500">/day</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl text-center">
              <div className="text-xs text-purple-600 font-medium mb-1">Heavy Lift</div>
              <div className="text-2xl font-bold text-purple-700">£1,500+</div>
              <div className="text-xs text-gray-500">/day</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="calculators">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Free Crane Hire Calculators
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional tools to help you estimate costs, choose the right crane, and make informed decisions.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Link
              key={calc.id}
              to={calc.href}
              className={`${calc.bg} rounded-2xl p-6 transition-all duration-200 group relative`}
            >
              {calc.popular && (
                <span className="absolute top-4 right-4 bg-accent-500 text-primary-900 text-xs font-bold px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
              <calc.icon className={`w-10 h-10 ${calc.color} mb-4`} />
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                {calc.title}
              </h3>
              <p className="text-gray-600 mb-4">{calc.description}</p>
              <span className={`inline-flex items-center gap-1 ${calc.color} font-semibold text-sm`}>
                Use Calculator
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get crane hire estimates in under 2 minutes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Your Requirements</h3>
              <p className="text-gray-600">Tell us about your lift - load weight, location, duration, and any special requirements.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Get Instant Estimates</h3>
              <p className="text-gray-600">See recommended crane sizes and cost ranges based on current UK market rates.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Request Actual Quotes</h3>
              <p className="text-gray-600">Connect with local crane companies to get formal quotes for your specific project.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Covering All UK Regions</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our calculators include regional pricing adjustments to give you accurate estimates wherever your project is located.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {regionData.map((item) => (
                <div key={item.region} className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  <span className="text-gray-700">{item.region}</span>
                  <span className="text-xs text-gray-500">({item.adjustment})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Prices Vary by Region</h3>
            <ul className="space-y-3">
              {whyPricesVary.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary-500 to-primary-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Your Crane Hire Quote?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Use our free calculators or connect directly with crane companies in your area.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/crane-hire-cost-calculator" className="btn-accent flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Start Calculating
            </Link>
            <Link to="/get-quotes" className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
              Get Free Quotes
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
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
            Based on CPA industry data
          </span>
        </div>
      </section>
    </>
  );
}
