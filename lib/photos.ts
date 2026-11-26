// The company's own photos (supplied by the owner, 26 Nov 2026), prepared for the web in public/photos and public/fleet.
// Names of other businesses visible in the originals were blurred or cropped out. See CLAIMS.md before adding more.
// Alt text and captions describe only what the picture shows, and name no client or site.

export type SitePhoto = {
  src: string
  width: number
  height: number
  alt: string
  caption: string
}

const wide = (file: string, alt: string, caption: string): SitePhoto => ({
  src: `/photos/${file}.webp`,
  width: 1200,
  height: 900,
  alt,
  caption,
})

export const PHOTOS = {
  fleet: {
    src: '/fleet/empire-fleet.webp',
    width: 1400,
    height: 1050,
    alt: 'A row of white Empire Management Services vehicles, with the blue and gold Empire logo on a utility and a van',
    caption: 'Our branded vehicles',
  },
  glassDoorCleaning: wide(
    'glass-door-cleaning',
    'Two team members washing glass entrance doors, one seen through the soapy glass',
    'Glass entrance cleaning',
  ),
  windowCleaning: wide(
    'window-cleaning',
    'A team member in Empire uniform washing a glass entrance door with a window mop',
    'Window and glass cleaning',
  ),
  entranceGlass: wide(
    'entrance-glass',
    'A team member preparing a pole and cloth to clean the glass front of a building entrance',
    'Building entrance glass',
  ),
  floorScrubber: wide(
    'floor-scrubber',
    'A floor scrubbing machine in a clean tiled corridor, with a wet floor sign behind it',
    'Machine floor scrubbing',
  ),
  carParkClearing: wide(
    'car-park-clearing',
    'A team member with a backpack blower walking through a clean car park under a blue sky',
    'Car park clean-up',
  ),
  commonAreaSweeping: wide(
    'common-area-sweeping',
    'Two team members sweeping and collecting litter in a paved outdoor area beside a building',
    'Shared outdoor areas',
  ),
  groundsBlower: wide(
    'grounds-blower',
    'A team member with a backpack blower crossing the street in front of an office building',
    'Leaf and debris clean-up',
  ),
  wasteTrailer: wide(
    'waste-trailer',
    'An Empire van towing a covered cage trailer loaded for waste removal',
    'Waste ready for removal',
  ),
  footpathAndVan: wide(
    'footpath-and-van',
    'A tidy footpath and trimmed verge beside a building, with an Empire van parked at the kerb',
    'Tidy street frontage',
  ),
  safetyDataSheets: {
    src: '/photos/safety-data-sheets.webp',
    width: 900,
    height: 945,
    alt: 'Two team members in Empire uniform checking a folder of safety data sheets on site',
    caption: 'Checking safety data sheets on site',
  },
} satisfies Record<string, SitePhoto>

/** The photo shown on a service page. Only services with a picture of that actual work have one. */
export const SERVICE_PHOTOS: Partial<Record<string, SitePhoto>> = {
  'commercial-residential-strata': PHOTOS.commonAreaSweeping,
  'commercial-buildings': PHOTOS.floorScrubber,
  'building-management': PHOTOS.groundsBlower,
  'commercial-window-cleaning': PHOTOS.windowCleaning,
  'waste-removal-hygiene': PHOTOS.wasteTrailer,
  'car-park-warehouse-sweeping': PHOTOS.carParkClearing,
}
