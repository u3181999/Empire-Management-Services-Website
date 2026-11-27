import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui'
import type { SitePhoto } from '@/lib/photos'

/** A photo in a gallery. With `href` the whole tile is a link (and says where it goes with `linkLabel`). */
export type GalleryItem = SitePhoto & { href?: string; linkLabel?: string }

type Props = {
  id: string
  eyebrow: string
  heading: string
  subtext?: string
  /** Three or four photos. Four sit two-by-two on a phone; three stack. */
  photos: GalleryItem[]
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
          {photos.map((photo) => {
            const figure = (
              <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={four ? '(min-width: 1024px) 300px, 50vw' : '(min-width: 640px) 420px, 100vw'}
                  className={`object-cover ${
                    // Only a tile that can be clicked moves on hover.
                    photo.href
                      ? 'transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100'
                      : ''
                  }`}
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-[#0b1f31]/95 via-[#0b1f31]/60 to-transparent px-3 pb-2.5 pt-6 text-xs font-semibold text-white sm:px-4 sm:pb-3 sm:pt-10 sm:text-sm">
                  <span>
                    {/* A phone tile is small: a linked one shows just where it goes, so the picture stays visible. */}
                    <span className={photo.linkLabel ? 'hidden sm:block' : undefined}>{photo.caption}</span>
                    {photo.linkLabel && <span className="block text-xs font-semibold text-white sm:mt-0.5 sm:font-medium sm:text-gold-300">{photo.linkLabel}</span>}
                  </span>
                  {photo.href && <ArrowUpRight className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />}
                </figcaption>
              </figure>
            )
            return (
              <li key={photo.src}>
                {photo.href ? (
                  <Link
                    href={photo.href}
                    className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a017]"
                  >
                    {figure}
                  </Link>
                ) : (
                  figure
                )}
              </li>
            )
          })}
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
