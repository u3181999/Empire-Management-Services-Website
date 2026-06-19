import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from 'lucide-react'
import { SERVICES, COMPANY } from '@/lib/constants'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: service.name,
    description: service.shortDescription,
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
  'industrial-cleaning': {
    benefits: [
      'Heavy machinery and equipment cleaning',
      'Warehouse floor scrubbing and sweeping',
      'Hazardous material handling compliance',
      'High-level dusting and cobweb removal',
      'Oil and grease removal',
    ],
    suitableFor: ['Manufacturing plants', 'Warehouses', 'Factories', 'Industrial facilities'],
  },
  'government-departments': {
    benefits: [
      'Security-cleared staff for sensitive environments',
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

export default async function ServiceDetailPage(props: PageProps<'/services/[slug]'>) {
  const { slug } = await props.params
  const service = SERVICES.find((s) => s.slug === slug)

  if (!service) notFound()

  const details = SERVICE_DETAILS[slug] ?? {
    benefits: ['Professionally delivered by trained, security-cleared staff'],
    suitableFor: ['Commercial and industrial clients'],
  }

  return (
    <>
      <section className="bg-[#102a43] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>
          <span className="inline-block bg-[#d4a017]/20 text-[#d4a017] text-xs font-semibold px-3 py-1 rounded mb-3 capitalize">
            {service.category}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold">{service.name}</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">{service.shortDescription}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-[#102a43] mb-4">What&apos;s Included</h2>
                <ul className="space-y-3">
                  {details.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#d4a017] mt-0.5 shrink-0" />
                      <span className="text-gray-600">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#102a43] mb-4">Suitable For</h2>
                <div className="flex flex-wrap gap-2">
                  {details.suitableFor.map((s) => (
                    <span
                      key={s}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-[#102a43] text-white rounded-xl p-6">
                <h3 className="font-bold text-lg">Get a Free Quote</h3>
                <p className="mt-2 text-gray-300 text-sm">
                  Every schedule is custom-designed. Contact us to discuss your requirements.
                </p>
                <Link
                  href="/booking"
                  className="mt-5 flex items-center justify-center gap-2 px-4 py-3 bg-[#d4a017] text-[#102a43] font-bold rounded-lg hover:bg-[#e8b81a] transition-colors"
                >
                  Book Now <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                  className="mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" /> {COMPANY.phone}
                </a>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-[#102a43] mb-4">Other Services</h3>
                <ul className="space-y-2">
                  {SERVICES.filter((s) => s.slug !== slug)
                    .slice(0, 5)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="text-sm text-gray-600 hover:text-[#d4a017] transition-colors"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  <li>
                    <Link
                      href="/services"
                      className="text-sm text-[#d4a017] font-medium hover:underline"
                    >
                      View all services →
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
