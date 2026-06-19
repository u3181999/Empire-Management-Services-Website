'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { NAV_ITEMS, LOCATIONS, COMPANY } from '@/lib/constants'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0])

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

          {/* Location Picker */}
          <div className="relative">
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className="flex items-center gap-1 hover:text-[#d4a017] transition-colors"
              aria-expanded={locationOpen}
              aria-haspopup="listbox"
            >
              <span>{selectedLocation.name}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${locationOpen ? 'rotate-180' : ''}`} />
            </button>

            {locationOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full mt-1 bg-white text-[#102a43] rounded shadow-xl min-w-[220px] py-1 z-50"
              >
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    role="option"
                    aria-selected={selectedLocation.id === loc.id}
                    onClick={() => {
                      setSelectedLocation(loc)
                      setLocationOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-navy-50 hover:text-[#102a43] text-sm transition-colors"
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span className="text-[#d4a017] font-bold text-xl leading-tight">
              Empire<br />
              <span className="text-white text-sm font-medium">Management Services</span>
            </span>
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
