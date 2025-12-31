import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout';
import HomePage from './pages/HomePage';
import GetQuotesPage from './pages/GetQuotesPage';
import CraneSizeCalculator from './pages/CraneSizeCalculator';
import HireCostCalculator from './pages/HireCostCalculator';
import CPAvsContractLift from './pages/CPAvsContractLift';
import TransportCalculator from './pages/TransportCalculator';
import TotalProjectCost from './pages/TotalProjectCost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import AboutPage from './pages/AboutPage';
import CraneHireGuide from './pages/CraneHireGuide';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="crane-size-calculator" element={<CraneSizeCalculator />} />
            <Route path="crane-hire-cost-calculator" element={<HireCostCalculator />} />
            <Route path="cpa-vs-contract-lift" element={<CPAvsContractLift />} />
            <Route path="transport-cost-calculator" element={<TransportCalculator />} />
            <Route path="total-project-cost" element={<TotalProjectCost />} />
            <Route path="get-quotes" element={<GetQuotesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="cookie-policy" element={<CookiePolicy />} />
            <Route path="crane-hire-guide" element={<CraneHireGuide />} />
            <Route path="*" element={
              <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                <a href="/" className="btn-primary">Back to Home</a>
              </div>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
