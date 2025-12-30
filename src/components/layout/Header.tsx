import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calculator, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Calculators',
    href: '#',
    children: [
      { name: 'Crane Size Calculator', href: '/crane-size-calculator' },
      { name: 'Hire Cost Estimator', href: '/crane-hire-cost-calculator' },
      { name: 'CPA vs Contract Lift', href: '/cpa-vs-contract-lift' },
      { name: 'Transport Calculator', href: '/transport-cost-calculator' },
      { name: 'Total Project Cost', href: '/total-project-cost' },
    ],
  },
  { name: 'Get Quotes', href: '/get-quotes' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-primary-500">Crane</span>
                <span className="text-xl font-bold text-accent-500">Quote</span>
                <span className="text-xs text-gray-500 block -mt-1">.co.uk</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => (
              item.children ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => setCalculatorsOpen(!calculatorsOpen)}
                    onBlur={() => setTimeout(() => setCalculatorsOpen(false), 150)}
                    className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-500 font-medium transition-colors"
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${calculatorsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {calculatorsOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className={`block px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                            isActive(child.href) ? 'text-primary-500 bg-primary-50' : 'text-gray-700'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-500'
                      : 'text-gray-700 hover:text-primary-500'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <Link
              to="/get-quotes"
              className="ml-4 btn-accent text-sm py-2"
            >
              Get Free Quotes
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-primary-500"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navigation.map((item) => (
              item.children ? (
                <div key={item.name}>
                  <button
                    onClick={() => setCalculatorsOpen(!calculatorsOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-700 font-medium"
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${calculatorsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {calculatorsOpen && (
                    <div className="pl-6 pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block px-4 py-2.5 text-sm ${
                            isActive(child.href) ? 'text-primary-500' : 'text-gray-600'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 font-medium ${
                    isActive(item.href) ? 'text-primary-500' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <div className="px-4 pt-4">
              <Link
                to="/get-quotes"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full btn-accent text-center"
              >
                Get Free Quotes
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
