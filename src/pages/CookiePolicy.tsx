import { Link } from 'react-router-dom';
import { SEOHead } from '../components/layout';
import { Cookie, Clock } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <>
      <SEOHead
        title="Cookie Policy | CraneQuote"
        description="CraneQuote cookie policy. Learn about the cookies we use on our website and how to manage your preferences."
        keywords="CraneQuote cookie policy, cookies, website cookies"
        canonicalUrl="/cookie-policy"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Cookie Policy', url: '/cookie-policy' }
        ]}
      />

      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-200 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Cookie Policy</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Cookie className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Cookie Policy</h1>
              <p className="text-primary-200 mt-1">How we use cookies</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary-200 text-sm">
            <Clock className="w-4 h-4" />
            Last updated: January 2025
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit websites. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is being used.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>
            CraneQuote uses cookies for several purposes:
          </p>
          <ul>
            <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors use our website</li>
            <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
            <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
          </ul>

          <h2>3. Types of Cookies We Use</h2>

          <h3>3.1 Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take, such as setting privacy preferences, logging in, or filling in forms.
          </p>
          
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Cookie Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Purpose</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 text-sm border-b">cookie_consent</td>
                  <td className="px-4 py-3 text-sm border-b">Stores your cookie preferences</td>
                  <td className="px-4 py-3 text-sm border-b">1 year</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm border-b">session_id</td>
                  <td className="px-4 py-3 text-sm border-b">Maintains your session while browsing</td>
                  <td className="px-4 py-3 text-sm border-b">Session</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>3.2 Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
          </p>
          
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Cookie Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Purpose</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 text-sm border-b">_ga</td>
                  <td className="px-4 py-3 text-sm border-b">Google Analytics - distinguishes users</td>
                  <td className="px-4 py-3 text-sm border-b">2 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm border-b">_ga_*</td>
                  <td className="px-4 py-3 text-sm border-b">Google Analytics - maintains session state</td>
                  <td className="px-4 py-3 text-sm border-b">2 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm border-b">_gid</td>
                  <td className="px-4 py-3 text-sm border-b">Google Analytics - distinguishes users</td>
                  <td className="px-4 py-3 text-sm border-b">24 hours</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm border-b">_gat</td>
                  <td className="px-4 py-3 text-sm border-b">Google Analytics - throttles request rate</td>
                  <td className="px-4 py-3 text-sm border-b">1 minute</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>3.3 Functional Cookies</h3>
          <p>
            These cookies enable enhanced functionality and personalisation, such as remembering your preferences for calculator settings or region selection.
          </p>
          
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Cookie Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Purpose</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 text-sm border-b">user_region</td>
                  <td className="px-4 py-3 text-sm border-b">Remembers your selected UK region</td>
                  <td className="px-4 py-3 text-sm border-b">30 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm border-b">calculator_prefs</td>
                  <td className="px-4 py-3 text-sm border-b">Stores calculator preferences</td>
                  <td className="px-4 py-3 text-sm border-b">30 days</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>3.4 Marketing Cookies</h3>
          <p>
            These cookies may be set through our site by advertising partners. They may be used to build a profile of your interests and show you relevant adverts on other sites. They work by uniquely identifying your browser and device.
          </p>
          
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Cookie Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Purpose</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 text-sm border-b">_fbp</td>
                  <td className="px-4 py-3 text-sm border-b">Facebook - tracks visits across websites</td>
                  <td className="px-4 py-3 text-sm border-b">3 months</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm border-b">_gcl_au</td>
                  <td className="px-4 py-3 text-sm border-b">Google Ads - conversion tracking</td>
                  <td className="px-4 py-3 text-sm border-b">3 months</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>4. Third-Party Cookies</h2>
          <p>
            Some cookies on our website are set by third-party services. These include:
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
            <li><strong>Google Ads:</strong> For advertising and conversion tracking</li>
            <li><strong>Facebook Pixel:</strong> For advertising and remarketing</li>
            <li><strong>SmartSuite:</strong> For form functionality on our quote request page</li>
          </ul>
          <p>
            We have no control over cookies set by third parties. Please refer to their respective privacy policies for more information.
          </p>

          <h2>5. Managing Cookies</h2>
          
          <h3>5.1 Cookie Consent</h3>
          <p>
            When you first visit our website, you will be shown a cookie banner asking for your consent to use non-essential cookies. You can:
          </p>
          <ul>
            <li>Accept all cookies</li>
            <li>Reject non-essential cookies</li>
            <li>Customise your preferences</li>
          </ul>
          <p>
            You can change your cookie preferences at any time by clicking the "Cookie Settings" link in our website footer.
          </p>

          <h3>5.2 Browser Settings</h3>
          <p>
            You can also control cookies through your browser settings. Most browsers allow you to:
          </p>
          <ul>
            <li>View what cookies are stored and delete them individually</li>
            <li>Block third-party cookies</li>
            <li>Block cookies from specific sites</li>
            <li>Block all cookies</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>
          <p>
            Please note that blocking certain cookies may affect the functionality of our website.
          </p>

          <h3>5.3 Browser-Specific Instructions</h3>
          <p>
            For instructions on managing cookies in your specific browser:
          </p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/en-gb/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Microsoft Edge</a></li>
          </ul>

          <h2>6. Do Not Track</h2>
          <p>
            Some browsers have a "Do Not Track" feature that lets you tell websites you do not want your online activities tracked. Currently, our website does not respond to "Do Not Track" signals, but you can manage cookies using the methods described above.
          </p>

          <h2>7. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. We will post any changes on this page and update the "Last updated" date.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us:
          </p>
          <ul>
            <li>Email: privacy@cranequote.co.uk</li>
            <li>Website: <Link to="/get-quotes" className="text-primary-600 hover:underline">cranequote.co.uk/get-quotes</Link></li>
          </ul>

          <h2>9. More Information</h2>
          <p>
            For more information about cookies and how to manage them, visit:
          </p>
          <ul>
            <li><a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.aboutcookies.org</a></li>
            <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.allaboutcookies.org</a></li>
          </ul>
          <p>
            For information about our overall data practices, please see our <Link to="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</Link>.
          </p>

        </div>
      </section>
    </>
  );
}
