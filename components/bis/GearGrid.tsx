"use client";

// Most-used gear grid: one row per slot — item icon + quality-colored
// name (server-resolved from data/items.json, Wowhead tooltip on hover)
// + usage % + expandable alternatives.
//
// Expansion is a native <details>/<summary>, NOT React state: the
// alternatives and item sources (~30-40 item names per page) have to exist
// in the server HTML to be crawlable and to survive a no-JS render. A
// useState-gated panel put all of that behind a click, invisible to
// crawlers. The only JS left is the analytics ping on open.

import { ChevronDown, TriangleAlert, MapPin } from "lucide-react";
import type { BisSlot } from "@/lib/bis";
import { ItemLink } from "@/components/ItemLink";
import { isPveOnly, PVE_ONLY_WARN_PCT } from "@/lib/item-flags";
import { getItemSource, formatItemSource } from "@/data/itemSources";
import { trackEvent } from "@/lib/gtag";
import { cn } from "@/lib/utils";

function ItemSourceLine({ itemId }: { itemId: number }) {
  const sources = getItemSource(itemId);
  if (!sources) return null;
  return (
    <span className="flex items-start gap-1.5 text-xs text-muted">
      <MapPin className="mt-0.5 size-3 shrink-0 text-muted" aria-hidden />
      <span>{sources.map(formatItemSource).join(" · ")}</span>
    </span>
  );
}

const SLOT_LABEL: Record<string, string> = {
  MainHand: "Main Hand",
  OffHand: "Off Hand",
  Ring1: "Ring 1",
  Ring2: "Ring 2",
  Trinket1: "Trinket 1",
  Trinket2: "Trinket 2",
};

const ROW = "flex w-full items-center gap-3 px-3 py-2 text-left sm:px-4";

export function GearGrid({
  slots,
  specKey,
  content,
}: {
  slots: BisSlot[];
  specKey: string;
  content: "pvp" | "pve";
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {slots.map((row) => {
        const hasAlts = row.alternatives.length > 0;
        const hasSource = getItemSource(row.bis.itemId) !== null;
        const expandable = hasAlts || hasSource;
        const raidWarning =
          content === "pvp" &&
          isPveOnly(row.bis.itemId) &&
          (row.bis.usagePct ?? 0) > PVE_ONLY_WARN_PCT;

        const line = (
          <>
            <span className="w-16 shrink-0 font-mono text-[10px] tracking-wider text-muted uppercase sm:w-20 sm:text-[11px]">
              {SLOT_LABEL[row.slot] ?? row.slot}
            </span>
            <span className="min-h-7 flex-1">
              <ItemLink itemId={row.bis.itemId} fallbackName={row.bis.name} />
            </span>
            {row.bis.usagePct !== undefined && (
              <span
                className="font-mono text-xs tabular-nums text-accent"
                title="Share of surveyed players using this item"
              >
                {row.bis.usagePct}%
              </span>
            )}
          </>
        );

        const warning = raidWarning && (
          <div className="flex items-start gap-2 border-t border-amber-500/20 bg-amber-500/[0.06] px-3 py-2 text-[11px] leading-relaxed text-amber-500/90 sm:px-4">
            <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            <span>
              This is a raid piece — it has no resilience.{" "}
              {hasAlts
                ? "Expand this row for a pure-arena alternative."
                : "Prefer the season arena set piece for this slot."}
            </span>
          </div>
        );

        if (!expandable) {
          return (
            <div
              key={row.slot}
              className="border-b border-border bg-surface last:border-b-0"
            >
              <div className={ROW}>
                {line}
                <span className="size-3.5 shrink-0" aria-hidden />
              </div>
              {warning}
            </div>
          );
        }

        return (
          <details
            key={row.slot}
            className="group border-b border-border bg-surface last:border-b-0"
            onToggle={(e) => {
              if (e.currentTarget.open)
                trackEvent("bis_alternative_expanded", {
                  spec: specKey,
                  slot: row.slot,
                });
            }}
          >
            <summary
              className={cn(
                ROW,
                "cursor-pointer list-none transition-colors hover:bg-surface-hover [&::-webkit-details-marker]:hidden",
              )}
            >
              {line}
              <ChevronDown
                className="size-3.5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                aria-hidden
              />
            </summary>
            {warning}
            <ul className="space-y-2 border-t border-border/60 bg-background px-3 py-2.5 sm:pl-[6.25rem]">
              {hasSource && (
                <li className="flex flex-col gap-0.5 pb-1">
                  <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
                    How to get
                  </span>
                  <ItemSourceLine itemId={row.bis.itemId} />
                </li>
              )}
              {row.alternatives.map((alt) => (
                <li
                  key={alt.itemId}
                  className="flex flex-wrap items-center gap-x-3 gap-y-0.5"
                >
                  <span className="min-h-7">
                    <ItemLink itemId={alt.itemId} fallbackName={alt.name} />
                  </span>
                  {alt.usagePct !== undefined && (
                    <span className="font-mono text-xs tabular-nums text-muted">
                      {alt.usagePct}%
                    </span>
                  )}
                  <span className="w-full sm:pl-0">
                    <ItemSourceLine itemId={alt.itemId} />
                  </span>
                  {alt.pveFlexNote && (
                    <span className="text-xs text-muted">{alt.pveFlexNote}</span>
                  )}
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </div>
  );
}
