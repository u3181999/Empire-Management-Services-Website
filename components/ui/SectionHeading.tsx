import { type ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  heading: ReactNode
  subtext?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export default function SectionHeading({
  eyebrow,
  heading,
  subtext,
  align = 'center',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <div className={[isCenter ? 'text-center' : '', className].filter(Boolean).join(' ')}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-2">
          {eyebrow}
        </p>
      )}
      <h2
        className={[
          'text-3xl sm:text-4xl font-bold',
          light ? 'text-white' : 'text-navy-900',
        ].join(' ')}
      >
        {heading}
      </h2>
      {subtext && (
        <p
          className={[
            'mt-4 text-sm leading-relaxed',
            isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl',
            light ? 'text-gray-300' : 'text-gray-600',
          ].join(' ')}
        >
          {subtext}
        </p>
      )}
    </div>
  )
}
