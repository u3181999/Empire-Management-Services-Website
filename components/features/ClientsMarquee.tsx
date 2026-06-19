'use client'

import { useState } from 'react'
import Image from 'next/image'

const CLIENTS = [
  { name: 'UNSW Canberra Campus',                       domain: 'unsw.edu.au',                  abbr: 'UNSW' },
  { name: 'Hellenic Club',                              domain: 'hellenicclub.com.au',           abbr: 'HC'   },
  { name: 'Evri Group',                                 domain: 'evri.com.au',                  abbr: 'EG'   },
  { name: 'Nikias Diamond',                             domain: 'nikiasdiamond.com.au',          abbr: 'ND'   },
  { name: 'CBRE',                                       domain: 'cbre.com',                     abbr: 'CBRE' },
  { name: 'Velocity Conveyancing',                      domain: 'velocityconveyancing.com.au',  abbr: 'VC'   },
  { name: 'WOTSO Spaces',                               domain: 'wotso.com',                    abbr: 'WS'   },
  { name: 'Canberra Trucks Group',                      domain: 'canberratrucksgroup.com.au',   abbr: 'CTG'  },
  { name: 'Canberra Isuzu',                             domain: 'canberraisuzu.com.au',         abbr: 'CI'   },
  { name: 'MTP Services',                               domain: 'mtpservices.com.au',            abbr: 'MTP'  },
  { name: 'Pharmaceutical Society of Australia',        domain: 'psa.org.au',                   abbr: 'PSA'  },
  { name: 'APVMA',                                      domain: 'apvma.gov.au',                 abbr: 'APV'  },
  { name: 'ACT Cricket',                                domain: 'actcricket.com.au',            abbr: 'ACT'  },
  { name: 'AFL Canberra',                               domain: 'aflcanberra.com.au',           abbr: 'AFL'  },
]

function ClientCard({ name, domain, abbr }: { name: string; domain: string; abbr: string }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center gap-3 mx-6 w-36 shrink-0 group">
      <div className="w-20 h-20 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-2 group-hover:border-[#d4a017] group-hover:shadow-md transition-all">
        {!imgFailed ? (
          <Image
            src={`https://logo.clearbit.com/${domain}`}
            alt={name}
            width={64}
            height={64}
            className="object-contain w-full h-full"
            onError={() => setImgFailed(true)}
            unoptimized
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
          Proudly serving leading organisations across Canberra, NSW and QLD for over 30 years.
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee w-max">
          {doubled.map((client, i) => (
            <ClientCard key={`${client.domain}-${i}`} {...client} />
          ))}
        </div>
      </div>
    </section>
  )
}
