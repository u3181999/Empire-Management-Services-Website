'use client'

import { useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { Pause, Play } from 'lucide-react'

const CLIENTS = [
  { name: 'UNSW Canberra Campus',                  logo: '/clients/unsw.png'                  },
  { name: 'Hellenic Club',                         logo: '/clients/hellenic-club.webp'        },
  { name: 'CBRE',                                  logo: '/clients/cbre.png'                  },
  { name: 'JLL',                                   logo: '/clients/jll.png'                   },
  { name: 'Evri Group',                            logo: '/clients/evri-group.webp'           },
  { name: 'Velocity Conveyancing',                 logo: '/clients/velocity-conveyancing.svg' },
  { name: 'WOTSO Spaces',                          logo: '/clients/wotso.webp'                },
  { name: 'Pharmaceutical Society of Australia',   logo: '/clients/psa.png'                   },
  { name: 'APVMA',                                 logo: '/clients/apvma.webp'                },
  { name: 'ACT Cricket',                           logo: '/clients/act-cricket.png'           },
  { name: 'AFL Canberra',                          logo: '/clients/afl-canberra.png'          },
]

// Anyone whose device asks for reduced motion gets a still grid of logos instead of a moving strip.
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches

/** `decorative` is for the repeated second copy that makes the strip loop: hidden from screen readers. */
function ClientCard({ name, logo, decorative = false }: { name: string; logo: string; decorative?: boolean }) {
  const [imgFailed, setImgFailed] = useState(false)
  const abbr = name.split(' ').map(w => w[0]).join('').slice(0, 4).toUpperCase()

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 mx-6 w-36 shrink-0 group"
      aria-hidden={decorative || undefined}
    >
      <div className="w-20 h-20 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-2 group-hover:border-[#d4a017] group-hover:shadow-md transition-all">
        {!imgFailed ? (
          <Image
            src={logo}
            alt={decorative ? '' : name}
            width={64}
            height={64}
            className="object-contain w-full h-full"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="text-sm font-bold text-[#102a43]">{abbr}</span>
        )}
      </div>
      <p className="text-xs text-center text-gray-500 leading-tight group-hover:text-[#d4a017] transition-colors line-clamp-2">
        {name}
      </p>
    </div>
  )
}

export default function ClientsMarquee() {
  // The server renders the moving strip; a visitor who prefers reduced motion is switched to the still grid on load.
  const reduceMotion = useSyncExternalStore(subscribeToMotionPreference, prefersReducedMotion, () => false)
  const [paused, setPaused] = useState(false)

  return (
    <section className="py-16 bg-gray-50 overflow-hidden" aria-labelledby="clients-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2">
          Trusted By
        </p>
        <h2 id="clients-heading" className="text-2xl sm:text-3xl font-bold text-[#102a43]">
          Our Clients
        </h2>
        <p className="mt-3 text-gray-500 text-sm max-w-xl mx-auto">
          Proudly serving leading organisations across Canberra (ACT) and New South Wales for over 30 years.
        </p>
        {/* WCAG 2.2.2: anything that moves by itself for more than 5 seconds needs a way to pause it. */}
        {!reduceMotion && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-xs font-semibold text-[#102a43] transition-colors hover:border-[#d4a017] hover:text-gold-800"
          >
            {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
            {paused ? 'Resume logo scrolling' : 'Pause logo scrolling'}
          </button>
        )}
      </div>

      {reduceMotion ? (
        <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-y-8 px-4">
          {CLIENTS.map((client) => (
            <li key={client.name}>
              <ClientCard {...client} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* No inline style while running, so the CSS "pause on hover" still works; paused sets it explicitly. */}
          <div className="flex animate-marquee w-max" style={paused ? { animationPlayState: 'paused' } : undefined}>
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <ClientCard key={`${client.name}-${i}`} {...client} decorative={i >= CLIENTS.length} />
            ))}
          </div>
        </div>
      )}

      <p className="mt-8 px-4 text-center text-xs text-gray-600">
        Client logos are trademarks of their respective owners and are shown with their permission.
      </p>
    </section>
  )
}
