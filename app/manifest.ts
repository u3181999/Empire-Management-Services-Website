import type { MetadataRoute } from 'next'
import { COMPANY } from '@/lib/constants'

// Served at /manifest.webmanifest. Gives Android and "Add to home screen" the right name, icons and colours.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.name,
    short_name: 'Empire',
    description: 'Commercial and industrial cleaning across Canberra (ACT) and New South Wales.',
    start_url: '/',
    display: 'standalone',
    lang: 'en-AU',
    background_color: '#ffffff',
    theme_color: '#102a43',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
