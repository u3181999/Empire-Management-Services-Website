import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { COMPANY, VALUES } from '@/lib/constants'
import type { Metadata } from 'next'

const TEAM = [
  {
    name: 'Alex',
    role: 'Founder & Chief Executive Officer (CEO)',
    bio: 'Alex founded Empire Management Services in 1995 with a vision to deliver commercial cleaning services built on integrity and results. With over 30 years at the helm, Alex has grown the company from a local Canberra operation to a trusted name across ACT and NSW, serving 80+ clients and maintaining relationships built on consistent, quality-driven outcomes.',
  },
  {
    name: 'Helen',
    role: 'Chief Finance Officer (CFO)',
    bio: 'Helen oversees the financial operations of Empire Management Services, ensuring fiscal discipline and sustainable growth. With a strong background in business finance, Helen plays a critical role in strategic planning, budgeting, and ensuring the company remains well-positioned to deliver value to both clients and staff.',
  },
  {
    name: 'Felicity Vercera',
    role: 'Operations Manager',
    bio: 'Felicity leads day-to-day operations across Empire\'s client sites, coordinating cleaning schedules, staff deployment, and quality assurance. Her attention to detail and hands-on management style ensure that every client receives consistent, high-standard service — on time, every time.',
  },
  {
    name: 'Rinzin Dorji',
    role: 'Supervisor',
    bio: 'Rinzin brings dedication and a keen eye for quality to his supervisory role. He works closely with cleaning teams on the ground, ensuring site standards are met, staff are supported, and client expectations are exceeded across all assigned locations.',
  },
  {
    name: 'Gregg O\'Brien',
    role: 'Supervisor',
    bio: 'Gregg is a dependable and experienced supervisor who takes pride in maintaining high standards across his sites. Known for his strong communication and problem-solving skills, Gregg ensures smooth daily operations and fosters a positive team environment.',
  },
]

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about Empire Management Services — ${COMPANY.yearsExperience}+ years of professional commercial cleaning in Canberra and NSW.`,
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#102a43] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">About Us</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">
            Over three decades of delivering quality, reliability and accountability to commercial clients
            across Canberra and NSW.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#102a43]">Our Story</h2>
              <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Empire Management Services has been operating for over {COMPANY.yearsExperience} years, building a
                  reputation centered on continuous improvement and customer-focused service delivery.
                </p>
                <p>
                  Our mission is simple: to provide customers with the exact cleaning and maintenance services
                  they require, while positioning ourselves as the cleaning industry&apos;s most cost-efficient
                  provider.
                </p>
                <p>
                  Today we serve over {COMPANY.clientCount} clients, representing the cleaning and servicing of over{' '}
                  {COMPANY.sitesM2.toLocaleString()}m² of office and commercial sites, with operations primarily
                  in Canberra and additional work across NSW.
                </p>
                <p>
                  We maintain constant communication with our clients through regular telephone and in-person
                  contact with an Operations Manager or Contract Coordinator — because we believe partnership
                  is the foundation of every great result.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: `${COMPANY.yearsExperience}+`, label: 'Years in Business' },
                { value: `${COMPANY.clientCount}+`, label: 'Active Clients' },
                { value: '100,000m²', label: 'Sites Cleaned' },
                { value: '2', label: 'States Serviced' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-[#102a43] text-white rounded-xl p-6 flex flex-col items-center justify-center text-center"
                >
                  <span className="text-3xl font-bold text-[#d4a017]">{value}</span>
                  <span className="mt-2 text-sm text-gray-300">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#102a43] text-center">Our Core Values</h2>
          <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
            Three pillars that define how we operate and why our clients keep coming back.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <CheckCircle2 className="w-8 h-8 text-[#d4a017] mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-[#102a43]">{v.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ISO Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-10">
            ISO Certified Commercial Cleaning Company
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
            {[
              { code: '9001:2015', label: 'QUALITY', color: '#1a5fa8', ring: '#1a5fa8' },
              { code: '14001:2015', label: 'ENVIRONMENTAL', color: '#2e7d32', ring: '#2e7d32' },
              { code: '45001:2018', label: 'HEALTH & SAFETY', color: '#b71c1c', ring: '#b71c1c' },
            ].map(({ code, label, color, ring }) => (
              <div key={code} className="flex flex-col items-center gap-3">
                {/* Badge */}
                <div
                  className="w-28 h-28 rounded-full flex flex-col items-center justify-center border-4 relative"
                  style={{ borderColor: ring, background: '#fff' }}
                >
                  <div
                    className="absolute inset-1 rounded-full flex flex-col items-center justify-center border-2"
                    style={{ borderColor: ring }}
                  >
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color }}>ISO</span>
                    <svg viewBox="0 0 24 24" className="w-7 h-7 my-0.5" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[9px] font-semibold tracking-wider text-gray-500 uppercase">Certified</span>
                  </div>
                </div>
                {/* Label */}
                <div className="text-center">
                  <p className="text-sm text-gray-500">ISO {code}</p>
                  <p className="text-sm font-bold" style={{ color }}>
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco-Friendly */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-green-700 bg-green-100 px-3 py-1 rounded-full mb-4">
                Eco-Friendly
              </span>
              <h2 className="text-3xl font-bold text-[#102a43]">
                We also provide tailored Eco-Friendly Cleaning Services
              </h2>
              <div className="mt-5 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At Empire Management Services, we are committed to delivering exceptional cleaning services
                  while protecting the health of our clients and the environment. We use environmentally
                  friendly cleaning methods and only utilise certified cleaning chemicals and high-quality
                  cleaning equipment that meet industry standards.
                </p>
                <p>
                  Our eco-conscious approach ensures effective cleaning and disinfection without compromising
                  safety, making our services suitable for homes, offices, healthcare settings, and commercial
                  facilities.
                </p>
                <p>
                  By choosing our services, you can enjoy a clean, healthy, and sustainable environment while
                  reducing your environmental footprint. We are dedicated to providing reliable, professional,
                  and responsible cleaning solutions that support a greener future.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🌿', title: 'Certified Chemicals', desc: 'Only eco-certified, biodegradable cleaning products used on every site.' },
                { icon: '♻️', title: 'Reduced Waste', desc: 'Waste minimisation practices embedded in every cleaning program.' },
                { icon: '🏥', title: 'Safe for All Settings', desc: 'Suitable for healthcare, offices, homes, and commercial facilities.' },
                { icon: '🌍', title: 'Greener Future', desc: 'Committed to responsible cleaning that supports environmental sustainability.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-white rounded-xl p-5 border border-green-100 shadow-sm">
                  <span className="text-2xl">{icon}</span>
                  <h4 className="font-bold text-[#102a43] mt-2 text-sm">{title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#102a43]">Meet the Team</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              The people behind Empire Management Services — experienced professionals committed to delivering excellence every day.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-gray-50 rounded-xl p-8 border border-gray-100 flex flex-col"
              >
                <div className="w-16 h-16 rounded-full bg-[#102a43] flex items-center justify-center mb-5 shrink-0">
                  <span className="text-[#d4a017] text-xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#102a43]">{member.name}</h3>
                <p className="text-sm font-medium text-[#d4a017] mt-0.5 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#102a43]">Quality Assurance</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            We have undertaken to develop, implement and maintain a practical but effective Quality Assurance
            System focused on achieving optimum quality and complete customer satisfaction.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Our commitment to quality means we regularly review and refine our processes, invest in the
            best equipment, and ensure our team receives ongoing training to maintain the highest standards.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a017] text-[#102a43] font-bold rounded-lg hover:bg-[#e8b81a] transition-colors"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
