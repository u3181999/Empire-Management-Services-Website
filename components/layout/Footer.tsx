import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
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
            <p className="mt-1 text-xs text-gray-400">ABN {COMPANY.abn}</p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.facebook.com/empirecleaningservices"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 bg-white/5 rounded hover:bg-[#d4a017] hover:text-[#102a43] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/empire-management-services"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 bg-white/5 rounded hover:bg-[#d4a017] hover:text-[#102a43] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
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
