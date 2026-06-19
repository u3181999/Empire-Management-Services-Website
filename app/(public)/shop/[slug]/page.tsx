import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Phone, Mail, ShoppingCart } from 'lucide-react'
import type { Metadata } from 'next'

const ALL_PRODUCTS = [
  { slug: 'bulk-hand-soap-5l', name: 'Bulk Hand Soap', size: '5 Litre', category: 'Toiletries & Hygiene', description: 'Gentle antibacterial hand soap suitable for all skin types. Ideal for restroom dispensers in commercial and office environments. Compatible with most push-button and automatic dispensers. Available in fragrance-free and light-scent variants on request.', price: 4500, emoji: '🧴', details: ['Antibacterial formula', 'Compatible with most dispensers', 'Fragrance-free variant available', 'Bulk pricing on 10L+ orders'] },
  { slug: 'paper-hand-towels-carton', name: 'Paper Hand Towels', size: 'Carton (2,400 sheets)', category: 'Toiletries & Hygiene', description: 'Commercial-grade C-fold and interfold paper towels. Soft, absorbent and compatible with most wall-mount dispensers. Suitable for offices, schools, healthcare facilities and industrial sites.', price: 3800, emoji: '🧻', details: ['C-fold & interfold available', 'Dispenser compatible', '2-ply construction', 'Bulk carton pricing'] },
  { slug: 'toilet-paper-commercial-carton', name: 'Commercial Toilet Paper', size: 'Carton (48 rolls)', category: 'Toiletries & Hygiene', description: '2-ply commercial toilet paper rolls. Soft and strong — suitable for high-traffic restrooms in offices, retail and industrial sites. Standard 400-sheet roll or jumbo roll on request.', price: 4200, emoji: '🧻', details: ['2-ply, 400 sheets/roll', 'Jumbo roll available', 'High-traffic rated', 'Regular delivery schedules available'] },
  { slug: 'hand-sanitiser-5l', name: 'Hand Sanitiser', size: '5 Litre', category: 'Toiletries & Hygiene', description: '70% ethanol-based hand sanitiser. Hospital-grade formulation suitable for high-frequency use in commercial and healthcare environments. Refill for wall-mounted dispensers or table-top bottles.', price: 5500, emoji: '🤲', details: ['70% ethanol formulation', 'Hospital-grade', 'TGA listed', 'Dispenser refill compatible'] },
  { slug: 'sanitiser-wipes-200pk', name: 'Sanitiser Wipes', size: '200 Pack', category: 'Toiletries & Hygiene', description: 'Pre-moistened disinfectant wipes for quick sanitising of surfaces, equipment and high-touch areas. Individual wrap for convenience. Alcohol-based, fast-drying.', price: 2200, emoji: '🧼', details: ['Alcohol-based', 'Fast-drying formula', 'Individually packed', 'Kills 99.9% of germs'] },
  { slug: 'bin-liners-carton', name: 'Bin Liners', size: 'Carton (500 bags)', category: 'Toiletries & Hygiene', description: 'Heavy-duty bin liners in a range of sizes. Suitable for commercial waste bins, kitchens and general office use. Available in clear, black and coloured options for waste segregation.', price: 3200, emoji: '🗑️', details: ['Multiple sizes available', 'Heavy-duty construction', 'Clear, black & coloured options', 'Suitable for recycling segregation'] },
  { slug: 'multi-surface-disinfectant-5l', name: 'Multi-Surface Disinfectant', size: '5 Litre', category: 'Cleaning Chemicals', description: 'Broad-spectrum disinfectant effective against bacteria, viruses and fungi. Safe for use on most hard surfaces including benches, desks and equipment. Dilutable concentrate — one bottle makes up to 50L of ready-to-use solution.', price: 4800, emoji: '🧪', details: ['Broad-spectrum formula', 'Kills bacteria, viruses & fungi', 'Dilutable concentrate (1:10)', 'Safe on most hard surfaces'] },
  { slug: 'floor-cleaner-5l', name: 'Commercial Floor Cleaner', size: '5 Litre', category: 'Cleaning Chemicals', description: 'Heavy-duty concentrated floor cleaner suitable for tiles, vinyl, concrete and sealed timber floors. Leaves a streak-free finish. Dilutable for light maintenance or full-strength for deep cleans.', price: 5200, emoji: '🪣', details: ['Suitable for tiles, vinyl & concrete', 'Streak-free finish', 'Concentrated — dilute 1:20 for maintenance', 'Pleasant fresh fragrance'] },
  { slug: 'glass-window-cleaner-5l', name: 'Glass & Window Cleaner', size: '5 Litre', category: 'Cleaning Chemicals', description: 'Streak-free glass and window cleaning solution. Fast-acting formula ideal for interior and exterior glass surfaces, mirrors and chrome. No residue, no ammonia.', price: 3800, emoji: '🪟', details: ['Ammonia-free formula', 'No streaks or residue', 'Safe on tinted glass', 'Suitable for mirrors & chrome'] },
  { slug: 'bathroom-toilet-cleaner-5l', name: 'Bathroom & Toilet Cleaner', size: '5 Litre', category: 'Cleaning Chemicals', description: 'Powerful acid-based cleaner for removing limescale, mineral deposits and soap scum from toilets, urinals, basins and tiles. Fast-acting, fresh fragrance.', price: 4400, emoji: '🚽', details: ['Removes limescale & mineral deposits', 'Effective on soap scum', 'Fresh fragrance', 'Suitable for toilets, urinals & basins'] },
  { slug: 'heavy-duty-degreaser-5l', name: 'Heavy-Duty Degreaser', size: '5 Litre', category: 'Cleaning Chemicals', description: 'Industrial-strength degreaser for kitchens, workshop floors, machinery and cooking equipment. Cuts through grease and oil with minimal scrubbing. Safe on stainless steel and most metals.', price: 5800, emoji: '⚙️', details: ['Industrial-strength formula', 'Safe on stainless steel & metals', 'Suitable for commercial kitchens', 'Dilutable for lighter applications'] },
  { slug: 'carpet-stain-remover-5l', name: 'Carpet Stain Remover', size: '5 Litre', category: 'Cleaning Chemicals', description: 'Enzyme-based carpet and upholstery stain remover. Effective on coffee, food, ink and biological stains without damaging fibres. Safe for use with extraction machines.', price: 6200, emoji: '🧹', details: ['Enzyme-based formula', 'Safe on carpet fibres', 'Compatible with extraction machines', 'Effective on biological stains'] },
  { slug: 'stainless-steel-cleaner-1l', name: 'Stainless Steel Cleaner', size: '1 Litre', category: 'Cleaning Chemicals', description: 'Polishing cleaner specifically formulated for stainless steel surfaces. Removes fingerprints, smears and light rust while leaving a protective shine. Ideal for commercial kitchens and appliances.', price: 3600, emoji: '✨', details: ['Removes fingerprints & smears', 'Leaves protective shine', 'Suitable for commercial kitchens', 'Easy spray-and-wipe application'] },
  { slug: 'neutral-sanitiser-5l', name: 'Neutral Sanitiser', size: '5 Litre', category: 'Cleaning Chemicals', description: 'pH-neutral sanitiser safe for food contact surfaces, commercial kitchens and childcare environments. TGA-listed formulation that kills 99.99% of bacteria without rinsing required on food surfaces.', price: 4600, emoji: '🧫', details: ['pH-neutral formula', 'Food contact surface safe', 'TGA listed', 'No-rinse on food surfaces'] },
]

export async function generateMetadata(props: PageProps<'/shop/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const product = ALL_PRODUCTS.find((p) => p.slug === slug)
  if (!product) return {}
  return {
    title: `${product.name} — Shop`,
    description: product.description,
  }
}

export default async function ProductPage(props: PageProps<'/shop/[slug]'>) {
  const { slug } = await props.params
  const product = ALL_PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()

  return (
    <>
      <section className="bg-[#102a43] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
          <p className="text-[#d4a017] text-sm font-semibold uppercase tracking-wider">{product.category}</p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1">{product.name}</h1>
          <p className="text-gray-400 mt-1">{product.size}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Product visual */}
            <div className="h-80 bg-gradient-to-br from-[#102a43] to-[#1e3a5f] rounded-2xl flex items-center justify-center text-8xl shadow-lg">
              {product.emoji}
            </div>

            {/* Details */}
            <div>
              <p className="text-3xl font-bold text-[#d4a017]">
                ${(product.price / 100).toFixed(2)}
                <span className="text-base font-normal text-gray-400 ml-2">/ {product.size}</span>
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

              <ul className="mt-5 space-y-2">
                {product.details.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4a017] shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3">
                <a
                  href={`mailto:email@empirecleaning.com.au?subject=Order Enquiry — ${product.name}&body=Hi, I'd like to order: ${product.name} (${product.size})%0A%0AQuantity:%0ADelivery address:%0AContact name:%0APhone:`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#102a43] text-white font-bold rounded-lg hover:bg-[#0b1f31] transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Order via Email
                </a>
                <a
                  href="tel:0262281777"
                  className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#102a43] text-[#102a43] font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call to Order — 02 6228 1777
                </a>
                <a
                  href={`mailto:email@empirecleaning.com.au?subject=Bulk Quote — ${product.name}`}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm text-gray-500 hover:text-[#d4a017] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Request a bulk quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
