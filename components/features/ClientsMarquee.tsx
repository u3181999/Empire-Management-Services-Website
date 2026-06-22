'use client'

import { useState } from 'react'
import Image from 'next/image'

const CLIENTS = [
  { name: 'CBRE',                                  logo: '/clients/cbre.png'                  },
  { name: 'JLL',                                   logo: '/clients/jll.png'                   },
  { name: 'Evri Group',                            logo: '/clients/evri-group.webp'           },
  { name: 'Nikias Diamond',                        logo: '/clients/nikias-diamond.webp'       },
  { name: 'Velocity Conveyancing',                 logo: '/clients/velocity-conveyancing.svg' },
  { name: 'WOTSO Spaces',                          logo: '/clients/wotso.webp'                },
  { name: 'Canberra Isuzu',                        logo: '/clients/canberra-isuzu.png'        },
  { name: 'Pharmaceutical Society of Australia',   logo: '/clients/psa.png'                   },
  { name: 'APVMA',                                 logo: '/clients/apvma.webp'                },
  { name: 'ACT Cricket',                           logo: '/clients/act-cricket.svg'           },
  { name: 'AFL Canberra',                          logo: '/clients/afl-canberra.png'          },
]

function ClientCard({ name, logo }: { name: string; logo: string }) {
  const [imgFailed, setImgFailed] = useState(false)
  const abbr = name.split(' ').map(w => w[0]).join('').slice(0, 4).toUpperCase()

  return (
    <div className="flex flex-col items-center justify-center gap-3 mx-6 w-36 shrink-0 group">
      <div className="w-20 h-20 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-2 group-hover:border-[#d4a017] group-hover:shadow-md transition-all">
        {!imgFailed ? (
          <Image
            src={logo}
            alt={name}
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
  const doubled = [...CLIENTS, ...CLIENTS]

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#d4a017] mb-2">
          Trusted By
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#102a43]">
          Our Clients
        </h2>
        <p className="mt-3 text-gray-500 text-sm max-w-xl mx-auto">
          Proudly serving leading organisations across Canberra (ACT) and New South Wales for over 30 years.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee w-max">
          {doubled.map((client, i) => (
            <ClientCard key={`${client.name}-${i}`} {...client} />
          ))}
        </div>
      </div>
    </section>
  )
}
