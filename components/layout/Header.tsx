'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Phone, MapPin } from 'lucide-react'
import { NAV_ITEMS, COMPANY } from '@/lib/constants'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-[#102a43] text-white sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="bg-[#0b1f31] py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-1.5 hover:text-[#d4a017] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            {COMPANY.phone}
          </a>
          <span className="flex items-center gap-1.5 text-gray-400">
            <MapPin className="w-3.5 h-3.5 text-[#d4a017]" />
            Canberra (Head Office)
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Empire Management Services"
              width={220}
              height={80}
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium hover:text-[#d4a017] hover:bg-white/5 rounded transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="ml-2 px-4 py-2 bg-[#d4a017] text-[#102a43] font-bold text-sm rounded hover:bg-[#e8b81a] transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-2 py-3 text-sm font-medium hover:text-[#d4a017] hover:bg-white/5 rounded transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="block mt-2 px-4 py-3 bg-[#d4a017] text-[#102a43] font-bold text-sm text-center rounded hover:bg-[#e8b81a] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
