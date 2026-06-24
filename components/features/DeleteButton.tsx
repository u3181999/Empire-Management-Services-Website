'use client'

import { useTransition } from 'react'

interface Props {
  action: (formData: FormData) => Promise<void>
  id: string
  confirmMessage?: string
  className?: string
  children: React.ReactNode
}

export default function DeleteButton({ action, id, confirmMessage = 'Are you sure?', className, children }: Props) {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm(confirmMessage)) return
    const fd = new FormData()
    fd.set('id', id)
    startTransition(() => action(fd))
  }

  return (
    <button type="button" onClick={handleClick} disabled={pending} className={className}>
      {children}
    </button>
  )
}
