// The long-form copy for each service page (intro, how often, questions, related services).
// The short lists ("What's included", "Suitable for") stay in app/(public)/services/[slug]/page.tsx.
//
// Rules for editing this file (see CLAIMS.md): say only what Empire really does. No client names, no numbers, no
// guarantees. Where something depends on the site, say "we will agree it with you" rather than promising it.

export type ServiceFaq = { q: string; a: string }

export type ServiceContent = {
  /** One short paragraph, written for the buyer. Shown under the page heading. */
  intro: string
  /** What a typical frequency looks like, and that it is tailored. */
  frequency: string
  faqs: ServiceFaq[]
  /** Slugs of up to three services that are often bought together. */
  related: [string, string, string]
}

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'commercial-residential-strata': {
    intro:
      "Common property is what residents and visitors judge a building by: the lobby, lifts, stairwells, corridors, bins and car park. We clean and look after these shared areas for residential, mixed-use and commercial strata schemes, on a schedule agreed with your committee or strata manager.",
    frequency:
      "Many schemes choose a weekly or several-times-a-week program for common areas, with less frequent jobs such as windows, carpets and pressure cleaning scheduled around it. We will suggest a mix once we know the size and use of your building.",
    faqs: [
      {
        q: 'Do you work with our strata manager or committee?',
        a: 'Yes. We work alongside your strata manager and committee, and agree the scope and schedule with whoever manages the scheme.',
      },
      {
        q: 'Can the program cover more than regular cleaning?',
        a: 'Yes. Common-area cleaning can be combined with window cleaning, carpet cleaning, high pressure cleaning, waste removal and graffiti removal, so one team looks after the building.',
      },
      {
        q: 'How do we get a price?',
        a: 'Tell us about the building and how often you would like it cleaned, and we will come back with a quote for your site.',
      },
    ],
    related: ['building-management', 'carpet-cleaning', 'commercial-window-cleaning'],
  },

  'commercial-buildings': {
    intro:
      'A clean workplace supports health, first impressions and the people who work in it. We provide full-service cleaning for offices, corporate buildings and multi-tenanted commercial spaces, planned around your working hours so your people are not disturbed.',
    frequency:
      'Offices are commonly cleaned daily or several times a week, often after hours, with periodic jobs such as carpets and windows added to the cycle. The right mix depends on how many people use the space and how it is used.',
    faqs: [
      {
        q: 'Can you clean outside business hours?',
        a: 'Yes. After-hours cleaning is available, so the work is done with minimal disruption. We will agree times that suit your building.',
      },
      {
        q: 'Can you look after consumables such as soap and paper towel?',
        a: 'Yes. Consumable supply and management can be part of the program. Tell us what you would like us to look after.',
      },
      {
        q: 'Who do we talk to day to day?',
        a: 'Your building has a dedicated account manager as the point of contact.',
      },
    ],
    related: ['carpet-cleaning', 'commercial-window-cleaning', 'waste-removal-hygiene'],
  },

  'building-management': {
    intro:
      'Keeping a building running means many small jobs and several contractors. Our building management gives you one point of contact for day-to-day upkeep, coordination of cleaning and maintenance, and regular site inspections.',
    frequency:
      'Building management is usually set up as an ongoing arrangement with regular inspections. We will agree how often with you, based on the size and needs of the building.',
    faqs: [
      {
        q: 'Is this the same as strata management?',
        a: 'No. We provide building management: the practical upkeep of the building and the coordination of cleaning, maintenance and contractors. Strata management is a separate service provided by a strata managing agent, and we can work alongside yours.',
      },
      {
        q: 'What do the site inspections cover?',
        a: 'Inspections look at the condition and cleanliness of the building and its common areas, with reports to the building owner or manager.',
      },
      {
        q: 'What happens when something needs attention?',
        a: 'We respond promptly to building and common-area issues. Tell us what you expect and we will agree how requests are raised and handled.',
      },
    ],
    related: ['commercial-buildings', 'graffiti-removal', 'high-pressure-cleaning'],
  },

  'eco-friendly-cleaning': {
    intro:
      'Cleaning should protect the health of the people in a building and the environment around it. Our eco-friendly cleaning uses certified green cleaning chemicals, environmentally friendly methods and waste minimisation, without compromising cleaning and disinfection.',
    frequency:
      'Eco-friendly cleaning is delivered as part of your regular program, so the frequency follows your cleaning schedule. Tell us what you clean now and we will explain how it fits.',
    faqs: [
      {
        q: 'What makes the chemicals "green"?',
        a: "We use green cleaning chemicals from our registered supplier, including Agar's Green Cleaning Range, which Agar states is independently certified by Good Environmental Choice Australia (GECA).",
      },
      {
        q: 'Is it as effective as conventional cleaning?',
        a: 'The aim is effective cleaning and disinfection without compromising safety. Chemicals and methods are chosen to be responsible and to do the job.',
      },
      {
        q: 'Can we add it to our existing cleaning?',
        a: 'Yes. Tell us about your site and we will explain how eco-friendly cleaning can be built into your current program.',
      },
    ],
    related: ['commercial-buildings', 'medical-centres', 'waste-removal-hygiene'],
  },

  'government-departments': {
    intro:
      'Government and other sensitive sites need cleaning teams who understand security, confidentiality and audit expectations. We clean government departments and similar environments, with security-cleared teams available where a site requires them.',
    frequency:
      'Hours and frequency follow your operations, often daily and after hours for offices. We will set the schedule around your access and security rules.',
    faqs: [
      {
        q: 'Are all of your staff security-cleared?',
        a: 'No. Screening is matched to each site: background and police checks, and security clearances where a client requires them. Security-cleared teams are available for sites that need them.',
      },
      {
        q: 'Can you provide our certifications and insurance details?',
        a: 'Yes. Certifications and insurance information are available on request, and every site has a written Site Duty Statement. See our Certifications & Compliance page.',
      },
      {
        q: 'Can you clean around our operational hours?',
        a: 'Yes. Scheduling is planned around your operational hours and any access restrictions.',
      },
    ],
    related: ['commercial-buildings', 'carpet-cleaning', 'waste-removal-hygiene'],
  },

  'medical-centres': {
    intro:
      'Clinics and healthcare facilities need cleaning that supports infection control as well as appearance. We clean medical centres, dental practices, specialist clinics and pathology labs using infection-control procedures, hospital-grade disinfectants and colour-coded equipment to help prevent cross-contamination.',
    frequency:
      'Most clinics are cleaned daily, often after hours, with extra attention to treatment rooms and waiting areas. We will agree the program with you around your opening hours and infection-control policies.',
    faqs: [
      {
        q: 'Do you use colour-coded equipment?',
        a: 'Yes. Colour-coded cleaning equipment is used to help prevent cross-contamination between areas.',
      },
      {
        q: 'Can you handle medical and sharps waste?',
        a: 'Our teams are trained in medical waste handling protocols, and sharps and clinical waste services can be arranged. Tell us what your site produces and we will confirm how it is handled.',
      },
      {
        q: 'Can you clean when patients are not there?',
        a: 'Yes. After-hours cleaning keeps disruption to patients and staff low.',
      },
    ],
    related: ['waste-removal-hygiene', 'eco-friendly-cleaning', 'carpet-cleaning'],
  },

  'shopping-centres': {
    intro:
      'Shopping centres are cleaned under constant foot traffic. We look after common areas, food courts, restrooms, car parks and external areas, with spill response and slip-hazard management through trading hours.',
    frequency:
      'High-traffic areas are typically attended throughout trading hours, with deeper cleaning scheduled before opening or overnight. We will plan around your trading hours and your busiest times.',
    faqs: [
      {
        q: 'Can you clean while the centre is trading?',
        a: 'Yes. High-traffic areas are maintained through trading hours, and spills and hazards are dealt with as they happen.',
      },
      {
        q: 'Do you cover food courts and restrooms?',
        a: 'Yes. Food court and kitchen cleaning and restroom hygiene management are part of the service.',
      },
      {
        q: 'What about car parks and outdoor areas?',
        a: 'Car park and external area maintenance can be included, and our sweeping service covers larger hard-surface areas.',
      },
    ],
    related: ['car-park-warehouse-sweeping', 'high-pressure-cleaning', 'waste-removal-hygiene'],
  },

  'commercial-window-cleaning': {
    intro:
      'Clean glass makes a building look cared for. We clean interior and exterior windows for offices, retail, strata and hotels, including multi-storey buildings, to a streak-free finish.',
    frequency:
      'Windows are commonly cleaned on a regular cycle, such as monthly, quarterly or twice a year, depending on the building, its location and how it is used.',
    faqs: [
      {
        q: 'Can you reach upper floors?',
        a: 'Yes. High-rise and multi-storey capability is part of the service.',
      },
      {
        q: 'Can window cleaning be a regular program?',
        a: 'Yes. Regular scheduled programs are available.',
      },
      {
        q: 'Can it be added to our regular cleaning?',
        a: 'Yes. It can be added to a building cleaning program, so one team covers both.',
      },
    ],
    related: ['commercial-buildings', 'high-pressure-cleaning', 'commercial-residential-strata'],
  },

  'high-pressure-cleaning': {
    intro:
      'Pressure cleaning restores hard surfaces dulled by grime, mould and algae. We clean building exteriors, paving, driveways, footpaths, loading docks and car parks, using chemicals responsibly where they are needed.',
    frequency:
      'It depends on the surface. High-traffic paving and loading areas may need regular cleaning, while building facades are often cleaned periodically. We will recommend a cycle once we have seen your surfaces.',
    faqs: [
      {
        q: 'What surfaces can you clean?',
        a: 'Concrete, brick and paving, and building facades and walls. We will confirm what suits your surface before we start.',
      },
      {
        q: 'Do you clear drains and pits?',
        a: 'Yes. Drain clearing and pit cleaning are part of the service.',
      },
      {
        q: 'How do you use chemicals?',
        a: 'Responsibly, and only where needed. We will talk through the approach for your site.',
      },
    ],
    related: ['car-park-warehouse-sweeping', 'graffiti-removal', 'commercial-window-cleaning'],
  },

  'waste-removal-hygiene': {
    intro:
      'Washrooms and waste areas are where hygiene shows most. We supply and maintain sanitary bins, paper towel and soap dispensers, collect and replace them on a schedule, and arrange compliant disposal, with a record for your compliance needs.',
    frequency:
      'Service visits are scheduled to suit how busy your washrooms are. Weekly or fortnightly is common for offices and more often for busy sites. We will set the schedule with you.',
    faqs: [
      {
        q: 'Do you provide the bins and dispensers?',
        a: 'Yes. Sanitary bins, paper towel and soap dispensers are supplied and maintained.',
      },
      {
        q: 'Is there a record for compliance?',
        a: 'Yes. A full audit trail is kept for compliance.',
      },
      {
        q: 'Can you handle sharps and clinical waste?',
        a: 'Sharps disposal and clinical waste management are available. Tell us what your site produces and we will confirm how it is handled.',
      },
    ],
    related: ['medical-centres', 'commercial-buildings', 'eco-friendly-cleaning'],
  },

  'carpet-cleaning': {
    intro:
      'Carpets hold dirt, stains and odours long after vacuuming stops working. We clean commercial carpets and rugs using hot water extraction (steam cleaning), or dry cleaning methods for more sensitive carpets, with stain and odour treatment.',
    frequency:
      'Carpets in busy areas are commonly deep-cleaned several times a year, and quieter areas less often. A regular maintenance program can help carpets last longer.',
    faqs: [
      {
        q: 'How long will the carpet take to dry?',
        a: 'Rapid drying techniques are available, and cleaning can be scheduled after hours so carpets have time to dry before people return.',
      },
      {
        q: 'Can you remove stains?',
        a: 'Stain and odour treatment is part of the service. Some marks cannot be fully removed, and we will tell you honestly what to expect.',
      },
      {
        q: 'What if our carpet is delicate?',
        a: 'Dry cleaning methods are available for sensitive carpets.',
      },
    ],
    related: ['commercial-buildings', 'commercial-residential-strata', 'medical-centres'],
  },

  'car-park-warehouse-sweeping': {
    intro:
      'Large hard floors collect dust, grit and oil marks quickly. We use ride-on mechanical sweepers and scrubbers to clean car parks, warehouses, loading docks and yards, with dust suppression and care taken around line marking.',
    frequency:
      'Car parks and warehouse floors are often swept weekly or fortnightly, with scrubbing as needed. Day or night scheduling is available so your operations are not interrupted.',
    faqs: [
      {
        q: 'Can you work at night?',
        a: 'Yes. Day or night scheduling is available.',
      },
      {
        q: 'Will sweeping damage our line marking?',
        a: 'Line marking protection is part of the service.',
      },
      {
        q: 'Can you remove oil marks?',
        a: 'Scrubbing is used to treat stains and oil marks. Results depend on the surface and how old the mark is.',
      },
    ],
    related: ['high-pressure-cleaning', 'shopping-centres', 'graffiti-removal'],
  },

  'graffiti-removal': {
    intro:
      'Graffiti spreads when it is left. We remove it quickly from brick, concrete, glass and metal, can apply an anti-graffiti protective coating, and document the work with before and after photographs.',
    frequency:
      'Removal is usually on request, with ongoing maintenance programs available for sites that are targeted repeatedly.',
    faqs: [
      {
        q: 'How quickly can you respond?',
        a: 'A fast response is part of the service. Tell us how urgent it is when you contact us and we will confirm what we can do.',
      },
      {
        q: 'Will removal damage the surface?',
        a: 'We choose a method that is safe for the surface, whether it is brick, concrete, glass or metal.',
      },
      {
        q: 'Can you stop it coming back?',
        a: 'An anti-graffiti protective coating can be applied, which makes later removal easier. No coating prevents graffiti entirely.',
      },
    ],
    related: ['high-pressure-cleaning', 'commercial-residential-strata', 'building-management'],
  },
}
