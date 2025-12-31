import { Link } from 'react-router-dom';
import { SEOHead } from '../components/layout';
import {
  Users,
  Target,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  PoundSterling,
  Truck,
  Award,
  Phone,
  Mail,
  MapPin,
  Building2,
  Handshake
} from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'We only work with vetted, established crane hire companies. No hidden fees, no misleading quotes – just honest connections.'
  },
  {
    icon: Clock,
    title: 'Speed & Efficiency',
    description: 'Get up to 3 competitive quotes within 24-48 hours. Our streamlined process saves you hours of research and phone calls.'
  },
  {
    icon: PoundSterling,
    title: 'Best Value',
    description: 'Comparing quotes helps you find the best price. Our users typically save 15-20% compared to going with the first quote.'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Our calculators and guides help you understand crane hire. Make informed decisions with confidence.'
  }
];

const howItWorks = [
  {
    step: '1',
    title: 'Tell Us Your Requirements',
    description: 'Fill in our simple form with details about your lift – location, what you\'re lifting, and when you need it.'
  },
  {
    step: '2',
    title: 'We Match You With Suppliers',
    description: 'We select up to 3 suitable crane hire companies from our vetted network based on your specific requirements.'
  },
  {
    step: '3',
    title: 'Receive & Compare Quotes',
    description: 'Crane companies contact you directly with their quotes. Compare prices, services, and choose the best option.'
  },
  {
    step: '4',
    title: 'Book With Confidence',
    description: 'Deal directly with your chosen crane hire company. We\'re here if you need any guidance along the way.'
  }
];

const stats = [
  { value: '500+', label: 'Quotes Requested' },
  { value: '50+', label: 'Partner Companies' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: 'UK-Wide', label: 'Coverage' }
];

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About CraneQuote | UK Crane Hire Comparison Service"
        description="CraneQuote helps you find and compare crane hire companies across the UK. Get up to 3 free quotes from vetted suppliers. Learn about our mission and how we work."
        keywords="about CraneQuote, crane hire comparison, UK crane hire, crane quote service, find crane hire"
        canonicalUrl="/about"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' }
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-200 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>About</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Making Crane Hire Simple
            </h1>
            <p className="text-xl text-primary-100 mb-6">
              CraneQuote connects you with trusted crane hire companies across the UK. 
              Compare quotes, save time, and find the right crane for your project.
            </p>
            <Link to="/get-quotes" className="inline-flex items-center gap-2 btn-accent">
              Get Free Quotes
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-600">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Finding the right crane hire company shouldn't be complicated. Yet for many people, 
                it involves hours of searching, multiple phone calls, and uncertainty about whether 
                they're getting a fair price.
              </p>
              <p>
                CraneQuote was created to solve this problem. We built a platform that makes it easy 
                to connect with trusted crane hire companies, compare quotes, and make informed decisions 
                – all in one place.
              </p>
              <p>
                Whether you're a construction professional who hires cranes regularly or a homeowner 
                who needs a crane for a one-off project, our service is designed to save you time 
                and help you find the best value.
              </p>
              <p>
                We work with established crane hire companies across the UK, from local specialists 
                to national operators. Our goal is simple: help you find the right crane, at the 
                right price, with minimum hassle.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                <p className="text-gray-600">What drives us every day</p>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To make crane hire accessible, transparent, and hassle-free for everyone in the UK – 
              from first-time users to industry professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our values guide everything we do, from the partners we work with to the tools we build.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <value.icon className="w-10 h-10 text-primary-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How CraneQuote Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting crane hire quotes has never been easier. Here's how our free service works.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((item, index) => (
            <div key={index} className="relative">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              {index < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-16 w-full h-0.5 bg-primary-200" style={{ width: 'calc(100% - 3rem)' }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-primary-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose CraneQuote?</h2>
            <p className="text-primary-200 max-w-2xl mx-auto">
              We're not just another quote site. Here's what makes us different.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Vetted Partners</h3>
              <p className="text-primary-200">
                We only work with established, reputable crane hire companies. 
                Every partner in our network is checked for insurance, credentials, and track record.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Free Service</h3>
              <p className="text-primary-200">
                Our service is completely free for customers. No fees, no obligations, no catches. 
                You're under no pressure to accept any quotes you receive.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">UK-Wide Coverage</h3>
              <p className="text-primary-200">
                From London to Edinburgh, we have partners across the UK. 
                Whatever your location, we'll connect you with nearby crane hire companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partner Network */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Partner Network</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We've built a network of trusted crane hire companies across the UK, ranging from 
                local specialists with deep regional knowledge to national operators with extensive fleets.
              </p>
              <p>
                Every company in our network is vetted for:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Insurance & Credentials:</strong> Full public liability and plant insurance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Qualified Operators:</strong> CPCS certified crane operators</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Well-Maintained Fleet:</strong> Modern, regularly inspected equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Track Record:</strong> Established companies with proven reliability</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Crane Types Available</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Mobile Cranes',
                'City Cranes',
                'All-Terrain Cranes',
                'Crawler Cranes',
                'Tower Cranes',
                'Spider Cranes',
                'HIAB / Lorry Loaders',
                'Mini Cranes'
              ].map((type, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary-500" />
                  <span className="text-gray-700">{type}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-gray-600 text-sm">
                From 3-tonne mini cranes to 500+ tonne heavy lift specialists, 
                our network covers all crane hire requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our service? We're here to help.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <Mail className="w-8 h-8 text-primary-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
              <p className="text-gray-600 text-sm">hello@cranequote.co.uk</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <Phone className="w-8 h-8 text-primary-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
              <p className="text-gray-600 text-sm">Coming soon</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <MapPin className="w-8 h-8 text-primary-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Coverage</h3>
              <p className="text-gray-600 text-sm">UK-Wide Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-accent-500 to-accent-600 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
            Ready to Find Your Crane?
          </h2>
          <p className="text-primary-800 mb-6 max-w-2xl mx-auto">
            Get up to 3 free quotes from vetted crane hire companies in your area. 
            No obligation, no fees – just competitive quotes delivered fast.
          </p>
          <Link to="/get-quotes" className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition shadow-lg">
            Get Free Quotes Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
