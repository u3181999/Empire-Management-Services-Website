'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{ bottom: 'calc(1.5rem + var(--cookie-banner-h, 0px))' }}
      className="fixed left-6 z-50 w-14 h-14 rounded-full bg-navy-900 text-white shadow-lg flex items-center justify-center hover:bg-navy-950 transition-colors"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  )
}
