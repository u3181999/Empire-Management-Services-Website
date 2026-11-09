import type { Metadata } from 'next'
import Link from 'next/link'
import { COMPANY } from '@/lib/constants'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageSeo('/privacy'),
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Empire Management Services — how we collect, use, store and protect your personal information under the Australian Privacy Act 1988.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-3 text-gray-300 text-sm">Last updated: November 2026</p>
        </div>
      </section>

      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none text-gray-700 leading-relaxed">

          <p>
            {COMPANY.legalName} (ABN {COMPANY.abn}), trading as {COMPANY.name} (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;, &ldquo;our&rdquo;), is committed to protecting your privacy in accordance with the{' '}
            <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).
          </p>
          <p>
            This policy explains how we collect, use, disclose, and safeguard personal information
            when you use this website or deal with us.
          </p>

          <h2>1. What Personal Information We Collect</h2>
          <p>We may collect the following personal information:</p>
          <ul>
            <li>
              <strong>Contact details</strong> — name, email address and phone number
            </li>
            <li>
              <strong>Booking information</strong> — service type, preferred date and time, site
              location, and any notes you add
            </li>
            <li>
              <strong>Employment applications</strong> — your contact details, the days and shift you
              are available for, your available start date, whether you have cleaning experience,
              whether you are an Australian citizen, your highest security clearance level, and
              anything else you choose to tell us. The website does not collect résumés; if you email
              one to us we will receive and handle it under this policy.
            </li>
            <li>
              <strong>Communications</strong> — messages sent through our contact form or by email
            </li>
            <li>
              <strong>Website usage</strong> — anonymous page-view statistics (the pages visited, how
              you arrived, your browser and device type, and your approximate country or region),
              collected without cookies and not used to build a profile of you. Our hosting provider
              may also keep standard server logs that include IP addresses.
            </li>
          </ul>
          <p>We collect only what is necessary for the purpose stated at the time of collection.</p>

          <h2>2. How We Collect Personal Information</h2>
          <p>We collect personal information:</p>
          <ul>
            <li>Directly from you — when you submit a booking, contact form, or job application</li>
            <li>
              Automatically — through anonymous website analytics and standard server logs when you
              use our website
            </li>
            <li>From third parties — such as recruitment referrals</li>
          </ul>

          <h2>3. How We Use Your Personal Information</h2>
          <p>We use your personal information to:</p>
          <ul>
            <li>Process and manage your service bookings and enquiries</li>
            <li>Issue invoices for services we provide to you under a service agreement</li>
            <li>Communicate with you about your bookings, enquiries, or applications</li>
            <li>Assess employment applications</li>
            <li>
              Send service-related notifications (we do not send unsolicited marketing without
              consent)
            </li>
            <li>Understand which pages are useful so we can improve our website and services</li>
            <li>Protect our forms from spam and misuse</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Disclosure of Personal Information, Including Overseas</h2>
          <p>We may share your personal information with the following service providers:</p>
          <ul>
            <li>
              <strong>Neon (PostgreSQL)</strong> — our database provider. Data is stored on servers
              located in <strong>AWS ap-southeast-2 (Sydney, Australia)</strong>.
            </li>
            <li>
              <strong>Vercel Inc.</strong> — website hosting and anonymous analytics. Our site is
              configured to run in Sydney, but Vercel is a United States company and some
              information (such as server logs) may be stored or processed in the United States.
            </li>
            <li>
              <strong>Resend</strong> — email delivery for booking confirmations and enquiry
              notifications. Resend is a United States company and email content, including the
              details you submit in a form, may be processed in the United States or other countries.
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
            Where a provider is overseas we take reasonable steps to make sure it handles your
            information consistently with the Australian Privacy Principles. We do not sell, rent, or
            trade your personal information to third parties for marketing purposes.
          </p>

          <h2>5. Data Storage and Security</h2>
          <p>
            Your personal information is stored with the providers named above. We use reasonable
            technical and organisational measures to protect it from unauthorised access,
            disclosure, alteration, or destruction, including:
          </p>
          <ul>
            <li>Encrypted connections (HTTPS/TLS) for data in transit</li>
            <li>A database provider that encrypts stored data</li>
            <li>A password-protected administration area restricted to authorised staff</li>
            <li>Limiting who can access personal data to those who need it</li>
            <li>
              Spam protection on our forms that uses a one-way scrambled (hashed) form of your IP
              address, which cannot be turned back into the address itself
            </li>
          </ul>
          <p>
            No method of transmission over the internet is 100% secure. While we take reasonable
            steps, we cannot guarantee absolute security.
          </p>

          <h2>6. Retention of Personal Information</h2>
          <p>
            We keep personal information only as long as necessary for the purpose it was collected,
            or as required by law:
          </p>
          <ul>
            <li>
              <strong>Booking records</strong> — up to 7 years (Australian taxation and business
              record requirements)
            </li>
            <li>
              <strong>Employment applications</strong> — 6 months from the date of application,
              then deleted
            </li>
            <li>
              <strong>Contact form enquiries</strong> — 12 months, then deleted
            </li>
            <li>
              <strong>Website analytics</strong> — anonymous, aggregated statistics only
            </li>
          </ul>
          <p>
            Enquiries and applications are stored in our system and also emailed to our office. The
            stored copies are deleted automatically after the periods above, and we remove the
            emailed copies on the same schedule.
          </p>

          <h2>7. Cookies and Analytics</h2>
          <p>
            We do not use advertising or cross-site tracking cookies. Our website analytics is
            privacy-friendly: it does not use cookies and does not identify you personally.
          </p>
          <ul>
            <li>
              <strong>Analytics choice</strong> — when you first visit, a notice lets you accept or
              decline analytics. If you decline, your visits are not counted. We store one small
              cookie (<code>empire_cookie_consent</code>) for 12 months to remember your choice.
            </li>
            <li>
              <strong>Staff sign-in</strong> — people who sign in to our administration area receive
              security cookies needed to keep them signed in. These are not used on the public site.
            </li>
          </ul>

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
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or on {COMPANY.phone}. We will
            respond within 30 days.
          </p>

          <h2>9. Complaints</h2>
          <p>
            If you are not satisfied with how we handle a privacy concern, you may lodge a complaint
            with the Office of the Australian Information Commissioner (OAIC) at{' '}
            <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">
              www.oaic.gov.au
            </a>
            .
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The current version will always be
            available on this page with the date of last update.
          </p>

          <h2>11. Contact Us</h2>
          <p>For any privacy-related enquiries:</p>
          <ul>
            <li>
              <strong>Email:</strong> <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </li>
            <li>
              <strong>Phone:</strong> {COMPANY.phone}
            </li>
            <li>
              <strong>Mail:</strong> {COMPANY.name}, {COMPANY.poBox}, Australia
            </li>
          </ul>

          <p className="mt-8 text-sm text-gray-600">
            This policy is governed by the laws of the Australian Capital Territory, Australia.{' '}
            <Link href="/terms">View our Terms and Conditions</Link>.
          </p>
        </div>
      </article>
    </>
  )
}
