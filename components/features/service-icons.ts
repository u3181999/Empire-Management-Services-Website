import {
  Building2, Building, ClipboardCheck, Landmark, Leaf, Stethoscope, ShoppingBag,
  Sparkles, Droplets, Recycle, Brush, Car, SprayCan,
  type LucideIcon,
} from 'lucide-react'

// Keys match the `icon` field on each entry in SERVICES (lib/constants.ts). Shared by the home page tiles and the
// Services page cards so a service has the same icon everywhere.
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  Building2, Building, ClipboardCheck, Landmark, Leaf, Stethoscope, ShoppingBag,
  Sparkles, Droplets, Recycle, Brush, Car, SprayCan,
}

export const FALLBACK_SERVICE_ICON: LucideIcon = Sparkles
