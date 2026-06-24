import { type ReactNode } from 'react'

type BadgeVariant = 'gold' | 'navy' | 'success' | 'warning' | 'danger' | 'muted'

const variantClasses: Record<BadgeVariant, string> = {
  gold:    'bg-gold-500/20 text-gold-500',
  navy:    'bg-navy-900/10 text-navy-900',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger:  'bg-red-100 text-red-800',
  muted:   'bg-gray-100 text-gray-600',
}

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

export default function Badge({ variant = 'muted', children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
