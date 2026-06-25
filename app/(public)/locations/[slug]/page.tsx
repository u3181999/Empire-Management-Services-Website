import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { LOCATIONS, SERVICES, COMPANY } from '@/lib/constants'
import { Button, SectionHeading } from '@/components/ui'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.id }))
}

export async function generateMetadata(props: PageProps<'/locations/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const location = LOCATIONS.find((l) => l.id === slug)
  if (!location) return {}
  return {
    title: `Commercial Cleaning ${location.name} | Empire Management Services`,
    description: `Professional commercial cleaning services in ${location.name}. Contact Empire Management Services — 30+ years experience, ISO certified.`,
  }
}

const LOCATION_CONTENT: Record<string, {
  headline: string
  description: string
  mapQuery: string
  areas: string[]
}> = {
  canberra: {
    headline: 'Commercial Cleaning in Canberra & the ACT',
    description:
      'Empire Management Services has been delivering professional commercial cleaning across Canberra and the ACT for over 30 years. Our Fyshwick head office serves government departments, commercial buildings, strata complexes, medical centres, and industrial facilities throughout the territory.',
    mapQuery: '89-91+Tennant+Street+Fyshwick+ACT+2609+Australia',
    areas: ['Civic', 'Fyshwick', 'Woden', 'Tuggeranong', 'Belconnen', 'Gungahlin', 'Queanbeyan'],
  },
  nsw: {
    headline: 'Commercial Cleaning in New South Wales',
    description:
      'Empire Management Services extends its ISO-certified commercial cleaning services across New South Wales. Managed from our Canberra head office, we service commercial clients throughout NSW with the same professional standards and dedicated teams.',
    mapQuery: 'New+South+Wales+Australia',
    areas: ['Sydney', 'Wollongong', 'Newcastle', 'Southern Highlands', 'Snowy Mountains', 'Riverina'],
  },
}

export default async function LocationPage(props: PageProps<'/locations/[slug]'>) {
  const { slug } = await props.params
  const location = LOCATIONS.find((l) => l.id === slug)
  if (!location) notFound()

  const content = LOCATION_CONTENT[slug] ?? {
    headline: `Commercial Cleaning in ${location.name}`,
    description: `Empire Management Services provides professional commercial cleaning across ${location.name}.`,
    mapQuery: encodeURIComponent(location.address),
    areas: [],
  }

  const featuredServices = SERVICES.slice(0, 6)

  return (
    <>
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gold-500 text-sm font-medium mb-3">
            <MapPin className="w-4 h-4" />
            {location.name}{location.isHeadOffice ? ' — Head Office' : ''}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">{content.headline}</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">{content.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/booking" icon={<ArrowRight className="w-4 h-4" />}>
              Get a Free Quote
            </Button>
            <Button href="/contact" variant="outline-light">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact details */}
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Location Details</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">Address</p>
                    <p className="text-gray-600 text-sm mt-0.5">{location.address}</p>
                    {location.isHeadOffice && (
                      <p className="text-gray-500 text-xs mt-0.5">{COMPANY.poBox}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">Phone</p>
                    <a
                      href={`tel:${location.phone.replace(/\s/g, '')}`}
                      className="text-gray-600 text-sm hover:text-gold-500 transition-colors"
                    >
                      {location.phone}
                    </a>
                    {location.isHeadOffice && (
                      <p className="text-gray-500 text-xs mt-0.5">Fax: {COMPANY.fax}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">Email</p>
                    <a
                      href={`mailto:${location.email}`}
                      className="text-gray-600 text-sm hover:text-gold-500 transition-colors"
                    >
                      {location.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">Office Hours</p>
                    <p className="text-gray-600 text-sm mt-0.5">
                      Monday – Friday: 7:00am – 5:00pm<br />
                      Saturday: By appointment<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {content.areas.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold text-navy-900 mb-3">Areas We Service</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {content.areas.map((area) => (
                      <li key={area} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm h-80 lg:h-full min-h-[320px]">
              <iframe
                title={`Map — ${location.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${content.mapQuery}&output=embed&z=15`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            heading={`Our Services in ${location.name}`}
            subtext="Every cleaning schedule is tailor-designed to meet your requirements."
          />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-gold-500/40 hover:shadow-sm transition-all"
              >
                <p className="font-semibold text-navy-900 group-hover:text-gold-500 transition-colors text-sm">
                  {service.name}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{service.shortDescription}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/services" className="text-sm text-gold-500 font-medium hover:underline">
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-navy-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            light
            heading={`Get a Quote for ${location.name}`}
            subtext="Contact us today for a free consultation and tailored cleaning proposal."
          />
          <Button
            href="/booking"
            size="lg"
            className="mt-8"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Book a Service
          </Button>
        </div>
      </section>
    </>
  )
}
