import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore our full range of commercial cleaning services including strata, industrial, medical, government, window cleaning, graffiti removal and more.',
}

const CATEGORIES = [
  { key: 'commercial', label: 'Commercial' },
  { key: 'industrial', label: 'Industrial' },
  { key: 'government', label: 'Government' },
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'retail', label: 'Retail' },
  { key: 'specialist', label: 'Specialist' },
] as const

export default function ServicesPage() {
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    services: SERVICES.filter((s) => s.category === cat.key),
  })).filter((g) => g.services.length > 0)

  return (
    <>
      <section className="bg-[#102a43] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">Our Services</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">
            Every cleaning schedule is tailor-designed to meet your expectations and deadlines across
            12 service categories.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {grouped.map((group) => (
            <div key={group.key}>
              <h2 className="text-2xl font-bold text-[#102a43] mb-6">{group.label}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-[#d4a017] hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-[#102a43] group-hover:text-[#d4a017] transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-[#d4a017] font-medium">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-[#102a43] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Can&apos;t find what you need?</h2>
          <p className="mt-3 text-gray-300">
            We offer custom cleaning solutions. Contact us and we&apos;ll design a schedule around your requirements.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#d4a017] text-[#102a43] font-bold rounded-lg hover:bg-[#e8b81a] transition-colors"
          >
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
