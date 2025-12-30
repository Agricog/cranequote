import { Link } from 'react-router-dom';
import { Calculator, Mail, MapPin } from 'lucide-react';

const calculatorLinks = [
  { name: 'Crane Size Calculator', href: '/crane-size-calculator' },
  { name: 'Hire Cost Estimator', href: '/crane-hire-cost-calculator' },
  { name: 'CPA vs Contract Lift', href: '/cpa-vs-contract-lift' },
  { name: 'Transport Calculator', href: '/transport-cost-calculator' },
  { name: 'Total Project Cost', href: '/total-project-cost' },
];

const resourceLinks = [
  { name: 'Get Quotes', href: '/get-quotes' },
  { name: 'Crane Hire Guide', href: '/crane-hire-guide' },
  { name: 'About Us', href: '/about' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Crane</span>
                <span className="text-xl font-bold text-accent-400">Quote</span>
              </div>
            </Link>
            <p className="text-primary-200 text-sm mb-4">
              Free crane hire cost calculators for UK construction professionals. 
              Get instant estimates and compare quotes from local crane companies.
            </p>
            <div className="space-y-2 text-sm text-primary-200">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Serving all UK regions
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hello@cranequote.co.uk
              </p>
            </div>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="font-semibold text-white mb-4">Calculators</h3>
            <ul className="space-y-2">
              {calculatorLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-200 text-sm">
              © {currentYear} CraneQuote.co.uk. All rights reserved.
            </p>
            <p className="text-primary-300 text-xs">
              Part of the <a href="https://autaimate.co.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white">Autaimate</a> family
            </p>
          </div>
          <p className="text-primary-300 text-xs mt-4 text-center md:text-left">
            Disclaimer: Cost estimates are indicative only and based on typical UK market rates. 
            Actual prices may vary based on specific requirements, availability, and market conditions. 
            Always obtain formal quotes from crane hire companies before making decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
