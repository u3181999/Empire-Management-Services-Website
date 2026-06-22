import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { COMPANY, VALUES } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about Empire Management Services — ${COMPANY.yearsExperience}+ years of professional commercial cleaning in Canberra and NSW.`,
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#102a43] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">About Us</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">
            Over three decades of delivering quality, reliability and accountability to commercial clients
            across Canberra, NSW and Queensland.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#102a43]">Our Story</h2>
              <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Empire Management Services has been operating for over {COMPANY.yearsExperience} years, building a
                  reputation centered on continuous improvement and customer-focused service delivery.
                </p>
                <p>
                  Our mission is simple: to provide customers with the exact cleaning and maintenance services
                  they require, while positioning ourselves as the cleaning industry&apos;s most cost-efficient
                  provider.
                </p>
                <p>
                  Today we serve over {COMPANY.clientCount} clients, representing the cleaning and servicing of over{' '}
                  {COMPANY.sitesM2.toLocaleString()}m² of office and commercial sites, with operations primarily
                  in Canberra and additional work across NSW.
                </p>
                <p>
                  We maintain constant communication with our clients through regular telephone and in-person
                  contact with an Operations Manager or Contract Coordinator — because we believe partnership
                  is the foundation of every great result.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: `${COMPANY.yearsExperience}+`, label: 'Years in Business' },
                { value: `${COMPANY.clientCount}+`, label: 'Active Clients' },
                { value: '100,000m²', label: 'Sites Cleaned' },
                { value: '2', label: 'States Serviced' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-[#102a43] text-white rounded-xl p-6 flex flex-col items-center justify-center text-center"
                >
                  <span className="text-3xl font-bold text-[#d4a017]">{value}</span>
                  <span className="mt-2 text-sm text-gray-300">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#102a43] text-center">Our Core Values</h2>
          <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
            Three pillars that define how we operate and why our clients keep coming back.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <CheckCircle2 className="w-8 h-8 text-[#d4a017] mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-[#102a43]">{v.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#102a43]">Quality Assurance</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            We have undertaken to develop, implement and maintain a practical but effective Quality Assurance
            System focused on achieving optimum quality and complete customer satisfaction.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Our commitment to quality means we regularly review and refine our processes, invest in the
            best equipment, and ensure our team receives ongoing training to maintain the highest standards.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a017] text-[#102a43] font-bold rounded-lg hover:bg-[#e8b81a] transition-colors"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
