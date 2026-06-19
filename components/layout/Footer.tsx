import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Linkedin } from 'lucide-react'
import { COMPANY, NAV_ITEMS, SERVICES } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0b1f31] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <span className="text-[#d4a017] font-bold text-lg">Empire Management Services</span>
            <p className="mt-3 text-sm leading-relaxed">{COMPANY.tagline}</p>
            <p className="mt-3 text-xs text-gray-400">
              Established 1995 · {COMPANY.yearsExperience}+ years · {COMPANY.clientCount}+ clients
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 bg-white/5 rounded hover:bg-[#d4a017] hover:text-[#102a43] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2 bg-white/5 rounded hover:bg-[#d4a017] hover:text-[#102a43] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm hover:text-[#d4a017] transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-[#d4a017] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/booking" className="text-sm hover:text-[#d4a017] transition-colors">
                  Book a Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#d4a017]" />
                <span className="text-sm">{COMPANY.address}, {COMPANY.suburb} {COMPANY.state} {COMPANY.postcode}</span>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2.5 text-sm hover:text-[#d4a017] transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[#d4a017]" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 text-sm hover:text-[#d4a017] transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 text-[#d4a017]" />
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {year} {COMPANY.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#d4a017] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#d4a017] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
