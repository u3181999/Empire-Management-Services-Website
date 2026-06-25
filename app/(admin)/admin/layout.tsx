import AdminNav from '@/components/layout/AdminNav'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminNav />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
