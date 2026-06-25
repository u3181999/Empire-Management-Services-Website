import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import { COMPANY, LOCATIONS } from '@/lib/constants'
import ContactForm from '@/components/features/ContactForm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with Empire Management Services. Phone: ${COMPANY.phone}. Address: ${COMPANY.address}, ${COMPANY.suburb} ACT.`,
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#102a43] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">Contact Us</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">
            We&apos;d love to hear from you. Get in touch for a free quote or any enquiries.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#102a43] mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#d4a017]/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#d4a017]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#102a43]">Head Office</p>
                    <p className="text-gray-600 text-sm mt-0.5">
                      {COMPANY.address}<br />
                      {COMPANY.suburb} {COMPANY.state} {COMPANY.postcode}<br />
                      {COMPANY.poBox}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#d4a017]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#d4a017]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#102a43]">Phone</p>
                    <a
                      href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                      className="text-gray-600 text-sm hover:text-[#d4a017] transition-colors"
                    >
                      {COMPANY.phone}
                    </a>
                    <p className="text-gray-500 text-xs mt-0.5">Fax: {COMPANY.fax}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#d4a017]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#d4a017]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#102a43]">Email</p>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-gray-600 text-sm hover:text-[#d4a017] transition-colors"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#d4a017]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#d4a017]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#102a43]">Office Hours</p>
                    <p className="text-gray-600 text-sm mt-0.5">
                      Monday – Friday: 7:00am – 5:00pm<br />
                      Saturday: By appointment<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Locations */}
              <h3 className="text-xl font-bold text-[#102a43] mt-10 mb-4">Service Locations</h3>
              <div className="space-y-3">
                {LOCATIONS.map((loc) => (
                  <Link
                    key={loc.id}
                    href={`/locations/${loc.id}`}
                    className="group flex items-start justify-between bg-gray-50 rounded-lg p-4 hover:bg-[#d4a017]/5 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-[#102a43] text-sm group-hover:text-[#d4a017] transition-colors">
                        {loc.name}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">{loc.address}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#d4a017] shrink-0 mt-0.5 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#102a43] mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
