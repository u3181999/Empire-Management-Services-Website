import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Empire Management Services',
  description:
    'Privacy Policy for Empire Management Services — how we collect, use, store and protect your personal information under the Australian Privacy Act 1988.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-3 text-gray-400 text-sm">Last updated: June 2025</p>
        </div>
      </section>

      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none text-gray-700 leading-relaxed">

          <p>
            Empire Management Services Pty Ltd (ABN provided on request) (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) is committed to protecting your privacy in accordance with the{' '}
            <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).
          </p>
          <p>
            This policy explains how we collect, use, disclose, and safeguard personal information.
            By using our website or services, you consent to the practices described here.
          </p>

          <h2>1. What Personal Information We Collect</h2>
          <p>We may collect the following personal information:</p>
          <ul>
            <li>
              <strong>Contact details</strong> — name, email address, phone number, postal address
            </li>
            <li>
              <strong>Booking information</strong> — service type, preferred date/time, site
              location, special instructions
            </li>
            <li>
              <strong>Payment information</strong> — billing details processed by Stripe (we do not
              store card numbers)
            </li>
            <li>
              <strong>Employment applications</strong> — résumé, availability, work history,
              references
            </li>
            <li>
              <strong>Communications</strong> — messages sent via our contact form or email
            </li>
            <li>
              <strong>Website usage data</strong> — IP address, browser type, pages visited,
              collected via cookies and analytics
            </li>
          </ul>
          <p>We collect only what is necessary for the purpose stated at the time of collection.</p>

          <h2>2. How We Collect Personal Information</h2>
          <p>We collect personal information:</p>
          <ul>
            <li>Directly from you — when you submit a booking, contact form, or job application</li>
            <li>
              Automatically — through cookies, server logs, and analytics tools when you use our
              website
            </li>
            <li>
              From third parties — such as Stripe (payment processing) or recruitment referrals
            </li>
          </ul>

          <h2>3. How We Use Your Personal Information</h2>
          <p>We use your personal information to:</p>
          <ul>
            <li>Process and manage your service bookings</li>
            <li>Process payments and issue receipts</li>
            <li>Communicate with you about your bookings, enquiries, or applications</li>
            <li>Assess employment applications</li>
            <li>Send service-related notifications (we do not send unsolicited marketing without
            consent)</li>
            <li>Improve our website and services through analytics</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Disclosure of Personal Information</h2>
          <p>We may share your personal information with:</p>
          <ul>
            <li>
              <strong>Stripe</strong> — payment processing. Stripe&apos;s privacy policy governs
              its handling of payment data.
            </li>
            <li>
              <strong>Resend</strong> — transactional email delivery (booking confirmations,
              receipts).
            </li>
            <li>
              <strong>Neon (PostgreSQL)</strong> — our database provider. Data is stored on servers
              located in <strong>AWS ap-southeast-2 (Sydney, Australia)</strong>.
            </li>
            <li>
              Our employees and contractors who need the information to deliver your requested
              services.
            </li>
            <li>
              Government or regulatory bodies where required by law or to comply with a legal
              obligation.
            </li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal information to third parties for marketing
            purposes.
          </p>

          <h2>5. Data Storage and Security</h2>
          <p>
            Your personal information is stored on secure cloud infrastructure (Neon PostgreSQL,
            hosted on AWS ap-southeast-2, Sydney, Australia). We implement reasonable technical and
            organisational measures to protect your data from unauthorised access, disclosure,
            alteration, or destruction, including:
          </p>
          <ul>
            <li>Encrypted connections (TLS/HTTPS) for all data in transit</li>
            <li>Encrypted storage for sensitive data at rest</li>
            <li>Access controls limiting who can access personal data</li>
            <li>Regular security reviews</li>
          </ul>
          <p>
            No method of transmission over the internet is 100% secure. While we take reasonable
            steps, we cannot guarantee absolute security.
          </p>

          <h2>6. Retention of Personal Information</h2>
          <p>We retain personal information for as long as necessary to fulfil the purposes for
          which it was collected, or as required by law:</p>
          <ul>
            <li>
              <strong>Booking and payment records</strong> — 7 years (Australian taxation and
              business record requirements)
            </li>
            <li>
              <strong>Unsuccessful employment applications</strong> — 6 months from the date of
              application, then securely deleted
            </li>
            <li>
              <strong>Contact form enquiries</strong> — 12 months
            </li>
            <li>
              <strong>Website analytics</strong> — aggregated/anonymised data retained
              indefinitely; identifiable logs up to 12 months
            </li>
          </ul>

          <h2>7. Cookies</h2>
          <p>
            Our website uses cookies and similar tracking technologies to improve your browsing
            experience and gather analytics. We use:
          </p>
          <ul>
            <li>
              <strong>Essential cookies</strong> — required for the site to function correctly
              (session management, security)
            </li>
            <li>
              <strong>Analytics cookies</strong> — to understand how visitors use our site and help
              us improve it
            </li>
          </ul>
          <p>
            You can manage cookie preferences through our cookie banner. Declining analytics cookies
            will not affect your ability to use the site.
          </p>

          <h2>8. Your Rights Under the Australian Privacy Principles</h2>
          <p>Under the APPs, you have the right to:</p>
          <ul>
            <li>
              <strong>Access</strong> — request a copy of the personal information we hold about
              you
            </li>
            <li>
              <strong>Correction</strong> — ask us to correct inaccurate or out-of-date information
            </li>
            <li>
              <strong>Complaint</strong> — make a complaint if you believe we have breached your
              privacy rights
            </li>
            <li>
              <strong>Anonymity</strong> — interact with us anonymously where practicable (note:
              some services require identification)
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:info@empirecleaning.com.au" className="text-gold-500 hover:underline">
              info@empirecleaning.com.au
            </a>
            . We will respond within 30 days.
          </p>

          <h2>9. Complaints</h2>
          <p>
            If you are not satisfied with how we handle a privacy concern, you may lodge a complaint
            with the Office of the Australian Information Commissioner (OAIC) at{' '}
            <a
              href="https://www.oaic.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:underline"
            >
              www.oaic.gov.au
            </a>
            .
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The current version will always be
            available on this page with the date of last update. Continued use of our services after
            changes constitutes acceptance of the updated policy.
          </p>

          <h2>11. Contact Us</h2>
          <p>For any privacy-related enquiries:</p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:info@empirecleaning.com.au" className="text-gold-500 hover:underline">
                info@empirecleaning.com.au
              </a>
            </li>
            <li>
              <strong>Mail:</strong> Empire Management Services, Fyshwick ACT 2609, Australia
            </li>
          </ul>

          <p className="mt-8 text-sm text-gray-500">
            This policy is governed by the laws of the Australian Capital Territory, Australia.{' '}
            <Link href="/terms" className="text-gold-500 hover:underline">
              View our Terms and Conditions
            </Link>
            .
          </p>
        </div>
      </article>
    </>
  )
}
