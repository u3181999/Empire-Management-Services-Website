// The company's own photos (supplied by the owner, 26 and 27 Nov 2026), prepared for the web in public/photos and
// public/fleet. Names of other businesses, one number plate and a member of the public's face are blurred or cropped
// out. See CLAIMS.md before adding more, including why some supplied photos are deliberately not used.
//
// Rules: alt text and captions describe only what the picture shows and never name a client or site. Each photo
// appears once on the site; the only repeats are the home page tiles, which link to where that photo lives.

export type SitePhoto = {
  src: string
  width: number
  height: number
  alt: string
  caption: string
  /** Which part to keep when a frame is wider than the photo (CSS object-position). Centre if not set. */
  focus?: string
}

const wide = (file: string, alt: string, caption: string, focus?: string): SitePhoto => ({
  focus,
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
  carpetSteamCleaning: wide(
    'carpet-steam-cleaning',
    'A team member in an Empire cap steam cleaning the carpet of a bright, empty room',
    'Carpet steam cleaning',
    '50% 35%',
  ),
  pressureWashingYard: wide(
    'pressure-washing-yard',
    'Three team members pressure washing and squeegeeing a concrete service yard beside an Empire van',
    'Pressure washing a service yard',
  ),
  graffitiWall: wide(
    'graffiti-removal-wall',
    'A team member in an Empire jacket removing yellow spray paint from a white wall',
    'Removing graffiti from a rendered wall',
  ),
  stairwellCleaning: wide(
    'stairwell-cleaning',
    'Two team members in Empire jackets cleaning a door and handrail on a stairwell landing',
    'Stairwell doors and handrails',
  ),
  plantRoom: wide(
    'plant-room-dusting',
    'A team member in a dust mask, gloves and high-visibility shirt dusting overhead pipes in a building plant room',
    'Plant room cleaning',
    '50% 15%',
  ),
  warehouseScrubbing: wide(
    'warehouse-floor-scrubbing',
    'A team member scrubbing a concrete warehouse floor with a rotary floor machine',
    'Machine scrubbing a concrete floor',
  ),
  lobbyFloor: wide(
    'lobby-floor-cleaning',
    'Two team members machine cleaning the tiled floor of a building lobby, with a wet floor sign in place',
    'Lobby floor cleaning',
    '50% 10%',
  ),
  shopfrontWindows: wide(
    'shopfront-window-team',
    'Team members in navy and gold Empire jackets cleaning the glass front of a two-storey building',
    'Ground-floor glass frontage',
    '50% 30%',
  ),
  wasteTrailer: wide(
    'waste-trailer',
    'An Empire van towing a covered cage trailer loaded for waste removal',
    'Waste ready for removal',
  ),
  safetyDataSheets: {
    src: '/photos/safety-data-sheets.webp',
    width: 900,
    height: 945,
    alt: 'Two team members in Empire uniform checking a folder of safety data sheets on site',
    caption: 'Checking safety data sheets on site',
  },
} satisfies Record<string, SitePhoto>

/**
 * The one photo shown on a service page. Only services with a strong picture of that actual work have one: the
 * government, medical, shopping centre and eco-friendly pages deliberately have none.
 */
export const SERVICE_PHOTOS: Partial<Record<string, SitePhoto>> = {
  'commercial-residential-strata': PHOTOS.stairwellCleaning,
  'commercial-buildings': PHOTOS.lobbyFloor,
  'building-management': PHOTOS.plantRoom,
  'commercial-window-cleaning': PHOTOS.shopfrontWindows,
  'high-pressure-cleaning': PHOTOS.pressureWashingYard,
  'waste-removal-hygiene': PHOTOS.wasteTrailer,
  'carpet-cleaning': PHOTOS.carpetSteamCleaning,
  'car-park-warehouse-sweeping': PHOTOS.warehouseScrubbing,
  'graffiti-removal': PHOTOS.graffitiWall,
}
