import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import {
  Shield, Clock, BadgeCheck, Building2, Users, BarChart3,
  ArrowRight, Phone, CheckCircle2
} from 'lucide-react'
import { COMPANY, SERVICES, VALUES } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commercial Cleaning Canberra | Empire Management Services',
  description:
    'Professional commercial and industrial cleaning across Canberra, NSW and QLD. 30+ years, 80+ clients, 100,000m² serviced. Get a free quote today.',
}

const STATS = [
  { value: `${COMPANY.yearsExperience}+`, label: 'Years Experience', icon: Clock },
  { value: `${COMPANY.clientCount}+`, label: 'Active Clients', icon: Users },
  { value: '100,000m²', label: 'Sites Serviced', icon: Building2 },
  { value: '3', label: 'States', icon: BarChart3 },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-[#102a43] text-white overflow-hidden">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-30"
            priority
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="max-w-3xl">
              <span className="inline-block bg-[#d4a017]/20 text-[#d4a017] text-sm font-semibold px-3 py-1 rounded mb-4">
                Trusted for 30+ Years
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Professional Cleaning<br />
                <span className="text-[#d4a017]">Built Around You</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
                {COMPANY.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a017] text-[#102a43] font-bold rounded-lg hover:bg-[#e8b81a] transition-colors min-h-[44px]"
                >
                  Book a Service
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-[#d4a017] hover:text-[#d4a017] transition-colors min-h-[44px]"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#0b1f31] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {STATS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center py-8 px-4 text-center">
                  <Icon className="w-6 h-6 text-[#d4a017] mb-3" aria-hidden="true" />
                  <span className="text-3xl font-bold text-white">{value}</span>
                  <span className="mt-1 text-sm text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#102a43]">Our Services</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Every cleaning schedule is tailor-designed to meet your expectations and deadlines.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service) => (
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
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#102a43]">
                  Why Choose Empire?
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  We build genuine partnerships with our clients, resulting in long-term relationships
                  and numerous repeat projects. Our operations manager maintains constant communication
                  to ensure the right work is always being done.
                </p>
                <ul className="mt-8 space-y-4">
                  {VALUES.map((v) => (
                    <li key={v.title} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#d4a017] mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold text-[#102a43]">{v.title} — </span>
                        <span className="text-gray-600 text-sm">{v.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/about"
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#102a43] text-white font-semibold rounded-lg hover:bg-[#0b1f31] transition-colors"
                >
                  About Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: 'Security Cleared', desc: 'All staff vetted and cleared' },
                  { icon: BadgeCheck, title: 'Quality Assured', desc: 'Practical QA system in place' },
                  { icon: Clock, title: 'Always On Time', desc: 'Reliable scheduling, every time' },
                  { icon: Users, title: 'Dedicated Teams', desc: 'Consistent staff for your site' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-gray-50 rounded-xl p-5">
                    <Icon className="w-8 h-8 text-[#d4a017] mb-3" aria-hidden="true" />
                    <h3 className="font-bold text-[#102a43] text-sm">{title}</h3>
                    <p className="text-gray-500 text-xs mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#d4a017]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#102a43]">Ready to Get Started?</h2>
            <p className="mt-3 text-[#102a43]/80">
              Contact us today for a free consultation and tailored cleaning proposal.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#102a43] text-white font-bold rounded-lg hover:bg-[#0b1f31] transition-colors min-h-[44px]"
              >
                Book Online
              </Link>
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#102a43] font-bold rounded-lg hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
