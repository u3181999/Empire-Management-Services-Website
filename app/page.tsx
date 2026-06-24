import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ClientsMarquee from '@/components/features/ClientsMarquee'
import TestimonialsSection from '@/components/features/TestimonialsSection'
import { Button, Card, SectionHeading } from '@/components/ui'
import Link from 'next/link'
import Image from 'next/image'
import {
  Shield, Clock, BadgeCheck, Building2, Users, BarChart3,
  ArrowRight, Phone, CheckCircle2,
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
  { value: `${COMPANY.clientCount}+`,     label: 'Active Clients',   icon: Users },
  { value: '100,000m²',                   label: 'Sites Serviced',   icon: Building2 },
  { value: '2',                           label: 'States',           icon: BarChart3 },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative bg-navy-900 text-white overflow-hidden">
          <Image
            src="/parliament-house.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-40"
            priority
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="max-w-3xl">
              <span className="inline-block bg-gold-500/20 text-gold-500 text-sm font-semibold px-3 py-1 rounded mb-4">
                Trusted for 30+ Years
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Professional Cleaning<br />
                <span className="text-gold-500">Built Around You</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
                {COMPANY.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {/* PRIMARY CTA — one per page */}
                <Button href="/booking" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Book a Service
                </Button>
                <Button href="/contact" size="lg" variant="outline-light">
                  Get a Free Quote
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-navy-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {STATS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center py-8 px-4 text-center">
                  <Icon className="w-6 h-6 text-gold-500 mb-3" aria-hidden="true" />
                  <span className="text-3xl font-bold text-white">{value}</span>
                  <span className="mt-1 text-sm text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ISO Certifications */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-10">
              ISO Certified Commercial Cleaning Company
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
              {[
                { code: '9001:2015',  label: 'QUALITY',         color: '#1a5fa8', ring: '#1a5fa8' },
                { code: '14001:2015', label: 'ENVIRONMENTAL',   color: '#2e7d32', ring: '#2e7d32' },
                { code: '45001:2018', label: 'HEALTH & SAFETY', color: '#b71c1c', ring: '#b71c1c' },
              ].map(({ code, label, color, ring }) => (
                <div key={code} className="flex flex-col items-center gap-3">
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center border-4 relative bg-white"
                    style={{ borderColor: ring }}
                  >
                    <div
                      className="absolute inset-1 rounded-full flex flex-col items-center justify-center border-2"
                      style={{ borderColor: ring }}
                    >
                      <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color }}>ISO</span>
                      <svg viewBox="0 0 24 24" className="w-7 h-7 my-0.5" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[9px] font-semibold tracking-wider text-gray-500 uppercase">Certified</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">ISO {code}</p>
                    <p className="text-sm font-bold" style={{ color }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <SectionHeading
                heading="Our Services"
                subtext="Every cleaning schedule is tailor-designed to meet your expectations and deadlines."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group">
                  <Card hover className="h-full">
                    <h3 className="font-bold text-navy-900 group-hover:text-gold-500 transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-gold-500 font-medium">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Card>
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
                <SectionHeading
                  align="left"
                  heading="Why Choose Empire?"
                  subtext="We build genuine partnerships with our clients, resulting in long-term relationships and numerous repeat projects. Our operations manager maintains constant communication to ensure the right work is always being done."
                />
                <ul className="mt-8 space-y-4">
                  {VALUES.map((v) => (
                    <li key={v.title} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold text-navy-900">{v.title} — </span>
                        <span className="text-gray-600 text-sm">{v.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* Secondary action — visually subordinate to hero primary */}
                <Button
                  href="/about"
                  variant="secondary"
                  className="mt-8"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  About Us
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield,    title: 'Security Cleared', desc: 'All staff vetted and cleared' },
                  { icon: BadgeCheck,title: 'Quality Assured',  desc: 'Practical QA system in place' },
                  { icon: Clock,     title: 'Always On Time',   desc: 'Reliable scheduling, every time' },
                  { icon: Users,     title: 'Dedicated Teams',  desc: 'Consistent staff for your site' },
                ].map(({ icon: Icon, title, desc }) => (
                  <Card key={title} variant="muted" padding="sm">
                    <Icon className="w-8 h-8 text-gold-500 mb-3" aria-hidden="true" />
                    <h3 className="font-bold text-navy-900 text-sm">{title}</h3>
                    <p className="text-gray-500 text-xs mt-1">{desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Clients */}
        <ClientsMarquee />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA — gold background, secondary button + plain phone link */}
        <section className="py-16 bg-gold-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900">Ready to Get Started?</h2>
            <p className="mt-3 text-navy-900/80">
              Contact us today for a free consultation and tailored cleaning proposal.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/booking" variant="secondary" size="lg">
                Book Online
              </Button>
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-navy-900 hover:text-navy-950 transition-colors min-h-[52px]"
              >
                <Phone className="w-5 h-5" />
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
