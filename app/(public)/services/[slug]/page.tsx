import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CalendarClock, CheckCircle2, ChevronDown, Phone } from 'lucide-react'
import { SERVICES, COMPANY } from '@/lib/constants'
import Image from 'next/image'
import { SERVICE_CONTENT } from '@/lib/service-content'
import { SERVICE_PHOTOS } from '@/lib/photos'
import { SERVICE_ICONS, FALLBACK_SERVICE_ICON } from '@/components/features/service-icons'
import { Button, Badge, Card } from '@/components/ui'
import type { Metadata } from 'next'
import { fitTitle, fitDescription, pageSeo, serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    ...pageSeo(`/services/${slug}`),
    title: fitTitle(service.name, 'Canberra'),
    // Each service's own sentence, with a closing line that names the company and area where there is room.
    description: fitDescription(service.shortDescription, [
      'Delivered by Empire Management Services across Canberra and NSW. Get a free quote.',
      'Empire Management Services, Canberra and NSW. Get a free quote.',
      'Get a free quote from Empire Management Services.',
    ]),
  }
}

const SERVICE_DETAILS: Record<string, { benefits: string[]; suitableFor: string[] }> = {
  'commercial-residential-strata': {
    benefits: [
      'Regular scheduled cleaning of common areas, lobbies, and stairwells',
      'Waste collection and bin management',
      'Window and glass surface cleaning',
      'Graffiti removal as required',
      'Carpet vacuuming and hard floor maintenance',
    ],
    suitableFor: ['Residential strata complexes', 'Mixed-use developments', 'Commercial building common areas'],
  },
  'commercial-buildings': {
    benefits: [
      'Daily, weekly, or monthly cleaning programs',
      'After-hours cleaning to minimise disruption',
      'Dedicated account manager for your building',
      'Flexible service scheduling around your business hours',
      'Full consumable supply and management',
    ],
    suitableFor: ['Office buildings', 'Corporate headquarters', 'Multi-tenanted buildings'],
  },
  // Building management, not strata management (owner, 26 Nov 2026). List only what Empire really provides (see CLAIMS.md).
  'building-management': {
    benefits: [
      'One point of contact for the upkeep of your building',
      'Coordination of cleaning, maintenance and contractors',
      'Regular site inspections with reports to the building owner or manager',
      'Prompt response to building and common-area issues',
      'Works alongside your property or strata managing agent',
    ],
    suitableFor: ['Commercial and office buildings', 'Multi-tenanted buildings', 'Mixed-use developments', 'Residential complexes'],
  },
  // Delivered today for a university campus and Australian Government buildings (those were examples from the owner).
  // The page deliberately speaks about sites in general and names no client: naming one needs their permission.
  'eco-friendly-cleaning': {
    benefits: [
      "Green cleaning chemicals certified by Good Environmental Choice Australia (GECA), from Agar's Green Cleaning Range",
      'Environmentally friendly cleaning methods',
      'Waste minimisation built into the cleaning program',
      'Effective cleaning and disinfection without compromising safety',
      'Backed by our ISO 14001 environmental management certification',
    ],
    suitableFor: ['Offices and corporate buildings', 'Healthcare and medical settings', 'Commercial facilities', 'Public and institutional buildings'],
  },
  'government-departments': {
    benefits: [
      'Security-cleared teams available for sensitive environments',
      'Strict confidentiality agreements for all personnel',
      'Compliance with government procurement requirements',
      'Consistent, audit-ready cleaning standards',
      'Flexible scheduling around operational hours',
    ],
    suitableFor: ['Federal and territory government offices', 'Defence facilities', 'Courts and tribunals'],
  },
  'medical-centres': {
    benefits: [
      'Infection control compliant procedures',
      'Hospital-grade disinfectants used throughout',
      'Colour-coded cleaning equipment to prevent cross-contamination',
      'Trained in medical waste handling protocols',
      'After-hours cleaning to minimise patient disruption',
    ],
    suitableFor: ['Medical centres', 'Dental practices', 'Specialist clinics', 'Pathology labs'],
  },
  'shopping-centres': {
    benefits: [
      'High-traffic area maintenance throughout trading hours',
      'Food court and kitchen cleaning',
      'Restroom hygiene management',
      'Slip hazard management and spill response',
      'Car park and external area maintenance',
    ],
    suitableFor: ['Shopping centres', 'Retail strips', 'Supermarkets', 'Food courts'],
  },
  'commercial-window-cleaning': {
    benefits: [
      'Interior and exterior window cleaning',
      'High-rise and multi-storey capability',
      'Streak-free, professional finish',
      'Regular scheduled programs available',
      'Fully insured and OH&S compliant',
    ],
    suitableFor: ['Office buildings', 'Retail shops', 'Residential strata', 'Hotels'],
  },
  'high-pressure-cleaning': {
    benefits: [
      'Removes built-up grime, mould, and algae',
      'Suitable for concrete, brick, and paving',
      'Building facade and wall washing',
      'Drain clearing and pit cleaning',
      'Environmentally responsible chemical use',
    ],
    suitableFor: ['Building exteriors', 'Driveways', 'Footpaths', 'Loading docks', 'Car parks'],
  },
  'waste-removal-hygiene': {
    benefits: [
      'Sanitary bins, paper towel, and soap dispensers supplied',
      'Scheduled collection and replacement',
      'Compliant disposal of sanitary waste',
      'Sharps disposal and clinical waste management',
      'Full audit trail for compliance',
    ],
    suitableFor: ['Offices', 'Medical facilities', 'Retail', 'Industrial sites'],
  },
  'carpet-cleaning': {
    benefits: [
      'Hot water extraction (steam cleaning)',
      'Dry cleaning methods for sensitive carpets',
      'Stain treatment and odour removal',
      'Rapid drying techniques available',
      'Regular maintenance programs to extend carpet life',
    ],
    suitableFor: ['Office carpets', 'Common areas', 'Hospitality venues', 'Residential strata'],
  },
  'car-park-warehouse-sweeping': {
    benefits: [
      'Ride-on mechanical sweepers for large areas',
      'Scrubbing for stains and oil marks',
      'Dust suppression during cleaning',
      'Line marking protection',
      'Flexible scheduling — day or night',
    ],
    suitableFor: ['Multi-storey car parks', 'Warehouses', 'Loading docks', 'Industrial yards'],
  },
  'graffiti-removal': {
    benefits: [
      'Fast response to minimise visual impact',
      'Safe removal from brick, concrete, glass, and metal',
      'Anti-graffiti protective coating application',
      'Photographic documentation before and after',
      'Ongoing maintenance programs available',
    ],
    suitableFor: ['Public buildings', 'Retail facades', 'Strata complexes', 'Transport infrastructure'],
  },
}

// How every program starts. It mirrors what the home page already promises: a written scope for every site (the
// Site Duty Statement), a briefing before work starts, and a review when the site or the work changes.
const PROCESS_STEPS = [
  {
    title: 'Tell us about your site',
    text: 'Share the type of building, its size, your opening hours and anything special about it. A short call or the contact form is enough.',
  },
  {
    title: 'We plan the work',
    text: 'We prepare a cleaning schedule and a Site Duty Statement for your site: what is cleaned, how often and who is responsible.',
  },
  {
    title: 'Your team starts',
    text: 'Our team is briefed on your site before they begin, then the program runs to the agreed schedule.',
  },
  {
    title: 'We keep it on track',
    text: 'We check the work regularly and review the plan when your site or your needs change.',
  },
]

export default async function ServiceDetailPage(props: PageProps<'/services/[slug]'>) {
  const { slug } = await props.params
  const service = SERVICES.find((s) => s.slug === slug)

  if (!service) notFound()

  const details = SERVICE_DETAILS[slug] ?? {
    benefits: ['Professionally delivered by trained, screened staff'],
    suitableFor: ['Commercial and industrial clients'],
  }
  const content = SERVICE_CONTENT[slug]
  const photo = SERVICE_PHOTOS[slug]
  const related = (content?.related ?? [])
    .map((relatedSlug) => SERVICES.find((s) => s.slug === relatedSlug))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s))
  // The contact form opens with this service already chosen.
  const quoteHref = `/contact?service=${slug}`
  const phoneHref = `tel:${COMPANY.phone.replace(/\s/g, '')}`

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.name, path: `/services/${slug}` },
          ]),
          ...(content ? [faqSchema(content.faqs)] : []),
        ]}
      />
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 py-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>
          <Badge variant="gold" className="mb-3 capitalize">{service.category}</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold">{service.name}</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">{service.shortDescription}</p>
          {/* Visible straight away, on a phone too, rather than only in the sidebar further down */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={quoteHref} icon={<ArrowRight className="w-4 h-4" />}>
              Request a Quote
            </Button>
            <a
              href={phoneHref}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> Call {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {content && <p className="text-lg leading-relaxed text-gray-700">{content.intro}</p>}

              {photo && (
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-gray-100">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 790px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs text-gray-600">{photo.caption}</figcaption>
                </figure>
              )}

              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-4">What&apos;s Included</h2>
                <ul className="space-y-3">
                  {details.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <span className="text-gray-600">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {content && (
                <div className="flex gap-4 rounded-2xl border border-gold-200 bg-gold-50 p-5 sm:p-6">
                  <CalendarClock className="mt-0.5 h-6 w-6 shrink-0 text-gold-700" aria-hidden="true" />
                  <div>
                    <h2 className="text-lg font-bold text-navy-900">How often?</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-700">{content.frequency}</p>
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-4">Suitable For</h2>
                <div className="flex flex-wrap gap-2">
                  {details.suitableFor.map((s) => (
                    <Badge key={s} variant="muted">{s}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-5">How It Works</h2>
                <ol className="grid gap-4 sm:grid-cols-2">
                  {PROCESS_STEPS.map((step, i) => (
                    <li key={step.title} className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-gold-500"
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-navy-900">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {content && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-5">Common Questions</h2>
                  <div className="space-y-3">
                    {content.faqs.map((faq) => (
                      <details key={faq.q} className="group rounded-xl border border-gray-200 bg-white open:border-gold-500/60 open:shadow-sm">
                        <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-semibold text-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 [&::-webkit-details-marker]:hidden">
                          {faq.q}
                          <ChevronDown
                            className="h-5 w-5 shrink-0 text-gold-600 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                            aria-hidden="true"
                          />
                        </summary>
                        <p className="px-4 pb-4 text-sm leading-relaxed text-gray-600">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <Card variant="navy">
                <h3 className="font-bold text-lg">Get a Free Quote</h3>
                <p className="mt-2 text-gray-300 text-sm">
                  Every schedule is custom-designed. Tell us about your site and we will come back with a quote.
                </p>
                {/* PRIMARY CTA for this page */}
                <Button href={quoteHref} className="mt-5 w-full" icon={<ArrowRight className="w-4 h-4" />}>
                  Request a Quote
                </Button>
                {/* Phone: a plain link, not a competing button */}
                <a
                  href={phoneHref}
                  className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-300 hover:text-white transition-colors py-2"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" /> {COMPANY.phone}
                </a>
              </Card>

              <Card variant="muted">
                <h3 className="font-bold text-navy-900 mb-4">Other Services</h3>
                <ul className="space-y-2">
                  {SERVICES.filter((s) => s.slug !== slug)
                    .slice(0, 5)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="inline-block py-1 text-sm text-gray-600 hover:text-gold-700 transition-colors"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  <li>
                    <Link href="/services" className="inline-block py-1 text-sm text-gold-700 font-medium underline underline-offset-2 hover:text-gold-800">
                      View all services →
                    </Link>
                  </li>
                </ul>
              </Card>
            </aside>
          </div>

          {related.length > 0 && (
            <div className="mt-16 border-t border-gray-100 pt-12">
              <h2 className="text-2xl font-bold text-navy-900">Often Combined With</h2>
              <p className="mt-2 text-sm text-gray-600">Clients often add these to {service.name.toLowerCase()}, so one team looks after the site.</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((r) => {
                  const Icon = SERVICE_ICONS[r.icon] ?? FALLBACK_SERVICE_ICON
                  return (
                    <li key={r.slug}>
                      <Link
                        href={`/services/${r.slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-gold-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 text-gold-500 transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="mt-4 font-bold text-navy-900">{r.name}</span>
                        <span className="mt-1 flex-1 text-sm leading-relaxed text-gray-600">{r.shortDescription}</span>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                          Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
