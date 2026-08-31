/**
 * Concentric yantra geometry — interlocking triangles inside nested circles
 * and a lotus ring. Used as a structural background motif, sized by the
 * caller. Purely decorative, so hidden from assistive tech.
 */
export default function Yantra({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      aria-hidden
    >
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="78" />
      {petals.map((deg) => (
        <ellipse
          key={deg}
          cx="100"
          cy="61"
          rx="9"
          ry="17"
          transform={`rotate(${deg} 100 100)`}
          opacity="0.75"
        />
      ))}
      <circle cx="100" cy="100" r="44" />
      {/* Interlocking upward / downward triangles */}
      <path d="M100 60 L135 121 L65 121 Z" />
      <path d="M100 140 L65 79 L135 79 Z" />
      <path d="M100 72 L127 118 L73 118 Z" opacity="0.6" />
      <path d="M100 128 L73 82 L127 82 Z" opacity="0.6" />
      <circle cx="100" cy="100" r="12" />
      <circle cx="100" cy="100" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
