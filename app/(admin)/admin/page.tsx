import { prisma } from '@/lib/prisma'
import { Calendar, ShoppingBag, FileText } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Dashboard' }

export default async function AdminDashboard() {
  const [bookingCount, orderCount, postCount, pendingBookings] = await Promise.all([
    prisma.booking.count(),
    prisma.order.count({ where: { status: 'PAID' } }),
    prisma.blogPost.count({ where: { isPublished: true } }),
    prisma.booking.count({ where: { status: 'PENDING' } }),
  ])

  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { service: true, location: true },
  })

  const stats = [
    { label: 'Total Bookings', value: bookingCount, icon: Calendar, color: 'text-blue-600 bg-blue-50' },
    { label: 'Pending Bookings', value: pendingBookings, icon: Calendar, color: 'text-orange-600 bg-orange-50' },
    { label: 'Orders (Paid)', value: orderCount, icon: ShoppingBag, color: 'text-green-600 bg-green-50' },
    { label: 'Published Posts', value: postCount, icon: FileText, color: 'text-purple-600 bg-purple-50' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-900">Recent Bookings</h2>
          <a href="/admin/bookings" className="text-sm text-[#d4a017] hover:underline">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-medium">Customer</th>
                <th className="text-left py-2 text-gray-500 font-medium">Service</th>
                <th className="text-left py-2 text-gray-500 font-medium">Date</th>
                <th className="text-left py-2 text-gray-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id} className="border-b border-gray-50">
                  <td className="py-3 text-gray-900">{b.customerName}</td>
                  <td className="py-3 text-gray-600">{b.service.name}</td>
                  <td className="py-3 text-gray-600">
                    {new Date(b.date).toLocaleDateString('en-AU')}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">No bookings yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
  }
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}
