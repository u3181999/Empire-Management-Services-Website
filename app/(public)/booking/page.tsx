import BookingForm from '@/components/features/BookingForm'
import { Phone, Mail } from 'lucide-react'
import { COMPANY } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Service',
  description: 'Book a commercial cleaning service online. Select your location, service type, and preferred time slot.',
}

export default function BookingPage() {
  return (
    <>
      <section className="bg-[#102a43] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">Book a Service</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">
            Complete the form below and our team will confirm your booking within 1 business day.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <BookingForm />
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-[#102a43]">Prefer to call?</h3>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                  className="mt-3 flex items-center gap-2 text-[#d4a017] font-semibold hover:underline"
                >
                  <Phone className="w-4 h-4" /> {COMPANY.phone}
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="mt-2 flex items-center gap-2 text-gray-600 text-sm hover:text-[#d4a017] transition-colors"
                >
                  <Mail className="w-4 h-4" /> {COMPANY.email}
                </a>
              </div>
              <div className="bg-[#102a43] text-white rounded-xl p-6">
                <h3 className="font-bold">What Happens Next?</h3>
                <ol className="mt-4 space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#d4a017] text-[#102a43] font-bold text-xs rounded-full flex items-center justify-center shrink-0">1</span>
                    Submit your booking request online
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#d4a017] text-[#102a43] font-bold text-xs rounded-full flex items-center justify-center shrink-0">2</span>
                    We confirm within 1 business day
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#d4a017] text-[#102a43] font-bold text-xs rounded-full flex items-center justify-center shrink-0">3</span>
                    Our team arrives at the agreed time
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#d4a017] text-[#102a43] font-bold text-xs rounded-full flex items-center justify-center shrink-0">4</span>
                    Work completed to your specification
                  </li>
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
