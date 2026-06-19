import Link from 'next/link'
import { ArrowRight, CheckCircle2, Building2, Landmark, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commercial Cleaning Solutions',
  description:
    'Specialist commercial cleaning for large-scale buildings, government facilities, and corporate environments across Canberra, NSW and QLD.',
}

const CASE_STUDIES = [
  {
    id: 'government-complex',
    icon: Landmark,
    sector: 'Government',
    title: 'ACT Government Multi-Building Complex',
    location: 'Civic, ACT',
    scope: '14,000m² across 3 buildings',
    duration: 'Ongoing — 5+ years',
    description:
      'Empire Management Services was engaged to provide comprehensive cleaning services across a multi-building government precinct in Civic. The contract required security-cleared staff, strict confidentiality protocols, and flexible after-hours scheduling to ensure zero disruption to public services.',
    outcomes: [
      'Zero security incidents across 5+ years of service',
      'Consistent 98%+ quality audit scores',
      'After-hours cleaning completed before 6:00am daily',
      'Staff turnover managed with minimal client disruption',
    ],
  },
  {
    id: 'medical-centre',
    icon: Users,
    sector: 'Healthcare',
    title: 'Specialist Medical Centre Network',
    location: 'Woden & Belconnen, ACT',
    scope: '3 clinics, 4,200m²',
    duration: 'Ongoing — 3 years',
    description:
      'A specialist medical group required infection-control compliant cleaning across three busy clinics. Empire developed a bespoke cleaning protocol using hospital-grade disinfectants, colour-coded equipment, and a strict scheduling system aligned to patient appointment times.',
    outcomes: [
      'Full infection control compliance maintained throughout',
      'No cross-contamination incidents reported',
      'Flexible scheduling around patient hours',
      'Consumable management included — zero supply interruptions',
    ],
  },
  {
    id: 'strata-portfolio',
    icon: Building2,
    sector: 'Strata',
    title: 'Commercial Strata Portfolio',
    location: 'Canberra CBD & Surrounds',
    scope: '12 buildings, 8,500m² common areas',
    duration: 'Ongoing — 7 years',
    description:
      'Empire manages cleaning services for a portfolio of 12 mixed-use strata buildings across the ACT. Services include daily common area cleaning, periodic window cleaning, carpet maintenance, and reactive graffiti removal — all coordinated through a single point of contact.',
    outcomes: [
      'Single contract covering 12 properties — simplified administration',
      'Proactive maintenance reduced emergency call-outs by 60%',
      'Consistent presentation standards across all buildings',
      'Detailed reporting provided to strata committee quarterly',
    ],
  },
]

const CAPABILITIES = [
  'Security-cleared workforce for sensitive sites',
  'Dedicated account and operations managers',
  'Flexible scheduling — day, evening, or overnight',
  'Scalable teams for any building size',
  'Full consumable supply and management',
  'Comprehensive insurance and public liability coverage',
  'Regular quality audits and reporting',
  'Emergency and reactive cleaning capability',
]

export default function CommercialPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#102a43] text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-[#d4a017]/20 text-[#d4a017] text-sm font-semibold px-3 py-1 rounded mb-4">
            Commercial Division
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight">
            Large-Scale Commercial Cleaning Solutions
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl leading-relaxed">
            Empire Management Services specialises in complex, large-scale commercial cleaning contracts for
            government, corporate, medical, and strata clients across Canberra, NSW and Queensland.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a017] text-[#102a43] font-bold rounded-lg hover:bg-[#e8b81a] transition-colors min-h-[44px]"
            >
              Request a Proposal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-[#d4a017] hover:text-[#d4a017] transition-colors min-h-[44px]"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#102a43]">Built for Complex Contracts</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We have built our business around delivering reliable, high-standard cleaning for organisations
                that cannot afford inconsistency. Every commercial contract is managed end-to-end by a dedicated
                operations team.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {CAPABILITIES.map((cap) => (
                <div key={cap} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d4a017] mt-0.5 shrink-0" />
                  <span className="text-gray-700 text-sm">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#102a43] text-center mb-3">Case Studies</h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-12">
            Real results from long-term commercial partnerships.
          </p>

          <div className="space-y-10">
            {CASE_STUDIES.map((cs) => {
              const Icon = cs.icon
              return (
                <article
                  key={cs.id}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#d4a017]/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#d4a017]" aria-hidden="true" />
                        </div>
                        <span className="text-sm font-semibold text-[#d4a017] uppercase tracking-wider">
                          {cs.sector}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#102a43]">{cs.title}</h3>
                      <p className="mt-3 text-gray-600 leading-relaxed">{cs.description}</p>

                      <h4 className="mt-6 font-bold text-[#102a43] text-sm">Key Outcomes</h4>
                      <ul className="mt-3 space-y-2">
                        {cs.outcomes.map((o) => (
                          <li key={o} className="flex items-start gap-2.5 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-[#d4a017] mt-0.5 shrink-0" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl p-6 h-fit space-y-4 shadow-sm">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Location</p>
                        <p className="text-sm text-gray-700 mt-1">{cs.location}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Scope</p>
                        <p className="text-sm text-gray-700 mt-1">{cs.scope}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Duration</p>
                        <p className="text-sm text-gray-700 mt-1">{cs.duration}</p>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#102a43] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to Discuss Your Contract?</h2>
          <p className="mt-3 text-gray-300">
            Our commercial team will prepare a tailored proposal for your organisation within 48 hours.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-[#d4a017] text-[#102a43] font-bold rounded-lg hover:bg-[#e8b81a] transition-colors"
          >
            Request a Proposal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
