import Link from 'next/link'
import {
  ClipboardCheck, ClipboardList, HardHat, Leaf, ShieldCheck, FileCheck, CheckCircle2, ArrowRight,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui'

// Documents prepared for every site we service.
const SITE_DOCUMENTS = [
  {
    icon: ClipboardCheck,
    title: 'Safe Work Practices',
    desc: 'Before we start on any site, we prepare our Safe Work Practices for the cleaning work there. They set out the tasks involved, the hazards that come with them, and the controls we use to prevent and minimise risk.',
    points: [
      'Tasks and hazards identified for the site',
      'Controls to prevent and minimise risk',
      'Our team briefed before they start',
      'Reviewed when the site or the work changes',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Site Duty Statement',
    desc: 'Every site also has a Duty Statement: a clear written scope of exactly what we clean, how often, to what standard and who is responsible. It keeps expectations clear and gives you something to hold us to.',
    points: [
      'What is cleaned, and how often',
      'The standard expected',
      'Who is responsible for each task',
      'The benchmark for our quality audits',
    ],
  },
] as const

const PILLARS = [
  {
    icon: HardHat,
    title: 'Health & safety (ISO 45001)',
    desc: 'Our ISO 45001:2018 certified system keeps our people, your staff and your visitors safe, and keeps us OH&S compliant.',
  },
  {
    icon: FileCheck,
    title: 'Quality audits & reporting',
    desc: 'Regular quality audits and reporting give you audit-ready standards and a clear record of how every site is performing.',
  },
  {
    icon: Leaf,
    title: 'Environmental responsibility (ISO 14001)',
    desc: 'Eco-certified, biodegradable products, responsible chemical use and compliant disposal of waste.',
  },
  {
    icon: ShieldCheck,
    title: 'Insured, screened people',
    desc: 'Public liability insurance and staff screening matched to each site, with security-cleared teams available for government and other sensitive sites.',
  },
] as const

export default function RiskCompliance() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionHeading
            heading="Risk Management & Compliance"
            subtext="Cleaning done properly is about more than clean floors. For every site we look after, we put the right paperwork and controls in place to prevent and minimise risk and keep you compliant."
          />
        </div>

        {/* Prepared for every site */}
        <div className="rounded-2xl bg-[#102a43] text-white p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4a017]">
            For every site we service
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-8">
            {SITE_DOCUMENTS.map(({ icon: Icon, title, desc, points }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="w-11 h-11 bg-[#d4a017]/15 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#d4a017]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">{desc}</p>
                <ul className="mt-4 space-y-2">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#d4a017]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Supporting standards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-[#d4a017]/50 hover:shadow-sm transition-all"
            >
              <div className="w-11 h-11 bg-[#d4a017]/10 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#d4a017]" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-[#102a43]">{title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <p className="text-gray-600">Need to know how we meet your compliance requirements?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-semibold text-[#102a43] hover:text-[#d4a017] transition-colors"
          >
            Talk to our team <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href="/compliance"
            className="inline-flex items-center gap-1.5 font-semibold text-gold-700 underline underline-offset-2 hover:text-gold-800 transition-colors"
          >
            View certifications &amp; insurance
          </Link>
        </div>
      </div>
    </section>
  )
}
