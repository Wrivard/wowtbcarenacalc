// Server-renderable item link: zamimg icon + quality-colored name, with
// the Wowhead href so the global tooltip script adds the game tooltip
// on hover. Fixed icon dimensions → zero layout shift, and the name is
// real text in the HTML (crawlable), unlike script-rewritten links.

import { getItem, qualityColor } from "@/lib/items";
import { gameIconUrl } from "@/components/GameIcon";
import { wowheadItemUrl } from "@/lib/bis";

export function ItemLink({
  itemId,
  fallbackName,
  iconSize = 24,
}: {
  itemId: number;
  fallbackName?: string;
  iconSize?: number;
}) {
  const meta = getItem(itemId);
  const name = meta?.name ?? fallbackName ?? `Item #${itemId}`;
  return (
    <a
      href={wowheadItemUrl(itemId)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 align-middle underline-offset-2 hover:underline"
      style={{ color: qualityColor(meta?.quality) }}
    >
      {meta && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={gameIconUrl(meta.icon, "medium")}
          alt=""
          width={iconSize}
          height={iconSize}
          loading="lazy"
          decoding="async"
          className="rounded border border-border-strong"
          style={{ width: iconSize, height: iconSize }}
        />
      )}
      <span className="text-sm">{name}</span>
    </a>
  );
}
