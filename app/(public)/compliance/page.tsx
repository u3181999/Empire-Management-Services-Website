import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, FileText, Phone, ShieldCheck, UserCheck } from 'lucide-react'
import type { Metadata } from 'next'
import { Button, SectionHeading } from '@/components/ui'
import { CERTIFICATION, COMPANY, MANAGEMENT_STANDARDS } from '@/lib/constants'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageSeo('/compliance'),
  title: 'Certifications & Compliance',
  description:
    'The ISO standards Empire Management Services is certified to, plus our insurance and staff checks. Copies of our certificates are available on request.',
}

// Everything on this page must be something we can show a client on request. See CLAIMS.md before adding to it.
const REQUEST_HREF = '/contact?subject=Compliance%20Documents'

export default function CompliancePage() {
  return (
    <>
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">Certifications &amp; Compliance</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">
            The standards we are certified to and the checks we keep in place. Copies are available on request, so
            you always see current documents.
          </p>
        </div>
      </section>

      {/* Management system certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="ISO certified"
            heading="Management system certifications"
            subtext="Three international standards cover how we deliver quality, protect the environment and keep people safe."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {MANAGEMENT_STANDARDS.map((s) => {
              const details = [
                ['Certified by', s.certifiedBy],
                ['Certificate number', s.certificateNumber],
                ['Valid until', s.validUntil],
              ].filter(([, value]) => value) as [string, string][]
              return (
                <div key={s.code} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-gold-500">
                      <BadgeCheck className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-navy-900">{s.code}</h2>
                      <p className="text-sm font-medium text-gold-700">{s.name}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">{s.summary}</p>
                  {details.length > 0 && (
                    <dl className="mt-4 space-y-1 text-sm">
                      {details.map(([label, value]) => (
                        <div key={label} className="flex gap-2">
                          <dt className="text-gray-600">{label}:</dt>
                          <dd className="font-medium text-navy-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <p className="mt-4 text-sm font-semibold text-navy-900">Current certificate available on request.</p>
                </div>
              )
            })}
          </div>

          {/* Who certifies us, and where a client can check it */}
          <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:gap-10 sm:p-8">
            <div className="flex shrink-0 items-center gap-6">
              <Image src="/certifications/iqc.png" alt="IQC certification mark" width={216} height={201} sizes="72px" className="h-16 w-auto" />
              <Image src="/certifications/jas-anz.png" alt="JAS-ANZ logo" width={207} height={216} sizes="72px" className="h-16 w-auto" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy-900">Certification body and register</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Our ISO certification is held with {CERTIFICATION.body}, contract number{' '}
                <strong className="font-semibold text-navy-900">{CERTIFICATION.contractNumber}</strong>. You can check it
                on the JAS-ANZ register:
              </p>
              <a
                href={CERTIFICATION.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-gold-700 underline underline-offset-2 hover:text-gold-800"
              >
                {CERTIFICATION.registerLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance and people */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Cover and checks"
            heading="Insurance and our people"
            subtext="What protects you and your site every time we are on it."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: 'Public liability insurance',
                body: 'We hold public liability insurance. A current certificate of currency is available on request.',
              },
              {
                icon: UserCheck,
                title: 'Staff screening',
                body: 'We match staff screening to each site, from background and police checks through to security clearances where a client requires them.',
              },
              {
                icon: FileText,
                title: 'Security-cleared teams',
                body: 'For government and other sensitive sites, security-cleared teams are available. Tell us the clearance level your site requires.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-gold-500">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-navy-900">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to get copies */}
      <section className="py-14 bg-navy-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            light
            heading="Need a copy?"
            subtext="Tell us what you need and we will send current documents, usually within 1 business day. We keep them on request so you never receive an out-of-date copy."
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={REQUEST_HREF} size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Request our certificates
            </Button>
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
              className="inline-flex min-h-[52px] items-center gap-2 px-4 text-base font-semibold text-white hover:text-gold-400 transition-colors"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {COMPANY.phone}
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-300">
            Questions about how we meet your requirements?{' '}
            <Link href="/contact" className="font-semibold text-gold-400 underline underline-offset-2 hover:text-gold-300">
              Talk to our team
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
