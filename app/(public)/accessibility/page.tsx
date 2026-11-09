import type { Metadata } from 'next'
import Link from 'next/link'
import { COMPANY } from '@/lib/constants'
import { fitTitle, pageSeo } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageSeo('/accessibility'),
  title: fitTitle('Accessibility Statement'),
  description:
    'How we work to make the Empire Management Services website usable for everyone, what we know still needs work, and how to ask for help or report a problem.',
}

const phoneHref = `tel:${COMPANY.phone.replace(/\s/g, '')}`

export default function AccessibilityPage() {
  return (
    <>
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Accessibility Statement</h1>
          <p className="mt-3 text-gray-300 text-sm">Last reviewed: November 2026</p>
        </div>
      </section>

      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p>
            {COMPANY.name} wants everyone to be able to use this website, including people who use a screen reader,
            navigate with a keyboard, use voice control or magnification, have low vision or colour blindness, or find
            moving content hard to follow. We aim to meet the{' '}
            <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer">
              Web Content Accessibility Guidelines (WCAG) 2.2
            </a>{' '}
            at level AA.
          </p>
          <p>
            We have not had the site independently audited, so we do not claim that it fully meets that standard. This
            page says what we have done, what we know is still difficult, and how to reach a person.
          </p>

          <h2>What we have done</h2>
          <ul>
            <li>A &ldquo;Skip to main content&rdquo; link at the top of every page, for keyboard and screen-reader users.</li>
            <li>Every form can be completed with a keyboard. Each field has a visible label, and when something needs fixing we list the problems at the top of the form, say which field each one belongs to, and keep what you typed.</li>
            <li>Text and buttons are checked for colour contrast, and buttons and links are large enough to tap.</li>
            <li>Images that carry meaning have descriptions. Decorative images are hidden from screen readers.</li>
            <li>The scrolling client-logo strip has a Pause button. If your device is set to reduce motion, the logos are shown still, and the animated number counters show their final figures straight away.</li>
            <li>The chat assistant can be opened and closed with the keyboard, and answers are announced by screen readers.</li>
            <li>Our main pages scored 100 out of 100 for accessibility in Google Lighthouse in November 2026, and we also test with the keyboard. Automated tools find only some problems, which is why we ask you to tell us about any others.</li>
          </ul>

          <h2>Known limitations</h2>
          <ul>
            <li>
              <strong>Maps.</strong> The interactive map on our location pages is built for mouse and touch, and can be
              hard to use with a keyboard or screen reader. The address and phone number are always given as text, and
              the New South Wales page uses an embedded Google map that we do not control.
            </li>
            <li>
              <strong>Blog and industry news.</strong> News headlines link to other organisations&rsquo; websites, and we
              cannot control how accessible those are. Blog posts are written by our team and may occasionally be
              missing a description on a picture.
            </li>
            <li>
              <strong>Documents.</strong> Certificates and other documents we send on request may not be in an accessible
              format. Ask us and we will try to provide the information another way.
            </li>
          </ul>

          <h2>Need something in another way, or found a problem?</h2>
          <p>
            Tell us what you were trying to do and what got in the way. If you would like information in another
            format, or would rather deal with us by phone, we will do our best to help.
          </p>
          <ul>
            <li>
              Phone: <a href={phoneHref}>{COMPANY.phone}</a>
            </li>
            <li>
              Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </li>
            <li>
              Online:{' '}
              <Link href="/contact?subject=Complaint%20or%20Feedback">send us a message through the contact form</Link>
            </li>
          </ul>
          <p>
            If you are not satisfied with our response, you can contact the{' '}
            <a href="https://humanrights.gov.au/complaints" target="_blank" rel="noopener noreferrer">
              Australian Human Rights Commission
            </a>
            , which handles complaints about disability discrimination.
          </p>
        </div>
      </article>
    </>
  )
}
