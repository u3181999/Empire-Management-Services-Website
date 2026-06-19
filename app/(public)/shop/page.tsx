import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ShoppingCart, Gift } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop — Cleaning Supplies & Gift Certificates',
  description:
    'Purchase professional cleaning supplies and gift certificates from Empire Management Services.',
}

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  })

  const physicalProducts = products.filter((p) => p.type === 'PHYSICAL')
  const giftCerts = products.filter((p) => p.type === 'GIFT_CERTIFICATE')

  return (
    <>
      <section className="bg-[#102a43] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">Shop</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">
            Professional cleaning supplies and gift certificates delivered Australia-wide.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Gift Certificates */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Gift className="w-6 h-6 text-[#d4a017]" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-[#102a43]">Gift Certificates</h2>
            </div>
            {giftCerts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {giftCerts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <GiftCertificateDefaultCard />
            )}
          </div>

          {/* Physical Products */}
          {physicalProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className="w-6 h-6 text-[#d4a017]" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-[#102a43]">Cleaning Supplies</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {physicalProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function ProductCard({ product }: { product: { id: string; name: string; slug: string; description: string; price: number; type: string; imageUrl: string | null } }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-[#d4a017] hover:shadow-md transition-all flex flex-col"
    >
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-300">
            {product.type === 'GIFT_CERTIFICATE' ? (
              <Gift className="w-12 h-12" />
            ) : (
              <ShoppingCart className="w-12 h-12" />
            )}
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-[#102a43] group-hover:text-[#d4a017] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 flex-1 line-clamp-2">{product.description}</p>
        <p className="mt-3 text-lg font-bold text-[#102a43]">
          ${(product.price / 100).toFixed(2)}
        </p>
      </div>
    </Link>
  )
}

function GiftCertificateDefaultCard() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[50, 100, 250].map((amount) => (
        <Link
          key={amount}
          href={`/shop/gift-certificate-${amount}`}
          className="group bg-gradient-to-br from-[#102a43] to-[#1e3a5f] text-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all"
        >
          <Gift className="w-10 h-10 text-[#d4a017] mb-4" aria-hidden="true" />
          <h3 className="text-xl font-bold">${amount} Gift Certificate</h3>
          <p className="mt-2 text-gray-300 text-sm">
            Redeemable against any Empire Management Services cleaning service.
          </p>
          <p className="mt-4 text-2xl font-bold text-[#d4a017]">${amount}.00</p>
        </Link>
      ))}
    </div>
  )
}
