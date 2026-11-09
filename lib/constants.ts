export const COMPANY = {
  name: 'Empire Management Services',
  tagline: 'Quality cleaning solutions for commercial and industrial clients',
  description:
    'With over 30 years of experience, Empire Management Services provides tailored cleaning and maintenance services to 80+ clients across 100,000m² of commercial sites throughout Canberra (ACT) and New South Wales.',
  email: 'admin@empirecleaning.com.au',
  phone: '02 6228 1777',
  fax: '02 6228 1555',
  address: 'Unit 5, 89-91 Tennant Street',
  suburb: 'Fyshwick',
  state: 'ACT',
  postcode: '2609',
  poBox: 'PO Box 105 Fyshwick ACT 2609',
  // Registered entity for ABN 89 117 860 009 (ABN Lookup); "Empire Management Services" is its registered business name.
  legalName: 'Ergatis Services Pty Ltd',
  abn: '89 117 860 009',
  founded: 1995,
  yearsExperience: 30,
  clientCount: 80,
  sitesM2: 100000,
  staffCount: 100,
  weeklyHours: 2500,
  // Head office position (89-91 Tennant St, Fyshwick): used by the map and the structured data.
  geo: { latitude: -35.3273894, longitude: 149.1860957 },
  // A link is shown (footer icon and search-engine data) only when its address is filled in. Checked 9 Nov 2026:
  // the old Facebook address (facebook.com/empirecleaningservices) says "content isn't available", so it is blank
  // until the real page address is added here. Confirm the LinkedIn page is yours: it lists the website
  // empiremanagementservices.com.au, not this site's address.
  social: {
    facebook: '' as string,
    linkedin: 'https://www.linkedin.com/company/empire-management-services' as string,
  },
} as const

// Head-office hours. Used by the location page and the chatbot so they cannot drift apart.
export const OFFICE_HOURS = {
  weekdays: 'Monday – Friday: 7:00am – 5:00pm',
  saturday: 'Saturday: By appointment',
  sunday: 'Sunday: Closed',
  // The same weekday hours in machine-readable form (structured data). Keep in step with `weekdays` above.
  schema: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '17:00',
  },
} as const

export const LOCATIONS = [
  {
    id: 'canberra',
    name: 'Canberra (Head Office)',
    phone: '02 6228 1777',
    address: 'Unit 5, 89-91 Tennant Street, Fyshwick ACT 2609',
    email: 'admin@empirecleaning.com.au',
    isHeadOffice: true,
  },
  {
    id: 'nsw',
    name: 'New South Wales',
    phone: '02 6228 1777',
    address: 'Servicing across NSW — contact head office',
    email: 'admin@empirecleaning.com.au',
    isHeadOffice: false,
  },
] as const

export const SERVICES = [
  {
    slug: 'commercial-residential-strata',
    name: 'Commercial & Residential Strata',
    shortDescription: 'Comprehensive strata cleaning for common areas, lobbies, and facilities.',
    icon: 'Building2',
    category: 'commercial',
  },
  {
    slug: 'commercial-buildings',
    name: 'Commercial Buildings',
    shortDescription: 'Full-service cleaning for offices, corporate buildings, and commercial spaces.',
    icon: 'Building',
    category: 'commercial',
  },
  {
    slug: 'strata-management',
    name: 'Strata Management',
    // Wording to confirm with the business: say only what Empire really provides (see CLAIMS.md).
    shortDescription: 'Practical support for strata schemes, from common-property upkeep to contractor coordination.',
    icon: 'ClipboardCheck',
    category: 'commercial',
  },
  {
    slug: 'government-departments',
    name: 'Government Departments',
    shortDescription: 'Security-cleared cleaning teams for government buildings and sensitive sites.',
    icon: 'Landmark',
    category: 'government',
  },
  {
    slug: 'medical-centres',
    name: 'Medical Centres',
    shortDescription: 'Infection-control compliant cleaning for clinics, hospitals, and healthcare facilities.',
    icon: 'Stethoscope',
    category: 'healthcare',
  },
  {
    slug: 'shopping-centres',
    name: 'Shopping Centres',
    shortDescription: 'High-traffic retail cleaning including food courts, restrooms, and common areas.',
    icon: 'ShoppingBag',
    category: 'retail',
  },
  {
    slug: 'commercial-window-cleaning',
    name: 'Commercial Window Cleaning',
    shortDescription: 'Interior and exterior window cleaning for commercial buildings of all heights.',
    icon: 'Sparkles',
    category: 'specialist',
  },
  {
    slug: 'high-pressure-cleaning',
    name: 'High Pressure Cleaning',
    shortDescription: 'Powerful pressure washing for hard surfaces, driveways, and building exteriors.',
    icon: 'Droplets',
    category: 'specialist',
  },
  {
    slug: 'waste-removal-hygiene',
    name: 'Waste Removal & Hygiene Services',
    shortDescription: 'Compliant waste management and hygiene consumable supply and maintenance.',
    icon: 'Recycle',
    category: 'specialist',
  },
  {
    slug: 'carpet-cleaning',
    name: 'Carpet Cleaning',
    shortDescription: 'Deep steam cleaning and stain treatment for commercial carpets and rugs.',
    icon: 'Brush',
    category: 'specialist',
  },
  {
    slug: 'car-park-warehouse-sweeping',
    name: 'Car Park & Warehouse Sweeping',
    shortDescription: 'Mechanical sweeping and scrubbing for large-area hard floors and car parks.',
    icon: 'Car',
    category: 'industrial',
  },
  {
    slug: 'graffiti-removal',
    name: 'Graffiti Removal',
    shortDescription: 'Fast and effective graffiti removal from all surface types with anti-graffiti coating.',
    icon: 'SprayCan',
    category: 'specialist',
  },
] as const

export const VALUES = [
  {
    title: 'Security',
    description:
      'All staff are police-checked and sign strict confidentiality agreements before working on any site. Security-cleared teams are available for government and other sensitive sites.',
  },
  {
    title: 'Reliability',
    description:
      'We show up, every time. Our clients count on consistent, dependable service delivery to keep their operations running smoothly.',
  },
  {
    title: 'Accountability',
    description:
      'Clear lines of responsibility and regular communication through Operations Managers and Contract Coordinators ensure quality outcomes.',
  },
] as const

// Employment application: options for the eligibility questions (used by the form and validated on the server).
export const SECURITY_CLEARANCES = ['None', 'Police Check', 'Baseline', 'NV1', 'NV2', 'PV'] as const

// Option lists shared by the public forms and checked again on the server.
export const CONTACT_SUBJECTS = [
  'General Enquiry',
  'Request a Quote',
  'Booking Enquiry',
  'Compliance Documents',
  'Employment',
  'Complaint or Feedback',
  'Other',
] as const
export const WORK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const
export const SHIFT_OPTIONS = ['AM', 'PM', 'Either'] as const

// What we can show clients on request (see CLAIMS.md). The certificate details are optional: fill in
// certifiedBy / certificateNumber / validUntil only with the real values from the certificate, and the
// Certifications & Compliance page will show them. Never add a credential here that we cannot document.
export type Credential = {
  code: string
  name: string
  summary: string
  certifiedBy?: string
  certificateNumber?: string
  validUntil?: string
}

export const MANAGEMENT_STANDARDS: Credential[] = [
  {
    code: 'ISO 9001:2015',
    name: 'Quality management',
    summary: 'How we plan, deliver, audit and continually improve the quality of our cleaning services.',
  },
  {
    code: 'ISO 14001:2015',
    name: 'Environmental management',
    summary: 'How we manage chemicals, waste and our environmental impact on every site.',
  },
  {
    code: 'ISO 45001:2018',
    name: 'Occupational health & safety',
    summary: 'How we keep our people, your staff and your visitors safe, and keep us OH&S compliant.',
  },
]

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Employment', href: '/employment' },
  { label: 'Contact', href: '/contact' },
] as const

export const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00',
] as const
