import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { type ReactNode } from 'react'

type AlertVariant = 'info' | 'success' | 'warning' | 'error'

const config: Record<AlertVariant, { classes: string; Icon: typeof Info }> = {
  info:    { classes: 'bg-blue-50 border-blue-200 text-blue-800',      Icon: Info },
  success: { classes: 'bg-green-50 border-green-200 text-green-800',   Icon: CheckCircle2 },
  warning: { classes: 'bg-yellow-50 border-yellow-200 text-yellow-800',Icon: AlertCircle },
  error:   { classes: 'bg-red-50 border-red-200 text-red-800',         Icon: XCircle },
}

interface AlertProps {
  variant?: AlertVariant
  title?: string
  children: ReactNode
  className?: string
}

export default function Alert({ variant = 'info', title, children, className = '' }: AlertProps) {
  const { classes, Icon } = config[variant]
  return (
    <div
      className={['flex gap-3 p-4 rounded-lg border', classes, className].filter(Boolean).join(' ')}
      role="alert"
    >
      <Icon className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
      <div className="text-sm">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        {children}
      </div>
    </div>
  )
}
