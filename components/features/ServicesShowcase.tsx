'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Building2, Building, Factory, Landmark, Stethoscope, ShoppingBag,
  Sparkles, Droplets, Recycle, Brush, Car, SprayCan, LayoutGrid,
  type LucideIcon,
} from 'lucide-react'
import { SERVICES } from '@/lib/constants'

// Keys match the `icon` field on each entry in SERVICES.
const SERVICE_ICONS: Record<string, LucideIcon> = {
  Building2, Building, Factory, Landmark, Stethoscope, ShoppingBag,
  Sparkles, Droplets, Recycle, Brush, Car, SprayCan,
}

const FILTERS: { key: string; label: string; icon: LucideIcon }[] = [
  { key: 'all',        label: 'All Services', icon: LayoutGrid },
  { key: 'commercial', label: 'Commercial',   icon: Building2 },
  { key: 'industrial', label: 'Industrial',   icon: Factory },
  { key: 'government', label: 'Government',   icon: Landmark },
  { key: 'healthcare', label: 'Healthcare',   icon: Stethoscope },
  { key: 'retail',     label: 'Retail',       icon: ShoppingBag },
  { key: 'specialist', label: 'Specialist',   icon: Sparkles },
]

const CATEGORY_LABEL = Object.fromEntries(FILTERS.map((f) => [f.key, f.label]))

function countFor(key: string) {
  return key === 'all' ? SERVICES.length : SERVICES.filter((s) => s.category === key).length
}

export default function ServicesShowcase() {
  const [active, setActive] = useState('all')
  const visible = active === 'all' ? SERVICES : SERVICES.filter((s) => s.category === active)

  return (
    <div>
      {/* Sector filter — scrolls sideways on phones, wraps and centres on larger screens */}
      <div
        role="group"
        aria-label="Filter services by sector"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
      >
        {FILTERS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              aria-pressed={isActive}
              className={[
                'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500',
                isActive
                  ? 'border-navy-900 bg-navy-900 text-white shadow-md'
                  : 'border-gray-200 bg-white text-navy-700 hover:border-gold-500 hover:text-navy-900',
              ].join(' ')}
            >
              <Icon className={['h-4 w-4', isActive ? 'text-gold-500' : 'text-gold-600'].join(' ')} aria-hidden="true" />
              {label}
              <span
                className={[
                  'rounded-full px-2 py-0.5 text-xs tabular-nums',
                  isActive ? 'bg-white/15 text-white' : 'bg-gray-100 text-gray-500',
                ].join(' ')}
              >
                {countFor(key)}
              </span>
            </button>
          )
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? 'service' : 'services'}
      </p>

      {/* Remounting on filter change replays the staggered entrance */}
      <div key={active} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((service, i) => {
          const Icon = SERVICE_ICONS[service.icon] ?? Sparkles
          return (
            <div
              key={service.slug}
              style={{ animationDelay: `${i * 45}ms` }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-xl motion-safe:animate-fade-up focus-within:ring-2 focus-within:ring-gold-500/70"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-gold-500 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-900">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  {CATEGORY_LABEL[service.category]}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold leading-snug text-navy-900">
                {/* Stretched link: the ::after covers the whole card, so the entire tile is clickable */}
                <Link
                  href={`/services/${service.slug}`}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                >
                  {service.name}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{service.shortDescription}</p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
                {/* Sits above the stretched link (z-10) so it can be clicked on its own */}
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="relative z-10 rounded-full border border-navy-900/15 px-3.5 py-1.5 text-xs font-semibold text-navy-900 transition-colors hover:border-gold-500 hover:bg-gold-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                >
                  Get a Quote
                  <span className="sr-only"> for {service.name}</span>
                </Link>
              </div>

              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
