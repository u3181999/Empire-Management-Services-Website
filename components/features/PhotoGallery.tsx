import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import type { SitePhoto } from '@/lib/photos'

type Props = {
  id: string
  eyebrow: string
  heading: string
  subtext?: string
  /** Three or four photos. Four sit two-by-two on a phone; three stack. */
  photos: SitePhoto[]
  cta?: { href: string; label: string }
}

/** A row of the company's own photos, each with a short caption over a navy fade. */
export default function PhotoGallery({ id, eyebrow, heading, subtext, photos, cta }: Props) {
  const four = photos.length === 4
  return (
    <section className="border-t border-gray-100 bg-white py-16" aria-labelledby={id}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold-700">{eyebrow}</p>
          <h2 id={id} className="text-3xl font-bold text-[#102a43]">
            {heading}
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-[#d4a017]" />
          {subtext && <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600">{subtext}</p>}
        </div>

        <ul className={`grid gap-3 sm:gap-4 ${four ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'}`}>
          {photos.map((photo) => (
            <li key={photo.src}>
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={four ? '(min-width: 1024px) 300px, 50vw' : '(min-width: 640px) 400px, 100vw'}
                  className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1f31]/95 via-[#0b1f31]/60 to-transparent px-3 pb-2.5 pt-8 text-xs font-semibold text-white sm:px-4 sm:pb-3 sm:text-sm">
                  {photo.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {cta && (
          <div className="mt-8 text-center">
            <Button href={cta.href} variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
