'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, X, ChevronRight, Phone, ArrowRight } from 'lucide-react'
import { COMPANY, OFFICE_HOURS } from '@/lib/constants'

type Message = { from: 'bot' | 'user'; text: string }

const WELCOME: Message = {
  from: 'bot',
  text: "Hi! 👋 I'm the Empire Management Services assistant. How can I help you today?",
}

const FAQS = [
  { label: 'What services do you offer?', id: 'services' },
  { label: 'How do I make a booking?', id: 'booking' },
  { label: 'Where are you located?', id: 'location' },
  { label: 'What are your office hours?', id: 'hours' },
  { label: 'Are you ISO certified?', id: 'iso' },
  { label: 'Do you service NSW?', id: 'nsw' },
]

// Phone, address and hours come from lib/constants so the chatbot can never disagree with the rest of the site.
const FULL_ADDRESS = `${COMPANY.address}, ${COMPANY.suburb} ${COMPANY.state} ${COMPANY.postcode}`

const ANSWERS: Record<string, { text: string; cta?: { label: string; href: string } }> = {
  services: {
    text: 'We offer commercial & residential strata cleaning, strata management, government, medical centre, shopping centre, window cleaning, high-pressure cleaning, carpet cleaning, waste removal, car park sweeping, and graffiti removal.',
    cta: { label: 'View all services', href: '/services' },
  },
  booking: {
    text: `You can book online anytime using our booking form — just pick your service, location, and preferred time. Alternatively, call us on ${COMPANY.phone} and we'll get you sorted.`,
    cta: { label: 'Book now', href: '/booking' },
  },
  location: {
    text: `Our head office is at ${FULL_ADDRESS}. We also service clients across New South Wales.`,
    cta: { label: 'See locations', href: '/locations/canberra' },
  },
  hours: {
    text: `Our office hours — ${OFFICE_HOURS.weekdays}; ${OFFICE_HOURS.saturday}; ${OFFICE_HOURS.sunday}. You can submit an enquiry or booking online 24/7.`,
    cta: { label: 'Contact us', href: '/contact' },
  },
  iso: {
    text: 'Yes! Empire Management Services is ISO certified across three standards: ISO 9001:2015 (Quality), ISO 14001:2015 (Environmental), and ISO 45001:2018 (Health & Safety). Current certificates are available on request.',
    cta: { label: 'View certifications', href: '/compliance' },
  },
  nsw: {
    text: 'Absolutely — we service commercial clients across New South Wales, managed from our Canberra head office with the same professional standards.',
    cta: { label: 'NSW location', href: '/locations/nsw' },
  },
}

// Sits above the cookie banner (its height is published as --cookie-banner-h) so it never covers the banner's buttons.
const ABOVE_BANNER = (rem: number) => ({ bottom: `calc(${rem}rem + var(--cookie-banner-h, 0px))` })

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [asked, setAsked] = useState<Set<string>>(new Set())
  const bottomRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const fabRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  // Move focus into the chat when it opens and back to the launcher when it closes.
  useEffect(() => {
    if (open) panelRef.current?.focus()
    else if (wasOpen.current) fabRef.current?.focus()
    wasOpen.current = open
  }, [open])

  function handleFaq(id: string, label: string) {
    const answer = ANSWERS[id]
    if (!answer) return
    setAsked((prev) => new Set(prev).add(id))
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: label },
      { from: 'bot', text: answer.text },
    ])
  }

  const remaining = FAQS.filter((f) => !asked.has(f.id))

  return (
    <>
      {/* Floating button */}
      <button
        ref={fabRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        aria-controls="chat-panel"
        style={ABOVE_BANNER(1.5)}
        className="fixed right-6 z-50 w-14 h-14 rounded-full bg-[#d4a017] text-[#102a43] shadow-lg flex items-center justify-center hover:bg-[#e8b81a] transition-colors"
      >
        {open ? <X className="w-6 h-6" aria-hidden="true" /> : <MessageCircle className="w-6 h-6" aria-hidden="true" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          id="chat-panel"
          role="dialog"
          aria-label="Chat with Empire Support"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false)
          }}
          style={ABOVE_BANNER(6)}
          className="fixed right-6 z-50 w-80 sm:w-96 max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 bg-white max-h-[520px] focus:outline-none"
        >
          {/* Header */}
          <div className="bg-[#102a43] px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#d4a017] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-[#102a43]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Empire Support</p>
              <p className="text-gray-300 text-xs">Typically replies instantly</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-auto -mr-2 p-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Messages — announced politely as new answers arrive */}
          <div
            role="log"
            aria-live="polite"
            aria-label="Conversation"
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-[#102a43] text-white rounded-br-sm'
                      : 'bg-white text-gray-700 border border-gray-100 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {msg.text}
                  {/* Inline CTA for bot answers */}
                  {msg.from === 'bot' && i > 0 && (() => {
                    const userMsg = messages[i - 1]
                    if (userMsg?.from !== 'user') return null
                    const faq = FAQS.find((f) => f.label === userMsg.text)
                    if (!faq) return null
                    const cta = ANSWERS[faq.id]?.cta
                    if (!cta) return null
                    return (
                      <Link
                        href={cta.href}
                        className="mt-2 inline-flex items-center gap-1 py-1 text-gold-700 text-xs font-semibold underline underline-offset-2 hover:text-gold-800"
                        onClick={() => setOpen(false)}
                      >
                        {cta.label} <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </Link>
                    )
                  })()}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {remaining.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-100 bg-white space-y-1.5">
              <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Common questions
              </p>
              {remaining.slice(0, 3).map((faq) => (
                <button
                  key={faq.id}
                  type="button"
                  onClick={() => handleFaq(faq.id, faq.label)}
                  className="w-full flex items-center justify-between text-left text-sm text-gray-700 bg-gray-50 hover:bg-[#d4a017]/10 hover:text-[#102a43] rounded-lg px-3 py-2.5 transition-colors"
                >
                  {faq.label}
                  <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-100 bg-white flex items-center justify-between gap-3">
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 py-2 text-xs font-semibold text-[#102a43] hover:text-gold-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" /> {COMPANY.phone}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="py-2 text-xs font-semibold text-gold-700 underline underline-offset-2 hover:text-gold-800 flex items-center gap-1"
            >
              Send a message <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
