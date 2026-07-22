// A boss's visual: the real 128×64 portrait banner when we have one,
// otherwise a neutral monogram placeholder in the same banner shape (we do
// NOT substitute an unrelated game/spell icon — a wrong portrait is worse
// than none). Fixed dimensions so neither variant causes layout shift.

import { bossImage } from "@/data/raids";

const BANNER = {
  sm: { w: 72, h: 36 },
  md: { w: 112, h: 56 },
  lg: { w: 160, h: 80 },
} as const;

// Two-letter monogram from the boss name, skipping filler words.
function initials(name: string): string {
  const words = name
    .split(/\s+/)
    .filter((w) => w && !/^(the|of|and|&)$/i.test(w));
  return (words.slice(0, 2).map((w) => w[0]).join("") || name.slice(0, 2)).toUpperCase();
}

export function BossPortrait({
  bossId,
  name,
  size = "md",
  lazy = true,
}: {
  bossId: string;
  name: string;
  size?: keyof typeof BANNER;
  lazy?: boolean;
}) {
  const img = bossImage(bossId);
  const { w, h } = BANNER[size];
  if (!img) {
    return (
      <span
        aria-label={name}
        title={name}
        className="flex shrink-0 items-center justify-center rounded-md border border-border-strong bg-surface-hover font-mono font-semibold tracking-wide text-muted"
        style={{ width: w, height: h, fontSize: Math.round(h * 0.38) }}
      >
        {initials(name)}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static local webp, fixed size
    <img
      src={img}
      alt={name}
      width={w}
      height={h}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      className="shrink-0 rounded-md border border-border-strong object-cover"
      style={{ width: w, height: h }}
    />
  );
}
