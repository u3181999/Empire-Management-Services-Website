import { PrismaClient } from '../lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  console.log('🌱 Seeding database...')

  // Locations
  const locations = await Promise.all([
    prisma.location.upsert({
      where: { slug: 'canberra' },
      update: {},
      create: {
        name: 'Canberra (Head Office)',
        slug: 'canberra',
        phone: '02 6228 1777',
        address: 'Unit 5, 89-91 Tennant Street, Fyshwick ACT 2609',
        email: 'email@empirecleaning.com.au',
        isHeadOffice: true,
      },
    }),
    prisma.location.upsert({
      where: { slug: 'nsw' },
      update: {},
      create: {
        name: 'New South Wales',
        slug: 'nsw',
        phone: '02 6228 1777',
        address: 'Servicing across NSW — contact head office',
        email: 'email@empirecleaning.com.au',
      },
    }),
  ])

  // Services
  const serviceData = [
    { name: 'Commercial & Residential Strata', slug: 'commercial-residential-strata', shortDescription: 'Comprehensive strata cleaning for common areas, lobbies, and facilities.', category: 'commercial', sortOrder: 1 },
    { name: 'Commercial Buildings', slug: 'commercial-buildings', shortDescription: 'Full-service cleaning for offices, corporate buildings, and commercial spaces.', category: 'commercial', sortOrder: 2 },
    { name: 'Industrial Cleaning', slug: 'industrial-cleaning', shortDescription: 'Heavy-duty cleaning solutions for warehouses, factories, and industrial sites.', category: 'industrial', sortOrder: 3 },
    { name: 'Government Departments', slug: 'government-departments', shortDescription: 'Security-cleared cleaning teams for government buildings and sensitive sites.', category: 'government', sortOrder: 4 },
    { name: 'Medical Centres', slug: 'medical-centres', shortDescription: 'Infection-control compliant cleaning for clinics, hospitals, and healthcare facilities.', category: 'healthcare', sortOrder: 5 },
    { name: 'Shopping Centres', slug: 'shopping-centres', shortDescription: 'High-traffic retail cleaning including food courts, restrooms, and common areas.', category: 'retail', sortOrder: 6 },
    { name: 'Commercial Window Cleaning', slug: 'commercial-window-cleaning', shortDescription: 'Interior and exterior window cleaning for commercial buildings of all heights.', category: 'specialist', sortOrder: 7 },
    { name: 'High Pressure Cleaning', slug: 'high-pressure-cleaning', shortDescription: 'Powerful pressure washing for hard surfaces, driveways, and building exteriors.', category: 'specialist', sortOrder: 8 },
    { name: 'Waste Removal & Hygiene Services', slug: 'waste-removal-hygiene', shortDescription: 'Compliant waste management and hygiene consumable supply and maintenance.', category: 'specialist', sortOrder: 9 },
    { name: 'Carpet Cleaning', slug: 'carpet-cleaning', shortDescription: 'Deep steam cleaning and stain treatment for commercial carpets and rugs.', category: 'specialist', sortOrder: 10 },
    { name: 'Car Park & Warehouse Sweeping', slug: 'car-park-warehouse-sweeping', shortDescription: 'Mechanical sweeping and scrubbing for large-area hard floors and car parks.', category: 'industrial', sortOrder: 11 },
    { name: 'Graffiti Removal', slug: 'graffiti-removal', shortDescription: 'Fast and effective graffiti removal from all surface types with anti-graffiti coating.', category: 'specialist', sortOrder: 12 },
  ]

  const services = await Promise.all(
    serviceData.map((s) =>
      prisma.service.upsert({
        where: { slug: s.slug },
        update: {},
        create: s,
      })
    )
  )

  // Link all services to all locations
  for (const location of locations) {
    for (const service of services) {
      await prisma.locationService.upsert({
        where: { locationId_serviceId: { locationId: location.id, serviceId: service.id } },
        update: {},
        create: { locationId: location.id, serviceId: service.id },
      })
    }
  }

  // Blog categories
  const blogCategories = await Promise.all([
    prisma.blogCategory.upsert({
      where: { slug: 'cleaning-tips' },
      update: {},
      create: { name: 'Cleaning Tips', slug: 'cleaning-tips' },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'industry-news' },
      update: {},
      create: { name: 'Industry News', slug: 'industry-news' },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'company-news' },
      update: {},
      create: { name: 'Company News', slug: 'company-news' },
    }),
  ])

  // Sample blog posts
  await prisma.blogPost.upsert({
    where: { slug: 'why-regular-commercial-cleaning-matters' },
    update: {},
    create: {
      title: 'Why Regular Commercial Cleaning Matters for Your Business',
      slug: 'why-regular-commercial-cleaning-matters',
      excerpt: 'A clean workplace isn\'t just about appearances — it directly impacts staff productivity, client impressions, and even staff health outcomes.',
      content: `<p>A clean workplace isn't just about appearances — it directly impacts staff productivity, client impressions, and even staff health outcomes. Research consistently shows that employees in clean, well-maintained environments report higher job satisfaction and take fewer sick days.</p><h2>First Impressions Count</h2><p>Whether it's a client walking into your office lobby or a government inspector visiting your facility, the cleanliness of your premises sends an immediate signal about how you run your business. Empire Management Services ensures that first impression is always a positive one.</p><h2>Health and Safety</h2><p>Regular deep cleaning reduces the spread of bacteria and viruses, particularly in high-touch areas like reception desks, elevator buttons, and shared kitchens. This is especially critical in healthcare settings where infection control is paramount.</p><h2>Protecting Your Investment</h2><p>Regular professional cleaning extends the life of carpets, hard floors, and surfaces. The cost of prevention is always lower than the cost of replacement.</p>`,
      isPublished: true,
      publishedAt: new Date(),
      categoryId: blogCategories[0].id,
    },
  })

  await prisma.blogPost.upsert({
    where: { slug: 'choosing-commercial-cleaning-provider' },
    update: {},
    create: {
      title: '5 Things to Look For in a Commercial Cleaning Provider',
      slug: 'choosing-commercial-cleaning-provider',
      excerpt: 'Not all commercial cleaning companies are created equal. Here\'s what to look for when choosing a partner you can trust with your premises.',
      content: `<p>Choosing the right commercial cleaning provider is a significant business decision. Here are five key things to evaluate before signing a contract.</p><h2>1. Security Clearances</h2><p>If your business operates in a sensitive environment — government, medical, legal — ensure your cleaning provider can supply security-cleared staff. Empire Management Services maintains strict background check protocols for all personnel.</p><h2>2. Communication and Accountability</h2><p>The best providers assign you a dedicated account manager who is reachable by phone, not just email. Regular site inspections and quality reports should be standard.</p><h2>3. Flexibility</h2><p>Your cleaning schedule should fit your operations, not the other way around. Look for providers who can service your site during off-hours without extra cost.</p><h2>4. Insurance and Compliance</h2><p>Verify that any provider holds adequate public liability insurance and complies with all relevant workplace health and safety legislation.</p><h2>5. References and Track Record</h2><p>Ask for references from clients in similar industries. A provider with 30+ years of experience and 80+ active clients has a proven track record.</p>`,
      isPublished: true,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      categoryId: blogCategories[0].id,
    },
  })

  // Products — toiletries & chemicals
  const products = [
    { slug: 'bulk-hand-soap-5l',             name: 'Bulk Hand Soap',               price: 4500,  description: 'Gentle antibacterial hand soap suitable for all skin types. Ideal for restroom dispensers in commercial and office environments.' },
    { slug: 'paper-hand-towels-carton',      name: 'Paper Hand Towels',            price: 3800,  description: 'Commercial-grade C-fold and interfold paper towels. Carton of 2,400 sheets.' },
    { slug: 'toilet-paper-commercial-carton', name: 'Commercial Toilet Paper',     price: 4200,  description: '2-ply commercial toilet paper rolls. Carton of 48 rolls for high-traffic restrooms.' },
    { slug: 'hand-sanitiser-5l',             name: 'Hand Sanitiser',               price: 5500,  description: '70% ethanol hospital-grade hand sanitiser. 5 litre refill.' },
    { slug: 'sanitiser-wipes-200pk',         name: 'Sanitiser Wipes',              price: 2200,  description: 'Pre-moistened disinfectant wipes. Pack of 200.' },
    { slug: 'bin-liners-carton',             name: 'Bin Liners',                   price: 3200,  description: 'Heavy-duty bin liners in multiple sizes. Carton of 500.' },
    { slug: 'multi-surface-disinfectant-5l', name: 'Multi-Surface Disinfectant',   price: 4800,  description: 'Broad-spectrum disinfectant effective against bacteria, viruses and fungi. 5 litre concentrate.' },
    { slug: 'floor-cleaner-5l',              name: 'Commercial Floor Cleaner',     price: 5200,  description: 'Heavy-duty concentrated floor cleaner for tiles, vinyl and concrete. 5 litre.' },
    { slug: 'glass-window-cleaner-5l',       name: 'Glass & Window Cleaner',       price: 3800,  description: 'Ammonia-free streak-free glass and window cleaning solution. 5 litre.' },
    { slug: 'bathroom-toilet-cleaner-5l',    name: 'Bathroom & Toilet Cleaner',    price: 4400,  description: 'Acid-based cleaner for limescale, mineral deposits and soap scum. 5 litre.' },
    { slug: 'heavy-duty-degreaser-5l',       name: 'Heavy-Duty Degreaser',         price: 5800,  description: 'Industrial-strength degreaser for kitchens, workshops and machinery. 5 litre.' },
    { slug: 'carpet-stain-remover-5l',       name: 'Carpet Stain Remover',         price: 6200,  description: 'Enzyme-based carpet and upholstery stain remover. 5 litre.' },
    { slug: 'stainless-steel-cleaner-1l',    name: 'Stainless Steel Cleaner',      price: 3600,  description: 'Polishing cleaner for stainless steel surfaces. 1 litre spray.' },
    { slug: 'neutral-sanitiser-5l',          name: 'Neutral Sanitiser',            price: 4600,  description: 'pH-neutral TGA-listed sanitiser safe for food contact surfaces. 5 litre.' },
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, type: 'PHYSICAL' },
    })
  }

  // Admin user
  const hashedPassword = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!', 12)
  await prisma.admin.upsert({
    where: { email: 'admin@empirecleaning.com.au' },
    update: {},
    create: {
      email: 'admin@empirecleaning.com.au',
      password: hashedPassword,
      name: 'Empire Admin',
    },
  })

  console.log('✅ Seed complete.')
  console.log('   Admin login: admin@empirecleaning.com.au')
  console.log(`   Admin password: ${process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!'}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
