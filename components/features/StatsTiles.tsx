import { Award, Briefcase, UsersRound, CalendarClock, Ruler, MapPin } from 'lucide-react'
import { COMPANY } from '@/lib/constants'
import HygieiaBowl from '@/components/ui/HygieiaBowl'
import AnimatedCounter from './AnimatedCounter'

const STATS = [
  { end: COMPANY.yearsExperience, suffix: '+',  label: 'Years Experience',       icon: Award },
  { end: COMPANY.clientCount,     suffix: '+',  label: 'Active Clients',         icon: Briefcase },
  { end: COMPANY.staffCount,      suffix: '+',  label: 'Cleaning Staff',         icon: UsersRound },
  { end: COMPANY.weeklyHours,     suffix: '+',  label: 'Hours Serviced Weekly',  icon: CalendarClock },
  { end: COMPANY.sitesM2,         suffix: 'm²', label: 'Sites Serviced',         icon: Ruler },
  { end: 2,                       suffix: '',   label: 'States & Territories',                 icon: MapPin },
] as const

export default function StatsTiles() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white" aria-label="Empire Management Services at a glance">
      {/* Decorative only: a soft gold glow and a faint Bowl of Hygieia, the emblem of health and hygiene (same treatment as the Eco-Friendly section) */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
      <HygieiaBowl strokeWidth={0.8} className="pointer-events-none absolute right-2 top-1/2 h-72 w-72 -translate-y-1/2 -rotate-[8deg] text-white/[0.06] xl:right-[2%]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {STATS.map(({ end, suffix, label, icon: Icon }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:bg-white/[0.07]"
            >
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-500 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-900">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <AnimatedCounter
                end={end}
                suffix={suffix}
                className="block text-2xl sm:text-3xl font-bold tabular-nums"
              />
              <span className="mt-1 block text-xs sm:text-sm text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
