'use client'

import { Trash2 } from 'lucide-react'
import { deleteProduct } from '@/app/actions/admin'
import { useTransition } from 'react'

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete(formData: FormData) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    startTransition(() => deleteProduct(formData))
  }

  return (
    <form action={handleDelete}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
      >
        <Trash2 className="w-3 h-3" />
        {isPending ? 'Deleting…' : 'Delete'}
      </button>
    </form>
  )
}
