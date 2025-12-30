import { SEOHead } from '../components/layout';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  Shield,
  Phone,
  Mail,
  Building2,
  HelpCircle,
  Zap,
  PoundSterling
} from 'lucide-react';

const faqs = [
  {
    q: 'How does the free quote service work?',
    a: 'Simply fill in the form with your project details. We share your requirements with up to 3 vetted crane hire companies in your area who will contact you directly with competitive quotes. There is no obligation and the service is completely free.'
  },
  {
    q: 'How quickly will I receive quotes?',
    a: 'Most crane companies respond within 24-48 hours on working days. For urgent requirements, mention this in your project details and companies will prioritise your enquiry. Same-day responses are common for straightforward hire requests.'
  },
  {
    q: 'What information do I need to provide?',
    a: 'The more detail you provide, the more accurate your quotes will be. Key information includes: load weight, lift height and radius, site location (postcode), preferred dates, site access conditions, and whether you need CPA hire or contract lift.'
  },
  {
    q: 'Is this service really free?',
    a: 'Yes, completely free with no hidden charges. Crane companies pay a small fee to receive qualified leads, which allows us to offer this matching service at no cost to you. You are under no obligation to accept any quote.'
  },
  {
    q: 'How do you select crane companies?',
    a: 'We work with established crane hire companies across the UK. Partners are selected based on their fleet quality, safety record, insurance coverage, and customer reviews. We match your requirements with companies that have the right equipment and coverage in your area.'
  },
  {
    q: 'Can I get quotes for contract lift as well as CPA hire?',
    a: 'Yes, specify your preference in the form or request quotes for both options. Many companies offer both CPA hire and contract lift services. Contract lift is recommended for complex lifts or if you do not have an Appointed Person on your team.'
  }
];

const benefits = [
  { icon: PoundSterling, title: 'Compare Prices', description: 'Get up to 3 competitive quotes from local crane companies' },
  { icon: Clock, title: 'Save Time', description: 'One form, multiple quotes - no need to contact companies individually' },
  { icon: Shield, title: 'Vetted Companies', description: 'All partners are established, insured crane hire specialists' },
  { icon: Zap, title: 'Fast Response', description: 'Most companies respond within 24-48 hours' }
];

const trustSignals = [
  { icon: Building2, text: 'UK-wide coverage' },
  { icon: Shield, text: 'Vetted partners' },
  { icon: Users, text: 'No obligation' },
  { icon: CheckCircle2, text: '100% free service' }
];

export default function GetQuotesPage() {
  return (
    <>
      <SEOHead
        title="Get Free Crane Hire Quotes UK | Compare Local Companies"
        description="Get free crane hire quotes from vetted UK companies. Compare prices for mobile crane, tower crane, HIAB and contract lift. No obligation, fast response within 24-48 hours."
        keywords="crane hire quotes, crane hire near me, mobile crane hire quotes, contract lift quotes, crane hire companies UK, free crane quotes, compare crane hire prices"
        canonicalUrl="/get-quotes"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Get Quotes', url: '/get-quotes' }
        ]}
        faqs={faqs}
      />

      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Get Free Crane Hire
              <span className="text-accent-400"> Quotes</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-6">
              Compare prices from vetted crane companies in your area. Fill in your requirements once and receive up to 3 competitive quotes.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-primary-100 text-sm">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
                <h2 className="text-xl font-bold mb-2">Request Your Free Quotes</h2>
                <p className="text-primary-100 text-sm">
                  Complete the form below and receive up to 3 quotes from crane hire companies in your area.
                </p>
              </div>
              <div className="p-0">
                <iframe
                  src="https://app.smartsuite.com/form/sba974gi/kALvMPLaXK?header=false"
                  width="100%"
                  height="700px"
                  frameBorder="0"
                  title="Crane Hire Quote Request Form"
                  className="border-0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Why Use Our Service?</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-accent-50 rounded-2xl p-6 border border-accent-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-accent-600" />
                Need Help?
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Not sure what you need? Use our free calculators to work out the right crane size and get cost estimates before requesting quotes.
              </p>
              <div className="space-y-2">
                <a href="/crane-size-calculator" className="block text-primary-600 hover:text-primary-700 font-medium text-sm">
                  → Crane Size Calculator
                </a>
                <a href="/crane-hire-cost-calculator" className="block text-primary-600 hover:text-primary-700 font-medium text-sm">
                  → Hire Cost Estimator
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What Happens Next?</h3>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                  <span>We receive your requirements and match you with suitable crane companies</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                  <span>Up to 3 companies contact you directly with quotes (usually within 24-48 hours)</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                  <span>Compare quotes and choose the best option for your project</span>
                </li>
              </ol>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Contact Us</h3>
              <p className="text-gray-600 text-sm mb-4">
                Questions about our service? Get in touch.
              </p>
              <div className="space-y-2 text-sm">
                <a href="mailto:hello@cranequote.co.uk" className="flex items-center gap-2 text-gray-700 hover:text-primary-600">
                  <Mail className="w-4 h-4" />
                  hello@cranequote.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Response within 24-48 hours
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            UK-wide coverage
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            No obligation quotes
          </span>
        </div>
      </section>
    </>
  );
}
