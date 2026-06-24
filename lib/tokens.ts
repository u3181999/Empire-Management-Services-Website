// Single source of truth for all design values.
// Tailwind @theme variables in globals.css mirror every hex here — never add a raw hex elsewhere.

export const colors = {
  navy: {
    50:  '#f0f4f8',
    100: '#d9e2ec',
    200: '#bcccdc',
    300: '#9fb3c8',
    400: '#829ab1',
    500: '#627d98',
    600: '#486581',
    700: '#334e68',
    800: '#243b53',
    900: '#102a43',
    950: '#0b1f31',
  },
  gold: {
    50:  '#fdf8e7',
    100: '#faefc3',
    200: '#f5de87',
    300: '#efca4b',
    400: '#e8b81a',
    500: '#d4a017',
    600: '#b07c0e',
    700: '#8a5f0a',
    800: '#64430a',
    900: '#3e2a06',
  },
} as const

// Semantic aliases — reference these in any non-Tailwind context (inline styles, canvas, etc.)
export const brand = {
  primary:     colors.navy[900],   // #102a43  → bg-navy-900
  primaryDark: colors.navy[950],   // #0b1f31  → bg-navy-950
  accent:      colors.gold[500],   // #d4a017  → bg-gold-500
  accentHover: colors.gold[400],   // #e8b81a  → hover:bg-gold-400
} as const

export const fontSizes = {
  xs:   '0.75rem',    // 12px  → text-xs
  sm:   '0.875rem',   // 14px  → text-sm
  base: '1rem',       // 16px  → text-base
  lg:   '1.125rem',   // 18px  → text-lg
  xl:   '1.25rem',    // 20px  → text-xl
  '2xl':'1.5rem',     // 24px  → text-2xl
  '3xl':'1.875rem',   // 30px  → text-3xl
  '4xl':'2.25rem',    // 36px  → text-4xl
  '5xl':'3rem',       // 48px  → text-5xl
  '6xl':'3.75rem',    // 60px  → text-6xl
} as const

export const spacing = {
  1:  '0.25rem',   //  4px  → p-1
  2:  '0.5rem',    //  8px  → p-2
  3:  '0.75rem',   // 12px  → p-3
  4:  '1rem',      // 16px  → p-4
  5:  '1.25rem',   // 20px  → p-5
  6:  '1.5rem',    // 24px  → p-6
  8:  '2rem',      // 32px  → p-8
  10: '2.5rem',    // 40px  → p-10
  12: '3rem',      // 48px  → p-12
  16: '4rem',      // 64px  → p-16
  20: '5rem',      // 80px  → p-20
  24: '6rem',      // 96px  → p-24
} as const

export const radii = {
  sm:   '0.125rem',  //  2px  → rounded-sm
  md:   '0.375rem',  //  6px  → rounded-md
  lg:   '0.5rem',    //  8px  → rounded-lg
  xl:   '0.75rem',   // 12px  → rounded-xl
  '2xl':'1rem',      // 16px  → rounded-2xl
  full: '9999px',    //       → rounded-full
} as const

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const
