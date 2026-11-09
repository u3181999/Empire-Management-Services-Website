import type { Metadata } from 'next'
import Link from 'next/link'
import { COMPANY } from '@/lib/constants'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageSeo('/terms'),
  title: 'Terms and Conditions',
  description:
    'Terms and Conditions for Empire Management Services: how bookings, cancellations, payments, liability and complaints are handled, and the governing law.',
}

export default function TermsPage() {
  return (
    <>
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Terms and Conditions</h1>
          <p className="mt-3 text-gray-400 text-sm">Last updated: November 2026</p>
        </div>
      </section>

      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none text-gray-700 leading-relaxed">

          <p>
            These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the Empire
            Management Services website and the provision of our services. By booking a service or
            using our website, you agree to these Terms.
          </p>
          <p>
            &ldquo;Empire&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo; refers
            to {COMPANY.legalName} (ABN {COMPANY.abn}), trading as {COMPANY.name}, {COMPANY.suburb}{' '}
            {COMPANY.state} {COMPANY.postcode}, Australia.
          </p>

          <h2>1. Services</h2>
          <p>
            Empire provides commercial and industrial cleaning services across the Australian
            Capital Territory and New South Wales. The specific scope, schedule, and
            pricing of services will be agreed in writing prior to commencement.
          </p>
          <p>
            We reserve the right to decline or cancel a service booking at our discretion,
            including where site conditions make safe delivery impracticable.
          </p>

          <h2>2. Bookings</h2>
          <p>
            Bookings submitted via our website are requests only and are not confirmed until you
            receive a written confirmation from us. A booking is a binding agreement once confirmed
            in writing by Empire.
          </p>
          <p>
            You must provide accurate information when making a booking. Providing false or
            misleading information may result in your booking being declined or cancelled.
          </p>

          <h2>3. Cancellations and Rescheduling</h2>
          <ul>
            <li>
              <strong>More than 48 hours notice:</strong> Cancellations or rescheduling requests
              received more than 48 hours before the scheduled service time are accepted with no
              charge.
            </li>
            <li>
              <strong>24–48 hours notice:</strong> A cancellation fee of 50% of the quoted service
              price may apply.
            </li>
            <li>
              <strong>Less than 24 hours notice or no-show:</strong> The full service price may be
              charged.
            </li>
          </ul>
          <p>
            We understand that genuine emergencies arise. Cancellation fees may be waived at our
            discretion in exceptional circumstances. Contact us as soon as possible at{' '}
            <a href="mailto:admin@empirecleaning.com.au">
              admin@empirecleaning.com.au
            </a>
            .
          </p>

          <h2>4. Payments</h2>
          <p>
            For ongoing commercial contracts, invoicing and payment terms will be as agreed in your
            service agreement. Standard terms are 30 days from invoice date unless otherwise
            stated.
          </p>
          <p>
            We may charge interest on overdue amounts where your service agreement provides for it,
            at a rate permitted by law.
          </p>

          <h2>5. Liability</h2>
          <p>
            To the maximum extent permitted by law, Empire&apos;s total liability arising from any
            claim related to the provision of services is limited to the amount paid for the
            specific service giving rise to the claim.
          </p>
          <p>
            Empire is not liable for any indirect, consequential, incidental, or punitive losses,
            including loss of profits or business opportunity.
          </p>
          <p>
            Nothing in these Terms excludes, restricts, or modifies any right or remedy you have
            under the <em>Australian Consumer Law</em> that cannot lawfully be excluded.
          </p>

          <h2>6. Our Responsibility for Your Premises</h2>
          <p>
            Our staff are trained professionals. In the unlikely event of damage caused by our
            negligence during service delivery, please notify us in writing within 48 hours of the
            service. We will investigate and, if liability is established, arrange repair or
            reasonable compensation.
          </p>
          <p>
            Please ensure that our staff have safe and unobstructed access to the areas to be
            cleaned. Empire accepts no responsibility for delays or incomplete service caused by
            restricted access.
          </p>

          <h2>7. Privacy</h2>
          <p>
            We handle your personal information in accordance with our{' '}
            <Link href="/privacy">
              Privacy Policy
            </Link>
            , which forms part of these Terms.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All content on this website — including text, images, logos, and code — is the
            property of Empire Management Services or its licensors and is protected by Australian
            copyright law. You may not reproduce, distribute, or create derivative works without
            our written permission.
          </p>

          <h2>9. Website Use</h2>
          <p>
            You agree not to use our website for any unlawful purpose or in a way that may damage,
            disable, or impair the website. You must not attempt to gain unauthorised access to any
            part of our systems.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the{' '}
            <strong>Australian Capital Territory, Australia</strong>. Any disputes will be subject
            to the exclusive jurisdiction of the courts of the ACT.
          </p>

          <h2>11. Changes to These Terms</h2>
          <p>
            We may update these Terms at any time. The current version will be published on this
            page. Continued use of our services after any change constitutes acceptance of the
            updated Terms.
          </p>

          <h2>12. Contact</h2>
          <p>For questions about these Terms:</p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:admin@empirecleaning.com.au">
                admin@empirecleaning.com.au
              </a>
            </li>
            <li>
              <strong>Mail:</strong> Empire Management Services, Fyshwick ACT 2609, Australia
            </li>
          </ul>

          <p className="mt-8 text-sm text-gray-500">
            <Link href="/privacy">
              View our Privacy Policy
            </Link>
          </p>
        </div>
      </article>
    </>
  )
}
