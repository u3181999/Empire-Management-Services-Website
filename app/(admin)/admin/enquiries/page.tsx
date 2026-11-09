import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Enquiries & Applications — Admin' }

// Always read live data; this page lists people's contact details.
export const dynamic = 'force-dynamic'

const LIMIT = 100
const fmt = (d: Date) =>
  d.toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Australia/Canberra' })

function EmailBadge({ sent, error }: { sent: boolean; error: string | null }) {
  return sent ? (
    <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
      Emailed
    </span>
  ) : (
    <span
      title={error ?? 'The notification email was not sent'}
      className="inline-block rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
    >
      Email failed — follow up
    </span>
  )
}

export default async function AdminEnquiriesPage() {
  // The proxy already protects /admin, but this page lists personal details, so it checks too.
  const session = await auth()
  if (!session) redirect('/admin/login')

  const [enquiries, applications] = await Promise.all([
    prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: LIMIT }),
    prisma.jobApplication.findMany({ orderBy: { createdAt: 'desc' }, take: LIMIT }),
  ])

  const failed =
    enquiries.filter((e) => !e.emailSent).length + applications.filter((a) => !a.emailSent).length

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Enquiries &amp; Applications</h1>
        <p className="mt-1 text-sm text-gray-600">
          Every contact-form message and job application is saved here first, then emailed to the office.
          Enquiries are kept 12 months and applications 6 months, then deleted automatically.
        </p>
        {failed > 0 && (
          <p className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
            {failed} {failed === 1 ? 'item was' : 'items were'} saved but the notification email did not send. They
            are marked below — please follow them up, and check the email setup.
          </p>
        )}
      </div>

      <section aria-labelledby="enquiries-heading">
        <h2 id="enquiries-heading" className="mb-3 text-lg font-semibold text-gray-900">
          Contact enquiries <span className="text-sm font-normal text-gray-600">({enquiries.length})</span>
        </h2>
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  {['Received', 'From', 'Subject & message', 'Email'].map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 text-left font-medium text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e.id} className="border-b border-gray-50 align-top hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">{fmt(e.createdAt)}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{e.name}</p>
                      <a href={`mailto:${e.email}`} className="text-xs text-gray-600 underline">{e.email}</a>
                      {e.phone && <p className="text-xs text-gray-600">{e.phone}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{e.subject}</p>
                      <p className="mt-1 max-w-xl whitespace-pre-wrap text-gray-700">{e.message}</p>
                    </td>
                    <td className="px-4 py-3"><EmailBadge sent={e.emailSent} error={e.emailError} /></td>
                  </tr>
                ))}
                {enquiries.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-gray-600">No enquiries yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="applications-heading">
        <h2 id="applications-heading" className="mb-3 text-lg font-semibold text-gray-900">
          Job applications <span className="text-sm font-normal text-gray-600">({applications.length})</span>
        </h2>
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  {['Received', 'Applicant', 'Availability', 'Eligibility', 'Email'].map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 text-left font-medium text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a.id} className="border-b border-gray-50 align-top hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">{fmt(a.createdAt)}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{a.name}</p>
                      <a href={`mailto:${a.email}`} className="text-xs text-gray-600 underline">{a.email}</a>
                      <p className="text-xs text-gray-600">{a.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <p>{a.days}</p>
                      <p className="text-xs text-gray-600">Shift: {a.shift} · Start: {a.startDate}</p>
                      <p className="text-xs text-gray-600">Experience: {a.hasExperience ? 'Yes' : 'No'}</p>
                      {a.message && (
                        <details className="mt-1 text-xs">
                          <summary className="cursor-pointer text-gold-700 underline">Additional information</summary>
                          <p className="mt-1 max-w-md whitespace-pre-wrap text-gray-700">{a.message}</p>
                        </details>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <p>Citizen: {a.citizen}</p>
                      <p className="text-xs text-gray-600">Clearance: {a.clearance}</p>
                    </td>
                    <td className="px-4 py-3"><EmailBadge sent={a.emailSent} error={a.emailError} /></td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-gray-600">No applications yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
