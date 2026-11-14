import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import TestimonialCard from './TestimonialCard'

// How many reviews the home page shows. Anything beyond this is on the Reviews page (/testimonials).
const HOME_LIMIT = 6

export default async function TestimonialsSection() {
  const where = { isPublished: true }
  const [testimonials, total] = await Promise.all([
    prisma.testimonial.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      take: HOME_LIMIT,
    }),
    prisma.testimonial.count({ where }),
  ])

  if (testimonials.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2">
            What Our Clients Say
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#102a43]">Reviews & Testimonials</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm">
            Trusted by leading organisations across Canberra and New South Wales.
          </p>
        </div>

        {/* One or two reviews are centred and wider so the section never looks half empty; three or more fill the grid. */}
        <div
          className={`grid gap-6 ${
            testimonials.length === 1
              ? 'grid-cols-1 max-w-xl mx-auto'
              : testimonials.length === 2
                ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} t={t} preview />
          ))}
        </div>

        {/* Only appears once there are more reviews than the home page can show. */}
        {total > testimonials.length && (
          <div className="mt-10 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 rounded-lg border border-[#102a43]/20 bg-white px-6 py-3 text-sm font-semibold text-[#102a43] transition-colors hover:border-gold-500 hover:bg-gold-500/10"
            >
              Read all {total} reviews <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
