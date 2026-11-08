import Link from 'next/link'
import { ClipboardCheck, HardHat, Leaf, ShieldCheck, UserCheck, FileCheck, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui'

const PILLARS = [
  {
    icon: ClipboardCheck,
    title: 'Site-specific risk assessment',
    desc: 'Hazards are identified and controls put in place for each site before work begins, as part of our safety management system.',
  },
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
    title: 'Fully insured',
    desc: 'Comprehensive insurance and public liability cover, so your organisation is protected on every contract.',
  },
  {
    icon: UserCheck,
    title: 'Vetted, trained people',
    desc: 'Staff are vetted and cleared, with security-cleared teams available for government and other sensitive sites.',
  },
] as const

export default function RiskCompliance() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionHeading
            heading="Risk Management & Compliance"
            subtext="Cleaning done properly is about more than clean floors. We manage the risks and meet the standards that matter to your organisation."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </div>
    </section>
  )
}
