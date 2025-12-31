import { Link } from 'react-router-dom';
import { SEOHead } from '../components/layout';
import { Shield, Clock } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | CraneQuote"
        description="CraneQuote privacy policy. Learn how we collect, use, and protect your personal information when you use our crane hire comparison service."
        keywords="CraneQuote privacy policy, crane hire privacy, data protection"
        canonicalUrl="/privacy-policy"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy-policy' }
        ]}
      />

      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-200 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Privacy Policy</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
              <p className="text-primary-200 mt-1">How we protect your data</p>
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
          
          <h2>1. Introduction</h2>
          <p>
            CraneQuote ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website cranequote.co.uk and use our crane hire comparison service.
          </p>
          <p>
            By using our service, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Information You Provide</h3>
          <p>When you request quotes through our service, we collect:</p>
          <ul>
            <li>Contact information (name, email address, phone number)</li>
            <li>Company name (if applicable)</li>
            <li>Project details (location, crane requirements, dates)</li>
            <li>Any additional information you choose to provide in your enquiry</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>When you visit our website, we automatically collect:</p>
          <ul>
            <li>IP address and approximate location</li>
            <li>Browser type and version</li>
            <li>Device type and operating system</li>
            <li>Pages visited and time spent on each page</li>
            <li>Referring website or source</li>
            <li>Date and time of visits</li>
          </ul>

          <h3>2.3 Cookies and Tracking Technologies</h3>
          <p>
            We use cookies and similar tracking technologies to improve your experience. See our <Link to="/cookie-policy" className="text-primary-600 hover:underline">Cookie Policy</Link> for more details.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Connect you with crane hire companies who can provide quotes</li>
            <li>Communicate with you about your enquiry</li>
            <li>Improve our website and services</li>
            <li>Send you relevant information about crane hire (with your consent)</li>
            <li>Analyse website usage and trends</li>
            <li>Prevent fraud and ensure security</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. How We Share Your Information</h2>
          
          <h3>4.1 Crane Hire Companies</h3>
          <p>
            When you request quotes, we share your contact and project information with up to 3 crane hire companies in your area who can fulfil your requirements. These companies will contact you directly with their quotes.
          </p>

          <h3>4.2 Service Providers</h3>
          <p>
            We may share information with third-party service providers who assist us in operating our website, conducting our business, or serving our users, including:
          </p>
          <ul>
            <li>Website hosting providers</li>
            <li>Analytics services (e.g., Google Analytics)</li>
            <li>Email service providers</li>
            <li>Customer relationship management tools</li>
          </ul>

          <h3>4.3 Legal Requirements</h3>
          <p>
            We may disclose your information if required to do so by law or in response to valid requests by public authorities.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required or permitted by law. Typically:
          </p>
          <ul>
            <li>Quote request data: 2 years from submission</li>
            <li>Analytics data: 26 months</li>
            <li>Marketing preferences: Until you unsubscribe</li>
          </ul>

          <h2>6. Your Rights (UK GDPR)</h2>
          <p>Under UK data protection law, you have the right to:</p>
          <ul>
            <li><strong>Access</strong> – Request a copy of your personal data</li>
            <li><strong>Rectification</strong> – Request correction of inaccurate data</li>
            <li><strong>Erasure</strong> – Request deletion of your data ("right to be forgotten")</li>
            <li><strong>Restriction</strong> – Request restriction of processing</li>
            <li><strong>Portability</strong> – Request transfer of your data</li>
            <li><strong>Objection</strong> – Object to processing of your data</li>
            <li><strong>Withdraw consent</strong> – Where processing is based on consent</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at privacy@cranequote.co.uk.
          </p>

          <h2>7. Data Security</h2>
          <p>
            We implement appropriate technical and organisational measures to protect your personal information, including:
          </p>
          <ul>
            <li>SSL/TLS encryption for data in transit</li>
            <li>Secure data storage with access controls</li>
            <li>Regular security assessments</li>
            <li>Staff training on data protection</li>
          </ul>
          <p>
            However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our service is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <ul>
            <li>Email: privacy@cranequote.co.uk</li>
            <li>Website: <Link to="/get-quotes" className="text-primary-600 hover:underline">cranequote.co.uk/get-quotes</Link></li>
          </ul>

          <h2>12. Supervisory Authority</h2>
          <p>
            You have the right to lodge a complaint with the Information Commissioner's Office (ICO) if you believe your data protection rights have been violated:
          </p>
          <ul>
            <li>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">ico.org.uk</a></li>
            <li>Phone: 0303 123 1113</li>
          </ul>

        </div>
      </section>
    </>
  );
}
