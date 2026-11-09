import { ArrowRight } from 'lucide-react'
import { Button, SectionHeading } from '@/components/ui'
import ServicesShowcase from '@/components/features/ServicesShowcase'
import StatsTiles from '@/components/features/StatsTiles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore our full range of commercial cleaning services including strata, industrial, medical, government, window cleaning, graffiti removal and more.',
}

export default function ServicesPage() {
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

      <StatsTiles />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesShowcase />
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
