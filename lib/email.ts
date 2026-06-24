import { Resend } from 'resend'
import { COMPANY } from './constants'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = `${COMPANY.name} <noreply@empirecleaning.com.au>`
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? COMPANY.email

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function sendBookingConfirmationToCustomer({
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
  return resend.emails.send({
    from: FROM,
    to: customerEmail,
    subject: `Booking Confirmed – ${service} on ${date}`,
    html: `
      <h2>Booking Confirmed</h2>
      <p>Hi ${escapeHtml(customerName)},</p>
      <p>Your booking has been received. Here are the details:</p>
      <ul>
        <li><strong>Service:</strong> ${escapeHtml(service)}</li>
        <li><strong>Location:</strong> ${escapeHtml(location)}</li>
        <li><strong>Date:</strong> ${escapeHtml(date)}</li>
        <li><strong>Time:</strong> ${escapeHtml(time)}</li>
        <li><strong>Reference:</strong> ${escapeHtml(bookingRef)}</li>
      </ul>
      <p>Our team will be in touch to confirm your appointment. If you have any questions, call us on <strong>${COMPANY.phone}</strong>.</p>
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
  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
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
  return resend.emails.send({
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

  return resend.emails.send({
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
