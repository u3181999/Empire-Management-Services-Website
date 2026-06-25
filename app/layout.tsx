import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import SessionProvider from '@/components/layout/SessionProvider'
import ChatBot from '@/components/features/ChatBot'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://empirecleaning.com.au'),
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
    url: 'https://empirecleaning.com.au',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Empire Management Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
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
    <html lang="en-AU" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SessionProvider>{children}</SessionProvider>
        <ChatBot />
      </body>
    </html>
  )
}
