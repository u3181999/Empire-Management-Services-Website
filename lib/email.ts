import { Resend } from 'resend'
import { COMPANY } from './constants'
import { SITE_DOMAIN } from './site'

let _resend: Resend | null = null

function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

/**
 * Resend does NOT throw when it rejects a message (bad API key, unverified domain, rate limit…);
 * it returns `{ data: null, error }`. Turn that into a real exception so callers can tell a
 * failed send from a successful one instead of silently treating both as success.
 */
async function deliver(payload: Parameters<Resend['emails']['send']>[0]) {
  const { data, error } = await getResend().emails.send(payload)
  if (error) throw new Error(`${error.name}: ${error.message}`)
  return data
}

const FROM = `${COMPANY.name} <noreply@${SITE_DOMAIN}>`
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? COMPANY.email

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// This email acknowledges a booking REQUEST only. A booking is not confirmed until staff confirm it in
// writing (see Terms §2), so the wording must never say "confirmed".
export async function sendBookingReceivedToCustomer({
  customerName,
  customerEmail,
  service,
  location,
  date,
  time,
  bookingRef,
}: {
  customerName: string
  customerEmail: string
  service: string
  location: string
  date: string
  time: string
  bookingRef: string
}) {
  return deliver({
    from: FROM,
    to: customerEmail,
    // noreply@ has no mailbox, so a customer who hits Reply is sent to the public contact address instead.
    replyTo: COMPANY.email,
    subject: `Booking Request Received – ${service} on ${date}`,
    html: `
      <h2>Booking Request Received</h2>
      <p>Hi ${escapeHtml(customerName)},</p>
      <p>Thank you — we have received your booking request. <strong>It is not confirmed yet.</strong> Here is what you asked for:</p>
      <ul>
        <li><strong>Service:</strong> ${escapeHtml(service)}</li>
        <li><strong>Location:</strong> ${escapeHtml(location)}</li>
        <li><strong>Requested date:</strong> ${escapeHtml(date)}</li>
        <li><strong>Requested time:</strong> ${escapeHtml(time)}</li>
        <li><strong>Reference:</strong> ${escapeHtml(bookingRef)}</li>
      </ul>
      <p>Our team will email or call you to confirm availability, usually within 1 business day. No booking is made until we confirm it in writing. If you have any questions, quote the reference above or call us on <strong>${COMPANY.phone}</strong>.</p>
      <p>Thank you for choosing ${COMPANY.name}.</p>
    `,
  })
}

export async function sendBookingNotificationToAdmin({
  customerName,
  customerEmail,
  customerPhone,
  service,
  location,
  date,
  time,
  notes,
  bookingRef,
}: {
  customerName: string
  customerEmail: string
  customerPhone: string
  service: string
  location: string
  date: string
  time: string
  notes?: string
  bookingRef: string
}) {
  return deliver({
    from: FROM,
    to: ADMIN_EMAIL,
    // Staff can press Reply to answer the customer directly (like the contact-form notification).
    replyTo: customerEmail,
    subject: `New Booking: ${service} – ${date} ${time}`,
    html: `
      <h2>New Booking Received</h2>
      <ul>
        <li><strong>Reference:</strong> ${escapeHtml(bookingRef)}</li>
        <li><strong>Customer:</strong> ${escapeHtml(customerName)}</li>
        <li><strong>Email:</strong> ${escapeHtml(customerEmail)}</li>
        <li><strong>Phone:</strong> ${escapeHtml(customerPhone)}</li>
        <li><strong>Service:</strong> ${escapeHtml(service)}</li>
        <li><strong>Location:</strong> ${escapeHtml(location)}</li>
        <li><strong>Date:</strong> ${escapeHtml(date)}</li>
        <li><strong>Time:</strong> ${escapeHtml(time)}</li>
        ${notes ? `<li><strong>Notes:</strong> ${escapeHtml(notes)}</li>` : ''}
      </ul>
    `,
  })
}

export async function sendContactEmail({
  name,
  email,
  phone,
  message,
  subject,
}: {
  name: string
  email: string
  phone?: string
  message: string
  subject: string
}) {
  return deliver({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `Contact Form: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(name)}</li>
        <li><strong>Email:</strong> ${escapeHtml(email)}</li>
        ${phone ? `<li><strong>Phone:</strong> ${escapeHtml(phone)}</li>` : ''}
        <li><strong>Subject:</strong> ${escapeHtml(subject)}</li>
      </ul>
      <h3>Message</h3>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `,
  })
}

export async function sendOrderConfirmation({
  customerName,
  customerEmail,
  orderNumber,
  items,
  total,
}: {
  customerName: string
  customerEmail: string
  orderNumber: string
  items: { name: string; quantity: number; price: number }[]
  total: number
}) {
  const itemsHtml = items
    .map((i) => `<li>${escapeHtml(i.name)} × ${i.quantity} — $${(i.price / 100).toFixed(2)}</li>`)
    .join('')

  return deliver({
    from: FROM,
    to: customerEmail,
    subject: `Order Confirmed – #${orderNumber}`,
    html: `
      <h2>Order Confirmed</h2>
      <p>Hi ${escapeHtml(customerName)}, thank you for your order!</p>
      <ul>${itemsHtml}</ul>
      <p><strong>Total: $${(total / 100).toFixed(2)}</strong></p>
      <p>Order number: <strong>#${escapeHtml(orderNumber)}</strong></p>
      <p>Questions? Contact us at ${COMPANY.email} or ${COMPANY.phone}.</p>
    `,
  })
}
