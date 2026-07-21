// Site wordmark — a scalable SVG recreation of the WOW TBC logo: a green
// "refresh" ring wrapped around a downward line-art sword, over the
// "WOW TBC" wordmark (WOW in the foreground color, TBC in brand green).
// Vector so it stays crisp at any nav/footer size. To use an exact raster
// instead, swap this for <Image src="/images/logo.png" .../>.

const GREEN = "#2ecc71";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 150"
      className={className}
      role="img"
      aria-label="WoW TBC"
      fill="none"
    >
      {/* Refresh ring — open circle with an arrowhead, brand green */}
      <path
        d="M69 41 A38 38 0 1 0 101 23"
        stroke={GREEN}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M101 13 L101 33 L116 23 Z" fill={GREEN} />

      {/* Sword — line-art, pointing down through the ring */}
      <g stroke={GREEN} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="100" cy="26" r="6" />
        <line x1="100" y1="32" x2="100" y2="46" />
        <line x1="79" y1="50" x2="121" y2="50" />
        <path d="M92 50 L100 104 L108 50" />
        <line x1="100" y1="54" x2="100" y2="98" />
      </g>

      {/* Wordmark */}
      <text
        x="60"
        y="142"
        textAnchor="middle"
        fontFamily="var(--font-sans, system-ui, sans-serif)"
        fontSize="30"
        fontWeight="800"
        letterSpacing="0.5"
        fill="currentColor"
      >
        WOW
      </text>
      <text
        x="147"
        y="142"
        textAnchor="middle"
        fontFamily="var(--font-sans, system-ui, sans-serif)"
        fontSize="30"
        fontWeight="800"
        letterSpacing="0.5"
        fill={GREEN}
      >
        TBC
      </text>
    </svg>
  );
}
