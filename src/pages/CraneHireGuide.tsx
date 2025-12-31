import { Link } from 'react-router-dom';
import { SEOHead } from '../components/layout';
import {
  BookOpen,
  Clock,
  Users,
  ArrowRight,
  Scale,
  PoundSterling,
  FileText,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Shield,
  HelpCircle,
  ChevronRight,
  ClipboardList
} from 'lucide-react';

const craneTypes = [
  {
    name: 'Mobile Crane',
    capacity: '20-500+ tonnes',
    bestFor: 'Construction sites, infrastructure projects, industrial lifts',
    description: 'The most versatile crane type. Mounted on a wheeled chassis, mobile cranes can travel on roads and set up quickly.'
  },
  {
    name: 'City Crane',
    capacity: '13-60 tonnes',
    bestFor: 'Urban sites, restricted access, residential projects',
    description: 'Compact mobile cranes designed for tight urban environments. Shorter setup time, smaller footprint.'
  },
  {
    name: 'All-Terrain Crane',
    capacity: '35-220 tonnes',
    bestFor: 'Mixed terrain, remote sites, varied ground conditions',
    description: 'Combines road mobility with off-road capability. Ideal for sites with challenging access.'
  },
  {
    name: 'Crawler Crane',
    capacity: '50-3,000+ tonnes',
    bestFor: 'Heavy lifts, soft ground, long-term projects',
    description: 'Mounted on tracks. Excellent stability on soft ground. Must be transported to site.'
  },
  {
    name: 'Tower Crane',
    capacity: '6-20 tonnes (at tip)',
    bestFor: 'High-rise construction, long-term projects',
    description: 'Fixed cranes for major construction. Require planning permission and significant setup.'
  },
  {
    name: 'Spider Crane',
    capacity: '1-10 tonnes',
    bestFor: 'Indoor work, restricted access, glass installation',
    description: 'Compact cranes that fit through standard doorways. Perfect for indoor lifts.'
  },
  {
    name: 'HIAB / Lorry Loader',
    capacity: '1-25 tonnes',
    bestFor: 'Deliveries, plant movements, quick lifts',
    description: 'Crane mounted on a lorry. Combines transport and lifting capability.'
  }
];

const faqs = [
  {
    q: 'How far in advance should I book a crane?',
    a: 'For standard crane hire, 1-2 weeks is usually sufficient. For larger cranes (100t+) or busy periods, book 3-4 weeks ahead.'
  },
  {
    q: 'Do I need planning permission for crane hire?',
    a: 'Generally no for mobile cranes on private land. You may need permits for road closures, lifting over highways, or working near airports.'
  },
  {
    q: 'What happens if weather cancels my lift?',
    a: 'Most companies have weather policies. If the crane arrives but cannot work due to wind, you may still be charged for mobilisation.'
  },
  {
    q: 'Can I operate the crane myself?',
    a: 'For most crane types, no – you need a qualified CPCS certified operator. Crane hire almost always includes an operator.'
  },
  {
    q: 'What information do I need for a quote?',
    a: 'Load weight, lift radius, lift height, site location, access details, and preferred dates. More detail means more accurate quotes.'
  },
  {
    q: 'What if my lift takes longer than expected?',
    a: 'Most hire is charged by day or half-day. Overruns typically incur overtime rates. Discuss potential overrun scenarios when booking.'
  }
];

export default function CraneHireGuide() {
  return (
    <>
      <SEOHead
        title="Complete UK Crane Hire Guide 2025 | Everything You Need to Know"
        description="Comprehensive guide to crane hire in the UK. Learn about crane types, costs, CPA vs contract lift, safety regulations, and how to choose the right crane."
        keywords="crane hire guide, UK crane hire, how to hire a crane, crane types UK, crane hire costs, CPA hire, contract lift"
        canonicalUrl="/crane-hire-guide"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Crane Hire Guide', url: '/crane-hire-guide' }
        ]}
        faqs={faqs}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-200 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Crane Hire Guide</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">The Complete UK Crane Hire Guide</h1>
              <p className="text-primary-200 mt-1">Everything you need to know in 2025</p>
            </div>
          </div>
          <p className="text-primary-100 max-w-3xl text-lg">
            Whether you are hiring a crane for the first time or looking to brush up on best practices, 
            this guide covers everything from choosing the right crane to understanding costs and regulations.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-6 text-primary-200 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              15 min read
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Updated January 2025
            </span>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links: Use Our Free Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Link to="/crane-size-calculator" className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
              <Scale className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Size Calculator</span>
            </Link>
            <Link to="/crane-hire-cost-calculator" className="flex items-center gap-2 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition">
              <PoundSterling className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Cost Estimator</span>
            </Link>
            <Link to="/cpa-vs-contract-lift" className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition">
              <FileText className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-900">CPA vs Contract</span>
            </Link>
            <Link to="/transport-cost-calculator" className="flex items-center gap-2 p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition">
              <Truck className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-900">Transport Cost</span>
            </Link>
            <Link to="/get-quotes" className="flex items-center gap-2 p-3 bg-accent-100 rounded-xl hover:bg-accent-200 transition">
              <ClipboardList className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-900">Get Quotes</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction to Crane Hire</h2>
          <p className="text-gray-700 mb-4">
            Crane hire is essential for countless construction, industrial, and residential projects across the UK. 
            From lifting steel beams on a building site to placing a hot tub in a back garden, cranes make it possible 
            to move heavy loads safely and efficiently.
          </p>
          <p className="text-gray-700 mb-4">
            The UK crane hire industry includes everything from small owner-operators with a single machine to 
            large national fleets with hundreds of cranes. This diversity means there is always a crane available 
            for your needs – the challenge is finding the right one at the right price.
          </p>
          <div className="bg-primary-50 border-l-4 border-primary-500 p-4">
            <p className="text-primary-800 font-medium">
              <strong>Key takeaway:</strong> Crane hire does not have to be complicated. With the right information 
              and preparation, you can find the perfect crane for your project at a competitive price.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types of Cranes</h2>
          <p className="text-gray-700 mb-6">
            Different projects require different cranes. Understanding the options helps you request the right equipment.
          </p>
          <div className="space-y-4">
            {craneTypes.map((crane, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{crane.name}</h3>
                  <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                    {crane.capacity}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{crane.description}</p>
                <p className="text-sm text-gray-600">
                  <strong>Best for:</strong> {crane.bestFor}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 rounded-xl p-6 mt-6">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              Not sure which crane you need?
            </h4>
            <p className="text-gray-700 mb-4">
              Our Crane Size Calculator helps you determine the right tonnage based on your requirements.
            </p>
            <Link to="/crane-size-calculator" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline">
              Try the Crane Size Calculator
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Choosing the Right Crane</h2>
          <p className="text-gray-700 mb-6">
            Selecting the correct crane depends on several factors. Getting this right ensures your lift is safe and cost-effective.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">Load Weight</h4>
              <p className="text-gray-700 text-sm">
                Know the exact weight including rigging. Add 25% safety margin.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">Lift Radius</h4>
              <p className="text-gray-700 text-sm">
                Distance from crane centre to load placement. Greater radius needs more capacity.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">Lift Height</h4>
              <p className="text-gray-700 text-sm">
                How high does the load need to go? Consider obstacles.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">Site Access</h4>
              <p className="text-gray-700 text-sm">
                Road widths, overhead cables, gates, turning space.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">Ground Conditions</h4>
              <p className="text-gray-700 text-sm">
                Cranes need stable ground. Soft ground may need mats or crawlers.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">Duration</h4>
              <p className="text-gray-700 text-sm">
                One-off lift or ongoing project? This affects crane choice.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. CPA Hire vs Contract Lift</h2>
          <p className="text-gray-700 mb-6">
            This is one of the most important decisions when hiring a crane.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-3">CPA Hire</h3>
              <p className="text-blue-900 mb-4">
                Crane + operator only. You manage everything else.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Crane included</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Operator included</span>
                </li>
                <li className="flex items-center gap-2 text-blue-700">
                  <span className="w-4 h-4 text-center">•</span>
                  <span>You provide: AP, slingers, insurance</span>
                </li>
              </ul>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-purple-800 mb-3">Contract Lift</h3>
              <p className="text-purple-900 mb-4">
                Fully managed. Crane company handles everything.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Crane + operator</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>AP + slingers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Full insurance + liability</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-purple-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Compare the options in detail
            </h4>
            <Link to="/cpa-vs-contract-lift" className="inline-flex items-center gap-2 text-purple-600 font-medium hover:underline">
              Try the CPA vs Contract Lift Calculator
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Understanding Costs</h2>
          <p className="text-gray-700 mb-6">
            Crane hire costs vary by type, capacity, location, and hire type.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Crane Type</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b">Capacity</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b">Daily Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="px-4 py-2 border-b">City Crane</td><td className="px-4 py-2 border-b text-center">13-60t</td><td className="px-4 py-2 border-b text-center font-medium text-primary-600">£400 - £650</td></tr>
                <tr><td className="px-4 py-2 border-b">Mobile Crane</td><td className="px-4 py-2 border-b text-center">20-100t</td><td className="px-4 py-2 border-b text-center font-medium text-primary-600">£550 - £1,500</td></tr>
                <tr><td className="px-4 py-2 border-b">All-Terrain</td><td className="px-4 py-2 border-b text-center">35-220t</td><td className="px-4 py-2 border-b text-center font-medium text-primary-600">£800 - £2,500</td></tr>
                <tr><td className="px-4 py-2 border-b">Crawler Crane</td><td className="px-4 py-2 border-b text-center">50-500t+</td><td className="px-4 py-2 border-b text-center font-medium text-primary-600">£1,000 - £4,000+</td></tr>
                <tr><td className="px-4 py-2 border-b">Spider Crane</td><td className="px-4 py-2 border-b text-center">1-10t</td><td className="px-4 py-2 border-b text-center font-medium text-primary-600">£350 - £700</td></tr>
                <tr><td className="px-4 py-2">HIAB</td><td className="px-4 py-2 text-center">1-25t</td><td className="px-4 py-2 text-center font-medium text-primary-600">£300 - £550</td></tr>
              </tbody>
            </table>
          </div>
          <div className="bg-green-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <PoundSterling className="w-5 h-5 text-green-600" />
              Get a personalised cost estimate
            </h4>
            <Link to="/crane-hire-cost-calculator" className="inline-flex items-center gap-2 text-green-600 font-medium hover:underline">
              Try the Hire Cost Calculator
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Safety and Regulations</h2>
          <p className="text-gray-700 mb-6">
            Crane operations are heavily regulated in the UK to ensure safety.
          </p>
          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-500" />
                LOLER 1998
              </h4>
              <p className="text-gray-700 text-sm">
                Lifting Operations and Lifting Equipment Regulations. Requires all lifting operations to be properly planned and supervised.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-500" />
                BS 7121
              </h4>
              <p className="text-gray-700 text-sm">
                Code of Practice for Safe Use of Cranes. Defines roles including Appointed Person and Slinger/Signaller.
              </p>
            </div>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Safety Note
            </h4>
            <p className="text-red-800 text-sm">
              Never cut corners on crane safety. Accidents can be fatal. If unsure, choose contract lift.
            </p>
          </div>
        </section>

        {/* Section 7 - FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-primary-900 mb-3">Ready to Hire a Crane?</h2>
          <p className="text-primary-800 mb-6">
            Get free quotes from vetted crane companies in your area. No obligation, no fees.
          </p>
          <Link to="/get-quotes" className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition shadow-lg">
            Get Free Quotes Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  );
}
