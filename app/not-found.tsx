import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center py-20 bg-gray-50">
        <div className="text-center px-4">
          <p className="text-7xl font-bold text-gold-500">404</p>
          <h1 className="mt-4 text-2xl font-bold text-navy-900">Page Not Found</h1>
          <p className="mt-3 text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/"
            className="mt-8 inline-block px-6 py-3 bg-[#102a43] text-white font-semibold rounded-lg hover:bg-[#0b1f31] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
