import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import AdminNav from '@/components/layout/AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminNav />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
