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

const tableOfContents = [
  { id: 'introduction', title: '1. Introduction to Crane Hire' },
  { id: 'types-of-cranes', title: '2. Types of Cranes' },
  { id: 'choosing-right-crane', title: '3. Choosing the Right Crane' },
  { id: 'cpa-vs-contract', title: '4. CPA Hire vs Contract Lift' },
  { id: 'costs', title: '5. Understanding Costs' },
  { id: 'hiring-process', title: '6. The Hiring Process' },
  { id: 'safety-regulations', title: '7. Safety & Regulations' },
  { id: 'tips', title: '8. Tips for a Successful Hire' },
  { id: 'faqs', title: '9. FAQs' }
];

const craneTypes = [
  {
    name: 'Mobile Crane',
    capacity: '20-500+ tonnes',
    bestFor: 'Construction sites, infrastructure projects, industrial lifts',
    description: 'The most versatile crane type. Mounted on a wheeled chassis, mobile cranes can travel on roads and set up quickly. Available in a wide range of capacities from 20t to over 500t.'
  },
  {
    name: 'City Crane',
    capacity: '13-60 tonnes',
    bestFor: 'Urban sites, restricted access, residential projects',
    description: 'Compact mobile cranes designed for tight urban environments. Shorter setup time, smaller footprint, but still capable of significant lifts.'
  },
  {
    name: 'All-Terrain Crane',
    capacity: '35-220 tonnes',
    bestFor: 'Mixed terrain, remote sites, varied ground conditions',
    description: 'Combines the road mobility of truck cranes with off-road capability. Ideal for sites with challenging access or mixed terrain.'
  },
  {
    name: 'Crawler Crane',
    capacity: '50-3,000+ tonnes',
    bestFor: 'Heavy lifts, soft ground, long-term projects',
    description: 'Mounted on tracks instead of wheels. Excellent stability and can work on soft ground. Cannot travel on roads – must be transported to site.'
  },
  {
    name: 'Tower Crane',
    capacity: '6-20 tonnes (at tip)',
    bestFor: 'High-rise construction, long-term projects, repeated lifts',
    description: 'Fixed cranes for major construction projects. Excellent height and reach. Require planning permission and significant setup time.'
  },
  {
    name: 'Spider Crane',
    capacity: '1-10 tonnes',
    bestFor: 'Indoor work, restricted access, glass installation',
    description: 'Compact cranes that can fit through standard doorways. Perfect for indoor lifts, atriums, and sites with very restricted access.'
  },
  {
    name: 'HIAB / Lorry Loader',
    capacity: '1-25 tonnes',
    bestFor: 'Deliveries, plant movements, quick lifts',
    description: 'Crane mounted on a lorry. Combines transport and lifting. Ideal for deliveries and short-duration lifts where a separate crane would be overkill.'
  }
];

const faqs = [
  {
    q: 'How far in advance should I book a crane?',
    a: 'For standard crane hire, 1-2 weeks advance booking is usually sufficient. For larger cranes (100t+), complex lifts, or busy periods, book 3-4 weeks ahead. Tower cranes and crawler cranes for major projects should be booked months in advance.'
  },
  {
    q: 'Do I need planning permission for crane hire?',
    a: 'Generally no for mobile cranes on private land. However, you may need permits for: road closures (if outriggers extend into roads), lifting over public highways, working near airports, and tower crane installation. Your crane company can advise on specific requirements.'
  },
  {
    q: 'What happens if my lift is cancelled due to weather?',
    a: 'Most crane companies have weather cancellation policies. If the crane arrives but cannot work safely due to wind, you may still be charged for mobilisation. Always discuss weather policies when booking and check forecasts before your lift date.'
  },
  {
    q: 'Can I operate the crane myself?',
    a: 'For most crane types, no – you need a qualified operator (CPCS certified). Some HIAB/lorry loaders can be operated by trained customers, but this is rare. Crane hire almost always includes an operator for safety and insurance reasons.'
  },
  {
    q: 'What information do I need to get a quote?',
    a: 'To get accurate quotes, you\'ll need: load weight, lift radius (how far from crane to load), lift height, site location, site access details (width, ground conditions), and your preferred dates. The more detail you provide, the more accurate your quotes will be.'
  },
  {
    q: 'What if my lift takes longer than expected?',
    a: 'Most crane hire is charged by the day or half-day. If your lift overruns into additional time, you\'ll typically be charged overtime rates. Discuss potential overrun scenarios and rates when booking to avoid surprises.'
  },
  {
    q: 'Is crane hire covered by my site insurance?',
    a: 'Your site insurance may cover some aspects, but crane operations typically need specific cover. With CPA hire, you\'re responsible for lifting insurance. With contract lift, the crane company provides full coverage. Always verify insurance arrangements before the lift.'
  },
  {
    q: 'What ground conditions do cranes need?',
    a: 'Cranes need stable, level ground to operate safely. Mobile cranes use outriggers that spread the load, but still need firm ground or crane mats. Crawler cranes can work on softer ground. Your crane company will assess ground conditions during planning.'
  }
];

const hiringSteps = [
  {
    step: 1,
    title: 'Define Your Requirements',
    description: 'Determine load weight, lift radius, height, site access, and dates. The more accurate your information, the better quotes you\'ll receive.'
  },
  {
    step: 2,
    title: 'Get Multiple Quotes',
    description: 'Request quotes from 2-3 crane companies. Compare not just price, but what\'s included, company reputation, and availability.'
  },
  {
    step: 3,
    title: 'Site Survey (if needed)',
    description: 'For complex lifts, the crane company may want to visit the site. This ensures they recommend the right crane and identify any issues.'
  },
  {
    step: 4,
    title: 'Confirm Booking',
    description: 'Once you\'ve chosen a company, confirm the booking in writing. Clarify what\'s included, cancellation terms, and payment schedule.'
  },
  {
    step: 5,
    title: 'Pre-Lift Planning',
    description: 'For contract lift, the crane company handles this. For CPA hire, your Appointed Person prepares the lift plan and risk assessment.'
  },
  {
    step: 6,
    title: 'Lift Day',
    description: 'Crane arrives, sets up, and performs the lift. Ensure site is ready – clear access, ground prepared, and all personnel briefed.'
  },
  {
    step: 7,
    title: 'Completion & Payment',
    description: 'Once the lift is complete and crane has left, you\'ll receive an invoice. Payment terms vary but are typically 14-30 days.'
  }
];

const tips = [
  {
    title: 'Book Early',
    tip: 'Especially for larger cranes or busy periods. 2-3 weeks minimum for standard hire, longer for specialist equipment.'
  },
  {
    title: 'Be Accurate with Requirements',
    tip: 'Measure load weights and distances carefully. Underestimating means the crane can\'t do the job; overestimating means you pay for more crane than needed.'
  },
  {
    title: 'Get Multiple Quotes',
    tip: 'Prices vary significantly. Getting 3 quotes helps you understand the market rate and find the best value.'
  },
  {
    title: 'Clarify What\'s Included',
    tip: 'Ensure you understand exactly what\'s covered in the quote – transport, operator hours, fuel, insurance, etc.'
  },
  {
    title: 'Prepare Your Site',
    tip: 'Clear access, stable ground, and a safe working area. Delays caused by site issues are typically charged to you.'
  },
  {
    title: 'Check Weather Forecasts',
    tip: 'High winds can prevent crane operations. Monitor forecasts and have contingency plans for weather delays.'
  },
  {
    title: 'Communicate Clearly',
    tip: 'Brief everyone involved. Make sure the crane operator knows exactly what\'s being lifted and where it\'s going.'
  },
  {
    title: 'Consider Contract Lift for Complex Lifts',
    tip: 'The extra cost is often worth it for the peace of mind and transferred liability on difficult operations.'
  }
];

export default function CraneHireGuide() {
  return (
    <>
      <SEOHead
        title="Complete UK Crane Hire Guide 2025 | Everything You Need to Know"
        description="Comprehensive guide to crane hire in the UK. Learn about crane types, costs, CPA vs contract lift, safety regulations, and how to choose the right crane. Free expert advice."
        keywords="crane hire guide, UK crane hire, how to hire a crane, crane hire explained, crane types UK, crane hire costs, CPA hire, contract lift, crane hire tips"
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
            Whether you're hiring a crane for the first time or looking to brush up on best practices, 
            this comprehensive guide covers everything from choosing the right crane to understanding costs and regulations.
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Contents</h3>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-600 hover:text-primary-600 transition py-1"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t">
                <Link to="/get-quotes" className="flex items-center justify-center gap-2 btn-primary text-sm w-full">
                  Get Free Quotes
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <article className="space-y-12">
              
              {/* Section 1: Introduction */}
              <section id="introduction" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">1</span>
                  Introduction to Crane Hire
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    Crane hire is essential for countless construction, industrial, and even residential projects across the UK. 
                    From lifting steel beams on a building site to placing a hot tub in a back garden, cranes make it possible 
                    to move heavy loads safely and efficiently.
                  </p>
                  <p>
                    The UK crane hire industry includes everything from small owner-operators with a single machine to 
                    large national fleets with hundreds of cranes. This diversity means there's always a crane available 
                    for your needs – the challenge is finding the right one at the right price.
                  </p>
                  <p>
                    This guide will walk you through everything you need to know about hiring a crane in the UK, 
                    from understanding the different types available to navigating costs and safety requirements.
                  </p>
                </div>
                <div className="bg-primary-50 border-l-4 border-primary-500 p-4 mt-6">
                  <p className="text-primary-800 font-medium">
                    <strong>Key takeaway:</strong> Crane hire doesn't have to be complicated. With the right information 
                    and preparation, you can find the perfect crane for your project at a competitive price.
                  </p>
                </div>
              </section>

              {/* Section 2: Types of Cranes */}
              <section id="types-of-cranes" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">2</span>
                  Types of Cranes
                </h2>
                <p className="text-gray-700 mb-6">
                  Different projects require different cranes. Understanding the options available helps you 
                  request the right equipment and avoid paying for more crane than you need.
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
                      <p className="text-gray-700 mb-3">{crane.description}</p>
                      <p className="text-sm text-gray-600">
                        <strong className="text-gray-700">Best for:</strong> {crane.bestFor}
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
                    Our Crane Size Calculator helps you determine the right tonnage based on your load weight, 
                    lift radius, and height requirements.
                  </p>
                  <Link to="/crane-size-calculator" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline">
                    Try the Crane Size Calculator
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>

              {/* Section 3: Choosing the Right Crane */}
              <section id="choosing-right-crane" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">3</span>
                  Choosing the Right Crane
                </h2>
                <p className="text-gray-700 mb-6">
                  Selecting the correct crane depends on several factors. Getting this right ensures your lift 
                  is safe, efficient, and cost-effective.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Factors to Consider</h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-bold text-gray-900 mb-2">Load Weight</h4>
                    <p className="text-gray-700 text-sm">
                      Know the exact weight of what you're lifting, including rigging equipment. 
                      Add a 25% safety margin. Crane capacity decreases significantly with reach.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-bold text-gray-900 mb-2">Lift Radius</h4>
                    <p className="text-gray-700 text-sm">
                      The distance from the crane's centre to where the load needs to be placed. 
                      Greater radius means you need more crane capacity – this is critical.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-bold text-gray-900 mb-2">Lift Height</h4>
                    <p className="text-gray-700 text-sm">
                      How high does the load need to go? Consider obstacles and the final placement height. 
                      Different cranes have different maximum heights.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-bold text-gray-900 mb-2">Site Access</h4>
                    <p className="text-gray-700 text-sm">
                      Can a large crane physically get to your site? Consider road widths, overhead cables, 
                      gates, and turning space. Restricted sites may need city or spider cranes.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-bold text-gray-900 mb-2">Ground Conditions</h4>
                    <p className="text-gray-700 text-sm">
                      Cranes need stable ground. Soft, uneven, or sloped ground may require crane mats, 
                      crawler cranes, or ground preparation before the lift.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-bold text-gray-900 mb-2">Duration</h4>
                    <p className="text-gray-700 text-sm">
                      Quick one-off lift or ongoing project? Single lifts suit mobile cranes. 
                      Long-term projects might justify tower crane installation.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">The Radius-Capacity Relationship</h3>
                <p className="text-gray-700 mb-4">
                  This is the most important concept in crane selection. A crane's lifting capacity 
                  decreases dramatically as the lift radius increases.
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full bg-white border border-gray-200 rounded-xl">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Radius</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b">50t Crane</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b">100t Crane</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="px-4 py-2 border-b">3m</td><td className="px-4 py-2 border-b text-center">50t</td><td className="px-4 py-2 border-b text-center">100t</td></tr>
                      <tr><td className="px-4 py-2 border-b">5m</td><td className="px-4 py-2 border-b text-center">35t</td><td className="px-4 py-2 border-b text-center">70t</td></tr>
                      <tr><td className="px-4 py-2 border-b">10m</td><td className="px-4 py-2 border-b text-center">20t</td><td className="px-4 py-2 border-b text-center">45t</td></tr>
                      <tr><td className="px-4 py-2 border-b">15m</td><td className="px-4 py-2 border-b text-center">12t</td><td className="px-4 py-2 border-b text-center">28t</td></tr>
                      <tr><td className="px-4 py-2 border-b">20m</td><td className="px-4 py-2 border-b text-center">8t</td><td className="px-4 py-2 border-b text-center">18t</td></tr>
                      <tr><td className="px-4 py-2">25m</td><td className="px-4 py-2 text-center">5t</td><td className="px-4 py-2 text-center">12t</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500">* Approximate values for illustration. Actual capacities vary by crane model.</p>
              </section>

              {/* Section 4: CPA vs Contract Lift */}
              <section id="cpa-vs-contract" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">4</span>
                  CPA Hire vs Contract Lift
                </h2>
                <p className="text-gray-700 mb-6">
                  This is one of the most important decisions when hiring a crane. The two main options 
                  have very different implications for cost, responsibility, and liability.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-blue-800 mb-3">CPA Hire</h3>
                    <p className="text-blue-900 mb-4">
                      "Bare" hire – you get the crane and operator, but you're responsible for everything else.
                    </p>
                    <h4 className="font-semibold text-blue-800 mb-2">Includes:</h4>
                    <ul className="space-y-1 mb-4">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Crane</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Qualified operator</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Basic crane insurance</span>
                      </li>
                    </ul>
                    <h4 className="font-semibold text-blue-800 mb-2">You provide:</h4>
                    <ul className="space-y-1 text-sm text-blue-900">
                      <li>• Appointed Person (lift planner)</li>
                      <li>• Slingers / banksmen</li>
                      <li>• Lifting operation insurance</li>
                      <li>• Lift plan documentation</li>
                      <li>• Permits if required</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-purple-800 mb-3">Contract Lift</h3>
                    <p className="text-purple-900 mb-4">
                      Fully managed service – the crane company handles everything and takes full responsibility.
                    </p>
                    <h4 className="font-semibold text-purple-800 mb-2">Includes:</h4>
                    <ul className="space-y-1 mb-4">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Crane</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Qualified operator</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Appointed Person</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Slingers / banksmen</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Full insurance coverage</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Lift planning & risk assessment</span>
                      </li>
                    </ul>
                    <p className="text-sm text-purple-900 font-medium">
                      Crane company takes full liability for the lift operation.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Compare the options in detail
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Our CPA vs Contract Lift Calculator helps you compare costs and understand 
                    which option is best for your specific situation.
                  </p>
                  <Link to="/cpa-vs-contract-lift" className="inline-flex items-center gap-2 text-purple-600 font-medium hover:underline">
                    Try the CPA vs Contract Lift Calculator
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>

              {/* Section 5: Understanding Costs */}
              <section id="costs" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">5</span>
                  Understanding Costs
                </h2>
                <p className="text-gray-700 mb-6">
                  Crane hire costs vary significantly based on crane type, capacity, location, and hire type. 
                  Here's a breakdown of what to expect.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Typical Daily Rates (CPA Hire)</h3>
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

                <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Costs</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Transport / Mobilisation</h4>
                    <p className="text-gray-700 text-sm mb-2">Getting the crane to and from your site.</p>
                    <p className="text-primary-600 font-medium">£200 - £1,500+</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Slingers / Banksmen</h4>
                    <p className="text-gray-700 text-sm mb-2">Required for CPA hire.</p>
                    <p className="text-primary-600 font-medium">£160 - £280/day each</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Appointed Person</h4>
                    <p className="text-gray-700 text-sm mb-2">Required for CPA hire.</p>
                    <p className="text-primary-600 font-medium">£400 - £800/day</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Permits</h4>
                    <p className="text-gray-700 text-sm mb-2">Road closures, airspace, etc.</p>
                    <p className="text-primary-600 font-medium">£50 - £500+</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <PoundSterling className="w-5 h-5 text-green-600" />
                    Get a personalised cost estimate
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Our Hire Cost Calculator provides estimates based on your specific requirements, 
                    including regional adjustments and duration discounts.
                  </p>
                  <Link to="/crane-hire-cost-calculator" className="inline-flex items-center gap-2 text-green-600 font-medium hover:underline">
                    Try the Hire Cost Calculator
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>

              {/* Section 6: The Hiring Process */}
              <section id="hiring-process" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">6</span>
                  The Hiring Process
                </h2>
                <p className="text-gray-700 mb-6">
                  Understanding the typical crane hire process helps ensure your project runs smoothly.
                </p>

                <div className="space-y-4">
                  {hiringSteps.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <p className="text-gray-700 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 7: Safety & Regulations */}
              <section id="safety-regulations" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">7</span>
                  Safety & Regulations
                </h2>
                <p className="text-gray-700 mb-6">
                  Crane operations are heavily regulated in the UK to ensure safety.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Regulations</h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary-500" />
                      LOLER (Lifting Operations and Lifting Equipment Regulations 1998)
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Requires all lifting operations to be properly planned, supervised, and carried out safely. 
                      Equipment must be fit for purpose and regularly inspected.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary-500" />
                      PUWER (Provision and Use of Work Equipment Regulations 1998)
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Ensures work equipment is suitable, maintained, and that users are trained. 
                      Crane operators must hold appropriate qualifications.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary-500" />
                      BS 7121 (Code of Practice for Safe Use of Cranes)
                    </h4>
                    <p className="text-gray-700 text-sm">
                      British Standard providing detailed guidance on crane operations. 
                      Defines roles including Appointed Person, Crane Supervisor, and Slinger/Signaller.
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Important Safety Note
                  </h4>
                  <p className="text-red-800 text-sm">
                    Never cut corners on crane safety. Accidents can be fatal. If you're unsure about any aspect 
                    of a lifting operation, always ask questions or choose contract lift where the crane company 
                    takes responsibility for safe execution.
                  </p>
                </div>
              </section>

              {/* Section 8: Tips */}
              <section id="tips" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">8</span>
                  Tips for a Successful Hire
                </h2>
                
                <div className="space-y-4">
                  {tips.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <p className="text-gray-700 text-sm">{item.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 9: FAQs */}
              <section id="faqs" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">9</span>
                  Frequently Asked Questions
                </h2>
                
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

            </article>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-8 text-center mt-12">
              <h2 className="text-2xl font-bold text-primary-900 mb-3">Ready to Hire a Crane?</h2>
              <p className="text-primary-800 mb-6 max-w-xl mx-auto">
                Now you know everything about crane hire, get free quotes from vetted companies in your area. 
                No obligation, no fees – just competitive quotes delivered fast.
              </p>
              <Link to="/get-quotes" className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition shadow-lg">
                Get Free Quotes Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
