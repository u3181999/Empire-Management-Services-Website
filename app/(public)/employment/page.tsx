import EmploymentForm from '@/components/features/EmploymentForm'
import { CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Employment',
  description:
    'Join the Empire Management Services team. Apply now for cleaning positions across Canberra, NSW and Queensland.',
}

const BENEFITS = [
  'Competitive rates and regular paid work',
  'Flexible shift times — AM and PM shifts available',
  'Training and induction provided',
  'Work across a variety of prestigious commercial sites',
  'Join a reliable, professional team with 30+ years of experience',
]

export default function EmploymentPage() {
  return (
    <>
      <section className="bg-[#102a43] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">Join Our Team</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">
            We&apos;re always looking for reliable, hardworking people to join the Empire Management Services team
            across Canberra, NSW and Queensland.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#102a43] mb-6">Why Work With Us?</h2>
              <ul className="space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d4a017] mt-0.5 shrink-0" />
                    <span className="text-gray-600">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-[#102a43] mb-3">What We Look For</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Reliable and punctual</li>
                  <li>• Attention to detail</li>
                  <li>• Ability to pass a security clearance check</li>
                  <li>• Previous cleaning experience (preferred but not required)</li>
                  <li>• Flexible availability across AM and PM shifts</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#102a43] mb-6">Apply Now</h2>
              <EmploymentForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
