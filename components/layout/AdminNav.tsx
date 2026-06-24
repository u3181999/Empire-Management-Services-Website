'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, FileText, LogOut, Star } from 'lucide-react'
import { signOut } from 'next-auth/react'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar, exact: false },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star, exact: false },
  { href: '/admin/blog', label: 'Blog', icon: FileText, exact: false },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-[#102a43] text-white flex flex-col min-h-screen">
      <div className="p-6 border-b border-white/10">
        <span className="text-[#d4a017] font-bold">Empire Admin</span>
      </div>
      <nav className="flex-1 p-4 space-y-1" aria-label="Admin navigation">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-[#d4a017] text-[#102a43]' : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
