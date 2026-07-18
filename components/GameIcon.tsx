// Standalone game icon from the zamimg CDN, with fixed dimensions so
// icons never cause layout shift. Sizes match zamimg's buckets.

import { cn } from "@/lib/utils";

const SIZES = {
  small: { px: 18, bucket: "small" },
  medium: { px: 36, bucket: "medium" },
  large: { px: 56, bucket: "large" },
} as const;

export function gameIconUrl(
  icon: string,
  size: keyof typeof SIZES = "large",
): string {
  return `https://wow.zamimg.com/images/wow/icons/${SIZES[size].bucket}/${icon}.jpg`;
}

export function GameIcon({
  icon,
  alt,
  size = "medium",
  className,
  lazy = true,
}: {
  icon: string;
  alt: string;
  size?: keyof typeof SIZES;
  className?: string;
  lazy?: boolean;
}) {
  const { px } = SIZES[size];
  // zamimg CDN serves pre-sized square jpgs; next/image would add only a
  // proxy hop, so a plain img with fixed dimensions is the right call.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={gameIconUrl(icon, size)}
      alt={alt}
      width={px}
      height={px}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      className={cn("shrink-0 rounded border border-border-strong", className)}
      style={{ width: px, height: px }}
    />
  );
}
