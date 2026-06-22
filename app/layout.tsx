import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import SessionProvider from '@/components/layout/SessionProvider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Empire Management Services | Commercial Cleaning Canberra',
    template: '%s | Empire Management Services',
  },
  description:
    'Professional commercial and industrial cleaning services in Canberra, NSW and Queensland. 30+ years experience. Strata, government, medical, industrial cleaning.',
  keywords: [
    'commercial cleaning Canberra',
    'industrial cleaning ACT',
    'strata cleaning',
    'government cleaning',
    'medical centre cleaning',
    'Empire Management Services',
  ],
  authors: [{ name: 'Empire Management Services' }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png' },
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Empire Management Services',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-AU" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
          <SessionProvider>{children}</SessionProvider>
        </body>
    </html>
  )
}
