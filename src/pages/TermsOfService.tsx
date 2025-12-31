import { Link } from 'react-router-dom';
import { SEOHead } from '../components/layout';
import { FileText, Clock } from 'lucide-react';

export default function TermsOfService() {
  return (
    <>
      <SEOHead
        title="Terms of Service | CraneQuote"
        description="CraneQuote terms of service. Read our terms and conditions for using our crane hire comparison service."
        keywords="CraneQuote terms of service, crane hire terms, terms and conditions"
        canonicalUrl="/terms-of-service"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Terms of Service', url: '/terms-of-service' }
        ]}
      />

      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-200 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Terms of Service</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
              <p className="text-primary-200 mt-1">Terms and conditions of use</p>
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
            Welcome to CraneQuote. These Terms of Service ("Terms") govern your use of the CraneQuote website at cranequote.co.uk ("Website") and our crane hire comparison service ("Service").
          </p>
          <p>
            By accessing or using our Website and Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Service.
          </p>

          <h2>2. About Our Service</h2>
          <p>
            CraneQuote is a free comparison service that connects individuals and businesses seeking crane hire with crane hire companies across the UK. We:
          </p>
          <ul>
            <li>Provide information and tools to help you understand crane hire requirements</li>
            <li>Collect your project details and requirements</li>
            <li>Forward your enquiry to up to 3 suitable crane hire companies</li>
            <li>Facilitate introductions between you and crane hire providers</li>
          </ul>
          <p>
            <strong>Important:</strong> CraneQuote is a comparison and introduction service only. We do not provide crane hire services directly, and any contract for crane hire is between you and the crane hire company.
          </p>

          <h2>3. Eligibility</h2>
          <p>
            To use our Service, you must:
          </p>
          <ul>
            <li>Be at least 18 years of age</li>
            <li>Have the legal authority to enter into contracts</li>
            <li>Provide accurate and complete information</li>
            <li>Be based in or seeking crane hire within the United Kingdom</li>
          </ul>

          <h2>4. Your Use of the Service</h2>
          
          <h3>4.1 Acceptable Use</h3>
          <p>You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Provide false, misleading, or inaccurate information</li>
            <li>Use the Service for any fraudulent or illegal purpose</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Attempt to gain unauthorised access to any part of the Service</li>
            <li>Use automated systems to access the Service without permission</li>
            <li>Reproduce, duplicate, or exploit any part of the Service for commercial purposes without our consent</li>
          </ul>

          <h3>4.2 Quote Requests</h3>
          <p>When submitting a quote request, you:</p>
          <ul>
            <li>Confirm that the information provided is accurate and complete</li>
            <li>Consent to your details being shared with crane hire companies</li>
            <li>Understand that crane companies will contact you directly</li>
            <li>Accept that quotes provided are estimates and may vary</li>
          </ul>

          <h2>5. Calculator Tools and Estimates</h2>
          <p>
            Our website provides various calculator tools to help estimate crane requirements and costs. These tools are provided for informational and guidance purposes only.
          </p>
          <ul>
            <li>Estimates are based on typical UK market rates and standard conditions</li>
            <li>Actual costs may vary significantly based on specific requirements</li>
            <li>Calculator results should not be relied upon as formal quotes</li>
            <li>Always obtain formal quotes from crane hire companies for accurate pricing</li>
            <li>We make no guarantees about the accuracy of calculator outputs</li>
          </ul>

          <h2>6. Relationship with Crane Hire Companies</h2>
          
          <h3>6.1 Our Role</h3>
          <p>
            CraneQuote acts solely as an intermediary. We introduce you to crane hire companies but are not party to any agreement between you and those companies.
          </p>

          <h3>6.2 No Endorsement</h3>
          <p>
            Inclusion of a crane hire company in our network does not constitute an endorsement or recommendation. While we endeavour to work with reputable companies, we do not guarantee:
          </p>
          <ul>
            <li>The quality of services provided by crane hire companies</li>
            <li>The accuracy of quotes or information provided by them</li>
            <li>Their availability, reliability, or financial stability</li>
            <li>Their compliance with regulations or safety standards</li>
          </ul>

          <h3>6.3 Your Due Diligence</h3>
          <p>
            You are responsible for conducting your own due diligence before entering into any agreement with a crane hire company, including:
          </p>
          <ul>
            <li>Verifying their credentials and insurance</li>
            <li>Checking references and reviews</li>
            <li>Ensuring they meet your specific requirements</li>
            <li>Reviewing and understanding contract terms</li>
          </ul>

          <h2>7. Intellectual Property</h2>
          <p>
            All content on this Website, including text, graphics, logos, images, calculator tools, and software, is the property of CraneQuote or our licensors and is protected by copyright and other intellectual property laws.
          </p>
          <p>
            You may view, download, and print pages from the Website for your own personal, non-commercial use, provided you do not modify the content and retain all copyright notices.
          </p>

          <h2>8. Limitation of Liability</h2>
          
          <h3>8.1 Service Provided "As Is"</h3>
          <p>
            Our Service is provided on an "as is" and "as available" basis. We make no warranties or representations, express or implied, about the Service, including:
          </p>
          <ul>
            <li>That the Service will be uninterrupted or error-free</li>
            <li>That defects will be corrected</li>
            <li>That the Service is free of viruses or harmful components</li>
            <li>The accuracy, reliability, or completeness of any information</li>
          </ul>

          <h3>8.2 Exclusion of Liability</h3>
          <p>
            To the fullest extent permitted by law, CraneQuote shall not be liable for any:
          </p>
          <ul>
            <li>Indirect, incidental, special, or consequential damages</li>
            <li>Loss of profits, revenue, data, or business opportunities</li>
            <li>Damages arising from your use of or inability to use the Service</li>
            <li>Damages arising from any transaction between you and a crane hire company</li>
            <li>Actions, omissions, or services provided by crane hire companies</li>
          </ul>

          <h3>8.3 Maximum Liability</h3>
          <p>
            Our total liability to you for any claims arising from your use of the Service shall not exceed £100.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless CraneQuote, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:
          </p>
          <ul>
            <li>Your use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of a third party</li>
            <li>Any transaction between you and a crane hire company</li>
          </ul>

          <h2>10. Privacy</h2>
          <p>
            Your use of our Service is also governed by our <Link to="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</Link>, which explains how we collect, use, and protect your personal information.
          </p>

          <h2>11. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
          </p>

          <h2>12. Termination</h2>
          <p>
            We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including if you breach these Terms.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>

          <h2>14. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
          </p>

          <h2>15. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and CraneQuote regarding your use of the Service.
          </p>

          <h2>16. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <ul>
            <li>Email: legal@cranequote.co.uk</li>
            <li>Website: <Link to="/get-quotes" className="text-primary-600 hover:underline">cranequote.co.uk/get-quotes</Link></li>
          </ul>

        </div>
      </section>
    </>
  );
}
