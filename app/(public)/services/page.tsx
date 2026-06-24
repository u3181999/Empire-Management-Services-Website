import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { Button, Card, SectionHeading } from '@/components/ui'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore our full range of commercial cleaning services including strata, industrial, medical, government, window cleaning, graffiti removal and more.',
}

const CATEGORIES = [
  { key: 'commercial',  label: 'Commercial'  },
  { key: 'industrial',  label: 'Industrial'  },
  { key: 'government',  label: 'Government'  },
  { key: 'healthcare',  label: 'Healthcare'  },
  { key: 'retail',      label: 'Retail'      },
  { key: 'specialist',  label: 'Specialist'  },
] as const

export default function ServicesPage() {
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    services: SERVICES.filter((s) => s.category === cat.key),
  })).filter((g) => g.services.length > 0)

  return (
    <>
      <section className="bg-navy-900 text-white py-16 lg:py-24">
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
              <h2 className="text-2xl font-bold text-navy-900 mb-6">{group.label}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.services.map((service) => (
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
          ))}
        </div>
      </section>

      <section className="py-14 bg-navy-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            light
            heading="Can't find what you need?"
            subtext="We offer custom cleaning solutions. Contact us and we'll design a schedule around your requirements."
          />
          {/* PRIMARY CTA for this page */}
          <Button
            href="/contact"
            size="lg"
            className="mt-8"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Get a Free Quote
          </Button>
        </div>
      </section>
    </>
  )
}
