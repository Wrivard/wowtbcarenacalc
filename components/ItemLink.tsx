// Server-renderable item link: zamimg icon + quality-colored name, with
// the Wowhead href so the global tooltip script adds the game tooltip
// on hover. Fixed icon dimensions → zero layout shift, and the name is
// real text in the HTML (crawlable), unlike script-rewritten links.
//
// rel includes nofollow deliberately. These are ~14k boilerplate links to
// one external host (26 per page, 63 on a PvE BiS page) — functional
// tooltip targets, not editorial citations. The dofollow attribution to
// Wowhead lives once in the footer instead.

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
      rel="noopener noreferrer nofollow"
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
