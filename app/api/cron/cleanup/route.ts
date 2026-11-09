import { timingSafeEqual } from 'node:crypto'
import { prisma } from '@/lib/prisma'

// Daily retention clean-up (scheduled in vercel.json). Keeps us to what the Privacy Policy promises:
//   - contact enquiries: 12 months
//   - employment applications: 6 months
//   - spam-guard hit rows: 2 days (only ever needed for the rate-limit window)
// Vercel calls this with `Authorization: Bearer $CRON_SECRET`; anything else is refused.

export const dynamic = 'force-dynamic'

function monthsAgo(months: number) {
  const d = new Date()
  d.setMonth(d.getMonth() - months)
  return d
}

function isAuthorised(header: string | null) {
  const secret = process.env.CRON_SECRET
  if (!secret || !header) return false // fail closed when no secret is configured
  const expected = Buffer.from(`Bearer ${secret}`)
  const given = Buffer.from(header)
  return given.length === expected.length && timingSafeEqual(given, expected)
}

export async function GET(request: Request) {
  if (!isAuthorised(request.headers.get('authorization'))) {
    return new Response('Unauthorized', { status: 401 })
  }

  const [enquiries, applications, formHits] = await Promise.all([
    prisma.enquiry.deleteMany({ where: { createdAt: { lt: monthsAgo(12) } } }),
    prisma.jobApplication.deleteMany({ where: { createdAt: { lt: monthsAgo(6) } } }),
    prisma.formHit.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) } } }),
  ])

  return Response.json({
    ok: true,
    deleted: { enquiries: enquiries.count, applications: applications.count, formHits: formHits.count },
  })
}
