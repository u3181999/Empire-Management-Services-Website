import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { SERVICE_ICONS, FALLBACK_SERVICE_ICON } from './service-icons'

/**
 * Every service as one compact, tappable tile, so the home page stays short. The detail (what is included, who it
 * suits) is one tap away on each service page, and the Services page keeps the full cards and sector filter.
 * The last tile is a quote prompt that fills the final row at every width: 13 services plus this one.
 */
export default function ServicesQuickGrid() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {SERVICES.map((service) => {
        const Icon = SERVICE_ICONS[service.icon] ?? FALLBACK_SERVICE_ICON
        return (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="group flex h-full min-h-[64px] items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:border-gold-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-3.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-gold-500 transition-colors duration-200 group-hover:bg-gold-500 group-hover:text-navy-900 sm:h-10 sm:w-10">
                <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 text-[13px] font-semibold leading-snug text-navy-900 sm:text-sm">
                {service.name}
              </span>
              <ChevronRight
                className="hidden h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-gold-600 sm:block"
                aria-hidden="true"
              />
            </Link>
          </li>
        )
      })}

      <li className="col-span-1 sm:col-span-2 lg:col-span-3">
        <Link
          href="/contact"
          className="group flex h-full min-h-[64px] items-center justify-between gap-3 rounded-xl bg-navy-900 p-3 text-white transition duration-200 hover:bg-navy-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 sm:p-3.5 sm:px-5"
        >
          <span className="text-[13px] font-semibold leading-snug sm:text-sm">
            Not sure which you need?{' '}
            <span className="text-gold-400">Tell us about your site and we&apos;ll recommend a plan.</span>
          </span>
          <ArrowRight
            className="h-5 w-5 shrink-0 text-gold-500 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </Link>
      </li>
    </ul>
  )
}
