"use client";

// Most-used gear grid: one row per slot — item icon + quality-colored
// name (server-resolved from data/items.json, Wowhead tooltip on hover)
// + usage % + expandable alternatives.

import { useState } from "react";
import { ChevronDown, TriangleAlert } from "lucide-react";
import type { BisSlot } from "@/lib/bis";
import { ItemLink } from "@/components/ItemLink";
import { isPveOnly, PVE_ONLY_WARN_PCT } from "@/lib/item-flags";
import { trackEvent } from "@/lib/gtag";
import { cn } from "@/lib/utils";

const SLOT_LABEL: Record<string, string> = {
  MainHand: "Main Hand",
  OffHand: "Off Hand",
  Ring1: "Ring 1",
  Ring2: "Ring 2",
  Trinket1: "Trinket 1",
  Trinket2: "Trinket 2",
};

export function GearGrid({
  slots,
  specKey,
  content,
}: {
  slots: BisSlot[];
  specKey: string;
  content: "pvp" | "pve";
}) {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (slot: string, hasAlts: boolean) => {
    if (!hasAlts) return;
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(slot)) next.delete(slot);
      else {
        next.add(slot);
        trackEvent("bis_alternative_expanded", { spec: specKey, slot });
      }
      return next;
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {slots.map((row) => {
        const hasAlts = row.alternatives.length > 0;
        const expanded = open.has(row.slot);
        const raidWarning =
          content === "pvp" &&
          isPveOnly(row.bis.itemId) &&
          (row.bis.usagePct ?? 0) > PVE_ONLY_WARN_PCT;
        return (
          <div key={row.slot} className="border-b border-border bg-surface last:border-b-0">
            <div
              role={hasAlts ? "button" : undefined}
              tabIndex={hasAlts ? 0 : undefined}
              onClick={() => toggle(row.slot, hasAlts)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(row.slot, hasAlts);
                }
              }}
              aria-expanded={hasAlts ? expanded : undefined}
              className={cn(
                "flex w-full items-center gap-3 px-3 py-2 text-left transition-colors sm:px-4",
                hasAlts && "cursor-pointer hover:bg-surface-hover",
              )}
            >
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
              {hasAlts ? (
                <ChevronDown
                  className={cn(
                    "size-3.5 shrink-0 text-muted transition-transform duration-200",
                    expanded && "rotate-180",
                  )}
                  aria-hidden
                />
              ) : (
                <span className="size-3.5 shrink-0" aria-hidden />
              )}
            </div>
            {raidWarning && (
              <div className="flex items-start gap-2 border-t border-amber-500/20 bg-amber-500/[0.06] px-3 py-2 text-[11px] leading-relaxed text-amber-500/90 sm:px-4">
                <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                <span>
                  This is a raid piece — it has no resilience.{" "}
                  {hasAlts
                    ? "Expand this row for a pure-arena alternative."
                    : "Prefer the season arena set piece for this slot."}
                </span>
              </div>
            )}
            {expanded && (
              <ul className="space-y-2 border-t border-border/60 bg-background px-3 py-2.5 sm:pl-[6.25rem]">
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
                    {alt.pveFlexNote && (
                      <span className="text-xs text-muted">{alt.pveFlexNote}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
