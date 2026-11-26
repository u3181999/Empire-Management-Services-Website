import PhotoGallery from '@/components/features/PhotoGallery'
import { PHOTOS } from '@/lib/photos'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ClientsMarquee from '@/components/features/ClientsMarquee'
import TestimonialsSection from '@/components/features/TestimonialsSection'
import RiskCompliance from '@/components/features/RiskCompliance'
import BackToTop from '@/components/features/BackToTop'
import SiteWidgets from '@/components/layout/SiteWidgets'
import StatsTiles from '@/components/features/StatsTiles'
import ServicesQuickGrid from '@/components/features/ServicesQuickGrid'
import { Button, Card, SectionHeading } from '@/components/ui'
import Image from 'next/image'
import Link from 'next/link'
import {
  Shield, Clock, BadgeCheck, Users,
  ArrowRight, Phone, CheckCircle2, Leaf, Recycle, ShieldCheck,
} from 'lucide-react'
import { COMPANY, VALUES, ECO_SUMMARY } from '@/lib/constants'
import type { Metadata } from 'next'
import { pageSeo, localBusinessSchema, websiteSchema } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  ...pageSeo('/'),
  title: 'Empire Management Services | Commercial Cleaning Canberra',
  description:
    'Professional commercial and industrial cleaning across Canberra (ACT) and New South Wales. 30+ years, 80+ clients, 100,000m² serviced. Get a free quote.',
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">

        {/* Hero */}
        <section className="relative bg-navy-900 text-white overflow-hidden">
          <Image
            src="/parliament-house.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-40"
            priority
            fetchPriority="high"
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="max-w-3xl">
              <span className="inline-block bg-gold-500/20 text-gold-400 text-sm font-semibold px-3 py-1 rounded mb-4">
                Trusted for 30+ Years
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Commercial Cleaning in Canberra and the Region<br />
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
        <StatsTiles />

        {/* ISO Certifications */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold tracking-[0.25em] text-gray-600 uppercase mb-10">
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
            <p className="mt-8 text-sm text-gray-600">
              Current certificates available on request.{' '}
              <Link href="/compliance" className="font-semibold text-gold-700 underline underline-offset-2 hover:text-gold-800">
                View certifications &amp; compliance
              </Link>
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <SectionHeading
                eyebrow="What We Do"
                heading="Our Services"
                subtext="Every cleaning schedule is tailor-designed to meet your expectations and deadlines. Choose a service to see what is included."
              />
            </div>
            <ServicesQuickGrid />
            <div className="mt-8 text-center">
              <Button href="/services" variant="secondary" icon={<ArrowRight className="w-4 h-4" />}>
                Compare All Services
              </Button>
            </div>
          </div>
        </section>

        {/* Eco-friendly: a short band here; the full story is on the About page (#eco) and the service has its own page */}
        <section className="bg-white py-12" aria-labelledby="eco-band-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-gold-200 bg-gold-50 p-6 sm:p-8">
              <Leaf aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute -right-6 -top-8 h-44 w-44 rotate-12 text-gold-500/10" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-500">
                  <Leaf className="h-7 w-7" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <h2 id="eco-band-heading" className="text-xl font-bold text-navy-900 sm:text-2xl">
                    Eco-Friendly Cleaning
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-base">{ECO_SUMMARY}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-navy-900">
                    {[
                      { icon: Leaf, label: 'Certified chemicals' },
                      { icon: Recycle, label: 'Reduced waste' },
                      { icon: ShieldCheck, label: 'Safe for all settings' },
                    ].map(({ icon: Icon, label }) => (
                      <li key={label} className="inline-flex items-center gap-2">
                        <Icon className="h-4 w-4 text-gold-700" aria-hidden="true" />
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                  <Button href="/services/eco-friendly-cleaning" icon={<ArrowRight className="w-4 h-4" />}>
                    Eco-Friendly Cleaning
                  </Button>
                  <Link
                    href="/about#eco"
                    className="inline-flex min-h-[44px] items-center justify-center px-2 text-sm font-semibold text-gold-700 underline underline-offset-2 hover:text-gold-800"
                  >
                    Our eco-friendly approach
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk management & compliance */}
        <RiskCompliance />

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeading
                  align="left"
                  heading="Why Choose Empire?"
                  subtext="We build genuine partnerships with our clients, resulting in long-term relationships and numerous repeat projects. Our Chief Operating Officer maintains constant communication to ensure the right work is always being done."
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
                  { icon: Shield,    title: 'Screened Staff',   desc: 'Checks matched to each site' },
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
        <PhotoGallery
          id="at-work-heading"
          eyebrow="At Work"
          heading="Our Team on Site"
          subtext="Our own people, equipment and vehicles."
          photos={[PHOTOS.fleet, PHOTOS.glassDoorCleaning, PHOTOS.carParkClearing, PHOTOS.floorScrubber]}
          cta={{ href: '/about#fleet-heading', label: 'See our team and fleet' }}
        />

        <ClientsMarquee />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA — gold background, secondary button + plain phone link */}
        <section className="py-16 bg-gold-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900">Ready to Get Started?</h2>
            <p className="mt-3 text-navy-900">
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
      <BackToTop />
      <SiteWidgets />
    </>
  )
}
