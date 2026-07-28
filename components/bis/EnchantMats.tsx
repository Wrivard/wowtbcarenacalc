// The "what does this enchant cost me" popover on the enchants table.
//
// Server-rendered and CSS-only on purpose. The mats are the answer to a
// question players ask before they walk to a trainer, so they belong in the
// HTML — a useState popover would hide every reagent name from crawlers and
// from a no-JS render, the same reason GearGrid expands with <details>.
//
// Opens on hover AND on focus, so the keyboard and a phone tap both reach it:
// the trigger is a real button, and focus-within keeps the panel up while the
// reagent links inside it are tabbed through.

import { Hammer } from "lucide-react";
import { ItemLink } from "@/components/ItemLink";

export function EnchantMats({
  reagents,
  tool,
  source,
  label,
}: {
  reagents: { itemId: number; count: number }[];
  tool?: string;
  source?: string;
  label: string;
}) {
  return (
    <span className="group relative inline-block">
      <button
        type="button"
        className="inline-flex cursor-help items-center gap-1 rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-muted uppercase transition-colors group-hover:border-border-strong group-hover:text-muted-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={`Materials for ${label}`}
      >
        <Hammer className="size-3" aria-hidden />
        Mats
      </button>

      {/* Left-aligned to the trigger and clamped to the viewport on small
          screens, where the enchants table is already the full width. */}
      <span className="pointer-events-none absolute top-full left-0 z-20 mt-1.5 block w-max max-w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-border-strong bg-surface p-3 opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <span className="block font-mono text-[10px] tracking-wider text-muted uppercase">
          Materials
        </span>
        <span className="mt-2 flex flex-col gap-1.5">
          {reagents.map((r) => (
            <span key={r.itemId} className="flex items-center gap-2">
              <ItemLink itemId={r.itemId} iconSize={20} />
              <span className="font-mono text-xs tabular-nums text-muted-strong">
                ×{r.count}
              </span>
            </span>
          ))}
        </span>
        {tool && (
          <span className="mt-2 block text-[11px] leading-relaxed text-muted">
            Applied with {tool} — the enchanter&apos;s tool, not something you
            buy.
          </span>
        )}
        {source && (
          <span className="mt-2 block border-t border-border pt-2 text-[11px] leading-relaxed text-muted">
            Formula: {source}
          </span>
        )}
      </span>
    </span>
  );
}
