// A boss's visual: the real 128×64 portrait banner when we have one,
// otherwise the thematic square game icon (bossIcon). Fixed dimensions so
// neither variant causes layout shift. `size` picks the render scale.

import { bossIcon, bossImage } from "@/data/raids";
import { GameIcon } from "@/components/GameIcon";

const BANNER = {
  sm: { w: 72, h: 36 },
  md: { w: 112, h: 56 },
  lg: { w: 160, h: 80 },
} as const;

const ICON_SIZE = {
  sm: "small",
  md: "medium",
  lg: "large",
} as const;

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
  if (!img) {
    return <GameIcon icon={bossIcon(bossId)} alt="" size={ICON_SIZE[size]} lazy={lazy} />;
  }
  const { w, h } = BANNER[size];
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
