'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

interface LocationMapProps {
  lat: number
  lng: number
  name: string
  address: string
  /** Where "Get directions" in the pin popup should send people. */
  directionsUrl: string
}

/**
 * Interactive map with the Empire logo on the pin. Leaflet + OpenStreetMap tiles
 * (no API key). Leaflet is loaded on demand because it needs `window`.
 */
export default function LocationMap({ lat, lng, name, address, directionsUrl }: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let map: import('leaflet').Map | undefined
    let cancelled = false

    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !containerRef.current) return

      map = L.map(containerRef.current, {
        scrollWheelZoom: false, // don't hijack page scrolling
        dragging: !L.Browser.mobile, // one-finger drag should scroll the page on phones
      }).setView([lat, lng], 16)

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      }).addTo(map)

      const icon = L.divIcon({
        className: '', // drop Leaflet's default white square
        html: '<div class="empire-pin"><div class="empire-pin__head"><img src="/map-pin-logo.png" alt="" width="34" height="34" /></div></div>',
        iconSize: [52, 64],
        iconAnchor: [26, 64], // the pin's tip sits exactly on the coordinates
        popupAnchor: [0, -60],
      })

      // Built with DOM nodes (not an HTML string) so text is never interpreted as markup.
      const popup = document.createElement('div')
      const title = document.createElement('strong')
      title.textContent = name
      const addr = document.createElement('div')
      addr.textContent = address
      addr.style.margin = '4px 0 8px'
      const link = document.createElement('a')
      link.href = directionsUrl
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.textContent = 'Get directions'
      link.style.fontWeight = '600'
      popup.append(title, addr, link)

      L.marker([lat, lng], { icon, title: name, alt: name }).addTo(map).bindPopup(popup)
    })()

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [lat, lng, name, address, directionsUrl])

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`Map showing ${name}`}
      className="h-full w-full bg-gray-100"
    />
  )
}
