import Link from 'next/link'
import { ShoppingCart, Droplets, Phone } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop — Toiletries & Cleaning Chemicals',
  description:
    'Order professional-grade toiletries and cleaning chemicals from Empire Management Services. Available for sale and bulk order across Canberra and NSW.',
}

const TOILETRIES = [
  {
    slug: 'bulk-hand-soap-5l',
    name: 'Bulk Hand Soap',
    size: '5 Litre',
    description: 'Gentle antibacterial hand soap suitable for all skin types. Ideal for restroom dispensers in commercial and office environments.',
    price: 4500,
    emoji: '🧴',
  },
  {
    slug: 'paper-hand-towels-carton',
    name: 'Paper Hand Towels',
    size: 'Carton (2,400 sheets)',
    description: 'Commercial-grade C-fold and interfold paper towels. Soft, absorbent and compatible with most wall-mount dispensers.',
    price: 3800,
    emoji: '🧻',
  },
  {
    slug: 'toilet-paper-commercial-carton',
    name: 'Commercial Toilet Paper',
    size: 'Carton (48 rolls)',
    description: '2-ply commercial toilet paper rolls. Soft and strong — suitable for high-traffic restrooms in offices, retail and industrial sites.',
    price: 4200,
    emoji: '🧻',
  },
  {
    slug: 'hand-sanitiser-5l',
    name: 'Hand Sanitiser',
    size: '5 Litre',
    description: '70% ethanol-based hand sanitiser. Hospital-grade formulation suitable for high-frequency use in commercial and healthcare environments.',
    price: 5500,
    emoji: '🤲',
  },
  {
    slug: 'sanitiser-wipes-200pk',
    name: 'Sanitiser Wipes',
    size: '200 Pack',
    description: 'Pre-moistened disinfectant wipes for quick sanitising of surfaces, equipment and high-touch areas. Individual wrap for convenience.',
    price: 2200,
    emoji: '🧼',
  },
  {
    slug: 'bin-liners-carton',
    name: 'Bin Liners',
    size: 'Carton (500 bags)',
    description: 'Heavy-duty bin liners in a range of sizes. Suitable for commercial waste bins, kitchens and general office use.',
    price: 3200,
    emoji: '🗑️',
  },
]

const CHEMICALS = [
  {
    slug: 'multi-surface-disinfectant-5l',
    name: 'Multi-Surface Disinfectant',
    size: '5 Litre',
    description: 'Broad-spectrum disinfectant effective against bacteria, viruses and fungi. Safe for use on most hard surfaces including benches, desks and equipment.',
    price: 4800,
    emoji: '🧪',
  },
  {
    slug: 'floor-cleaner-5l',
    name: 'Commercial Floor Cleaner',
    size: '5 Litre',
    description: 'Heavy-duty concentrated floor cleaner suitable for tiles, vinyl, concrete and sealed timber floors. Leaves a streak-free finish.',
    price: 5200,
    emoji: '🪣',
  },
  {
    slug: 'glass-window-cleaner-5l',
    name: 'Glass & Window Cleaner',
    size: '5 Litre',
    description: 'Streak-free glass and window cleaning solution. Fast-acting formula ideal for interior and exterior glass surfaces, mirrors and chrome.',
    price: 3800,
    emoji: '🪟',
  },
  {
    slug: 'bathroom-toilet-cleaner-5l',
    name: 'Bathroom & Toilet Cleaner',
    size: '5 Litre',
    description: 'Powerful acid-based cleaner for removing limescale, mineral deposits and soap scum from toilets, urinals, basins and tiles.',
    price: 4400,
    emoji: '🚽',
  },
  {
    slug: 'heavy-duty-degreaser-5l',
    name: 'Heavy-Duty Degreaser',
    size: '5 Litre',
    description: 'Industrial-strength degreaser for kitchens, workshop floors, machinery and cooking equipment. Cuts through grease and oil with minimal scrubbing.',
    price: 5800,
    emoji: '⚙️',
  },
  {
    slug: 'carpet-stain-remover-5l',
    name: 'Carpet Stain Remover',
    size: '5 Litre',
    description: 'Enzyme-based carpet and upholstery stain remover. Effective on coffee, food, ink and biological stains without damaging fibres.',
    price: 6200,
    emoji: '🧹',
  },
  {
    slug: 'stainless-steel-cleaner-1l',
    name: 'Stainless Steel Cleaner',
    size: '1 Litre',
    description: 'Polishing cleaner specifically formulated for stainless steel surfaces. Removes fingerprints, smears and light rust while leaving a protective shine.',
    price: 3600,
    emoji: '✨',
  },
  {
    slug: 'neutral-sanitiser-5l',
    name: 'Neutral Sanitiser',
    size: '5 Litre',
    description: 'pH-neutral sanitiser safe for food contact surfaces, commercial kitchens and childcare environments. TGA-listed formulation.',
    price: 4600,
    emoji: '🧫',
  },
]

export default function ShopPage() {
  return (
    <>
      <section className="bg-[#102a43] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">Shop</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">
            Professional-grade toiletries and cleaning chemicals available for purchase or bulk order.
            Delivered across Canberra and NSW.
          </p>
        </div>
      </section>

      {/* Order enquiry banner */}
      <div className="bg-[#d4a017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm font-medium text-[#102a43]">
          <span>Need a custom bulk order or can't find what you're looking for?</span>
          <a
            href="tel:0262281777"
            className="flex items-center gap-1.5 underline underline-offset-2 hover:no-underline whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" /> Call 02 6228 1777
          </a>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Toiletries */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Droplets className="w-6 h-6 text-[#d4a017]" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-[#102a43]">Toiletries & Hygiene</h2>
            </div>
            <p className="text-gray-500 text-sm mb-8 ml-9">
              Restroom consumables and hygiene products for commercial facilities.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOILETRIES.map((p) => (
                <ProductCard key={p.slug} product={p} category="Toiletries" />
              ))}
            </div>
          </div>

          {/* Chemicals */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShoppingCart className="w-6 h-6 text-[#d4a017]" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-[#102a43]">Cleaning Chemicals</h2>
            </div>
            <p className="text-gray-500 text-sm mb-8 ml-9">
              Professional-grade chemicals for commercial and industrial cleaning applications.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CHEMICALS.map((p) => (
                <ProductCard key={p.slug} product={p} category="Chemical" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ProductCard({
  product,
  category,
}: {
  product: { slug: string; name: string; size: string; description: string; price: number; emoji: string }
  category: string
}) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-[#d4a017] hover:shadow-md transition-all flex flex-col"
    >
      <div className="h-40 bg-gradient-to-br from-[#102a43] to-[#1e3a5f] flex items-center justify-center text-5xl">
        {product.emoji}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <span className="text-xs font-semibold text-[#d4a017] uppercase tracking-wider">{category}</span>
        <h3 className="font-bold text-[#102a43] mt-1 group-hover:text-[#d4a017] transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">{product.size}</p>
        <p className="text-sm text-gray-500 mt-2 flex-1 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-[#102a43]">
            ${(product.price / 100).toFixed(2)}
          </p>
          <span className="text-xs bg-[#102a43] text-white px-3 py-1 rounded-full group-hover:bg-[#d4a017] group-hover:text-[#102a43] transition-colors font-semibold">
            Order Now
          </span>
        </div>
      </div>
    </Link>
  )
}
