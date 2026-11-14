import { prisma } from '@/lib/prisma'
import { updateBookingStatus, deleteBooking } from '@/app/actions/admin'
import DeleteButton from '@/components/features/DeleteButton'
import type { Metadata } from 'next'
import { requireAdminPage } from '@/lib/admin-guard'
import BookingStatusSelect from './BookingStatusSelect'

export const metadata: Metadata = { title: 'Bookings — Admin' }

const STATUSES = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as const

export default async function AdminBookingsPage(props: PageProps<'/admin/bookings'>) {
  await requireAdminPage()
  const searchParams = await props.searchParams
  const rawStatus = typeof searchParams?.status === 'string' ? searchParams.status : undefined
  const statusFilter = STATUSES.includes(rawStatus as typeof STATUSES[number])
    ? (rawStatus as typeof STATUSES[number])
    : undefined

  const bookings = await prisma.booking.findMany({
    where: statusFilter ? { status: statusFilter } : {},
    include: { service: true, location: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Bookings</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <a
          href="/admin/bookings"
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!statusFilter ? 'bg-[#102a43] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          All
        </a>
        {STATUSES.map((s) => (
          <a
            key={s}
            href={`/admin/bookings?status=${s}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${statusFilter === s ? 'bg-[#102a43] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            {s}
          </a>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Reference', 'Customer', 'Service', 'Location', 'Date & Time', 'Status', 'Actions'].map(
                  (h) => (
                    <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">
                    {b.reference.slice(0, 8)}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{b.customerName}</p>
                    <p className="text-gray-400 text-xs">{b.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{b.service.name}</td>
                  <td className="px-4 py-3 text-gray-600">{b.location.name}</td>
                  <td className="px-4 py-3 text-gray-600">
                    <p>{new Date(b.date).toLocaleDateString('en-AU', { timeZone: 'UTC' })}</p>
                    <p className="text-xs text-gray-400">{b.timeSlot}</p>
                  </td>
                  <td className="px-4 py-3">
                    <BookingStatusSelect
                      bookingId={b.id}
                      status={b.status}
                      customer={b.customerName}
                      action={updateBookingStatus}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      {b.notes && (
                        <details className="text-xs">
                          <summary className="cursor-pointer text-[#d4a017] hover:underline">Notes</summary>
                          <p className="mt-1 text-gray-600 whitespace-pre-wrap">{b.notes}</p>
                        </details>
                      )}
                      <DeleteButton
                        action={deleteBooking}
                        id={b.id}
                        confirmMessage={`Delete the booking from ${b.customerName} (${b.service.name})? This permanently removes it and cannot be undone.`}
                        className="rounded px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50 hover:underline disabled:opacity-40"
                      >
                        Delete<span className="sr-only"> booking from {b.customerName}</span>
                      </DeleteButton>
                    </div>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
