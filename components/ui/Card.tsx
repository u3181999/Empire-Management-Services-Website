import { type ReactNode } from 'react'

type CardVariant = 'default' | 'navy' | 'muted'
type CardPadding = 'sm' | 'md' | 'lg' | 'none'

interface CardProps {
  variant?: CardVariant
  padding?: CardPadding
  hover?: boolean
  className?: string
  children: ReactNode
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white border border-gray-100 shadow-sm',
  navy:    'bg-navy-900 text-white',
  muted:   'bg-gray-50 border border-gray-100',
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export default function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  children,
}: CardProps) {
  return (
    <div
      className={[
        'rounded-xl',
        variantClasses[variant],
        paddingClasses[padding],
        hover ? 'transition-all hover:border-gold-500 hover:shadow-md' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
