import CartPageClient from '@/components/features/CartPageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cart' }

export default function CartPage() {
  return (
    <>
      <section className="bg-[#102a43] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Your Cart</h1>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <CartPageClient />
        </div>
      </section>
    </>
  )
}
