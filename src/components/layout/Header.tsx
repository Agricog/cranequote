import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Scale, PoundSterling, FileText, Truck, Calculator } from 'lucide-react';

const calculators = [
  { name: 'Crane Size Calculator', href: '/crane-size-calculator', icon: Scale, description: 'What tonnage do I need?' },
  { name: 'Hire Cost Estimator', href: '/crane-hire-cost-calculator', icon: PoundSterling, description: 'Get price estimates' },
  { name: 'CPA vs Contract Lift', href: '/cpa-vs-contract-lift', icon: FileText, description: 'Compare hire options' },
  { name: 'Transport Calculator', href: '/transport-cost-calculator', icon: Truck, description: 'Delivery costs' },
  { name: 'Total Project Cost', href: '/total-project-cost', icon: Calculator, description: 'Complete budget' }
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCalculatorsOpen(false);
  }, [location.pathname]);

  // Handle mouse enter with delay clear
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setCalculatorsOpen(true);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setCalculatorsOpen(false);
    }, 150);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CQ</span>
              </div>
              <span className="font-bold text-xl text-gray-900">CraneQuote</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Calculators Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium transition py-2"
                onClick={() => setCalculatorsOpen(!calculatorsOpen)}
              >
                Calculators
                <ChevronDown className={`w-4 h-4 transition-transform ${calculatorsOpen ? 'rotate-180' : ''}`} />
              </button>

              {calculatorsOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {calculators.map((calc) => (
                    <Link
                      key={calc.href}
                      to={calc.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                      onClick={() => setCalculatorsOpen(false)}
                    >
                      <calc.icon className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="font-medium text-gray-900">{calc.name}</p>
                        <p className="text-xs text-gray-500">{calc.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/crane-hire-guide" className="text-gray-700 hover:text-primary-600 font-medium transition">
              Guide
            </Link>

            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition">
              About
            </Link>

            <Link to="/get-quotes" className="btn-primary">
              Get Quotes
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Calculators</p>
              {calculators.map((calc) => (
                <Link
                  key={calc.href}
                  to={calc.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <calc.icon className="w-5 h-5 text-primary-500" />
                  <span className="text-gray-900">{calc.name}</span>
                </Link>
              ))}
              <div className="border-t my-2"></div>
              <Link
                to="/crane-hire-guide"
                className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Crane Hire Guide
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-2">
                <Link
                  to="/get-quotes"
                  className="block text-center btn-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Quotes
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
