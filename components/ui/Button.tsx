import Link from 'next/link'
import { type ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'outline-light' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  external?: boolean
  icon?: ReactNode
  className?: string
  children: ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:       'bg-gold-500 text-navy-900 hover:bg-gold-400 font-bold',
  secondary:     'bg-navy-900 text-white hover:bg-navy-950 font-bold',
  outline:       'border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-semibold',
  'outline-light':'border-2 border-white text-white hover:bg-white hover:text-navy-900 font-semibold',
  ghost:         'text-navy-900 hover:bg-navy-900/10 font-semibold',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-5 py-2.5 text-sm min-h-[44px]',
  lg: 'px-7 py-3.5 text-base min-h-[52px]',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2'

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  icon,
  className = '',
  children,
  disabled,
  type = 'button',
  onClick,
}: ButtonProps) {
  const cls = [
    base,
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}{icon}
        </a>
      )
    }
    return <Link href={href} className={cls}>{children}{icon}</Link>
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls}>
      {children}{icon}
    </button>
  )
}
