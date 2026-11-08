export const COMPANY = {
  name: 'Empire Management Services',
  tagline: 'Quality cleaning solutions for commercial and industrial clients',
  description:
    'With over 30 years of experience, Empire Management Services provides tailored cleaning and maintenance services to 80+ clients across 100,000m² of commercial sites throughout Canberra (ACT) and New South Wales.',
  email: 'email@empirecleaning.com.au',
  phone: '02 6228 1777',
  fax: '02 6228 1555',
  address: 'Unit 5, 89-91 Tennant Street',
  suburb: 'Fyshwick',
  state: 'ACT',
  postcode: '2609',
  poBox: 'PO Box 105 Fyshwick ACT 2609',
  abn: '89 117 860 009',
  founded: 1995,
  yearsExperience: 30,
  clientCount: 80,
  sitesM2: 100000,
} as const

export const LOCATIONS = [
  {
    id: 'canberra',
    name: 'Canberra (Head Office)',
    phone: '02 6228 1777',
    address: 'Unit 5, 89-91 Tennant Street, Fyshwick ACT 2609',
    email: 'email@empirecleaning.com.au',
    isHeadOffice: true,
  },
  {
    id: 'nsw',
    name: 'New South Wales',
    phone: '02 6228 1777',
    address: 'Servicing across NSW — contact head office',
    email: 'email@empirecleaning.com.au',
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
    icon: 'BuildingOffice',
    category: 'commercial',
  },
  {
    slug: 'industrial-cleaning',
    name: 'Industrial Cleaning',
    shortDescription: 'Heavy-duty cleaning solutions for warehouses, factories, and industrial sites.',
    icon: 'Factory',
    category: 'industrial',
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
    icon: 'Cross',
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
    icon: 'Wind',
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
    icon: 'Eraser',
    category: 'specialist',
  },
] as const

export const VALUES = [
  {
    title: 'Security',
    description:
      'All staff undergo security clearance checks and sign strict confidentiality agreements before working on any site.',
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
