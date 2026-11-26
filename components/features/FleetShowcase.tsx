'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Pause, Play } from 'lucide-react'

// The first few seconds of the clip are trailers and a container, so it starts where the branded vehicles appear.
const START_SECONDS = 2.8

/**
 * The fleet photo and a short clip of the vehicles.
 *
 * The video does not play by itself and nothing is downloaded until someone presses play. It is always silent:
 * there are no built-in controls (so there is no volume button) and the sound track is muted in code.
 */
export default function FleetShowcase() {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function toggle() {
    const el = video.current
    if (!el) return
    if (el.paused) {
      el.muted = true
      if (el.currentTime < START_SECONDS || el.ended) el.currentTime = START_SECONDS
      void el.play().catch(() => setPlaying(false))
    } else {
      el.pause()
    }
  }

  return (
    <section className="bg-gray-50 py-16" aria-labelledby="fleet-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold-700">On the Road</p>
          <h2 id="fleet-heading" className="text-3xl font-bold text-[#102a43]">
            Our Fleet
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-[#d4a017]" />
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600">
            Our branded vehicles are a familiar part of how we look after sites across Canberra and the Region.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_300px]">
          <figure className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
            <Image
              src="/fleet/empire-fleet.webp"
              alt="A row of white Empire Management Services vehicles, with the blue and gold Empire logo on a utility and a van, parked in a yard under a cloudy evening sky"
              width={1400}
              height={1050}
              sizes="(min-width: 1024px) 880px, 100vw"
              className="h-auto w-full"
            />
          </figure>

          <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-2xl bg-[#102a43] shadow-lg ring-1 ring-gray-200">
            <video
              ref={video}
              className="h-full w-full object-cover"
              poster="/fleet/empire-fleet-video-poster.webp"
              preload="none"
              muted
              playsInline
              disablePictureInPicture
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onClick={toggle}
              aria-label="Video, without sound: a walk past the Empire Management Services vehicles parked in the yard"
            >
              <source src="/fleet/empire-fleet.mp4" type="video/mp4" />
              Your browser cannot play this video.
            </video>

            {/* One real button for mouse, touch and keyboard. It is large over the cover and small while playing. */}
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? 'Pause the fleet video' : 'Play the fleet video'}
              className={`absolute flex items-center justify-center rounded-full bg-[#d4a017] text-[#102a43] shadow-lg transition hover:bg-[#e8b81a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none ${
                playing ? 'bottom-3 right-3 h-11 w-11 opacity-90' : 'left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2'
              }`}
            >
              {playing ? (
                <Pause className="h-5 w-5 fill-current" aria-hidden="true" />
              ) : (
                <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
