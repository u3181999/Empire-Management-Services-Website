/**
 * The Bowl of Hygieia (a bowl with a serpent coiled round its stem), the classic emblem of health and hygiene.
 * Line drawing in the same style as the lucide icons, so it takes its colour from `currentColor`.
 * Decorative: it is always hidden from screen readers.
 */
export default function HygieiaBowl({ className, strokeWidth = 1 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Bowl: rim, then the curve of the cup */}
      <path d="M9 18 H47" />
      <path d="M11 18 C11 29 19 34 28 34 C37 34 45 29 45 18" />
      {/* Stem and foot */}
      <path d="M28 34 V53" />
      <path d="M16 59 C16 55 21 53 28 53 C35 53 40 55 40 59 Z" />
      {/* Serpent: three coils round the stem, then up the right of the bowl with its head over the rim */}
      <path d="M39 57 C30 57 18 56 19 52 C20 48 36 50 37 46 C38 42 20 44 21 40.5 C22 37 40 40 46 32 C50 27 48 21 52 14" />
      {/* Head and tongue */}
      <path d="M52 14 C51 11 54 9 56.5 10.5 C58.5 12 57 15 54 15.5 Z" />
      <path d="M57.5 10.5 L61 8.5 M59 9.8 L61.5 11" />
    </svg>
  )
}
