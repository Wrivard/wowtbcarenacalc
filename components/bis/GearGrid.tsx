"use client";

// Most-used gear grid: one row per slot — Wowhead item link (auto icon +
// tooltip via the global script) + usage % + expandable alternatives.

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { BisSlot } from "@/lib/bis";
import { wowheadItemUrl } from "@/lib/bis";
import { refreshWowheadLinks } from "@/components/WowheadTooltips";
import { trackEvent } from "@/lib/gtag";
import { cn } from "@/lib/utils";

function ItemLink({ itemId }: { itemId: number }) {
  // The Wowhead script rewrites this link into icon + colored name.
  // The parent row reserves min-height so the rewrite never shifts layout.
  return (
    <a
      href={wowheadItemUrl(itemId)}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-muted-strong underline-offset-2 hover:underline"
    >
      Item #{itemId}
    </a>
  );
}

export function GearGrid({ slots, specKey }: { slots: BisSlot[]; specKey: string }) {
  const [open, setOpen] = useState<Set<string>>(new Set());

  // Re-scan links whenever an alternatives row expands.
  useEffect(() => {
    refreshWowheadLinks();
  }, [open]);

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
        return (
          <div key={row.slot} className="border-b border-border bg-surface last:border-b-0">
            <button
              onClick={() => toggle(row.slot, hasAlts)}
              disabled={!hasAlts}
              aria-expanded={hasAlts ? expanded : undefined}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                hasAlts && "hover:bg-surface-hover",
              )}
            >
              <span className="w-20 shrink-0 font-mono text-[11px] tracking-wider text-muted uppercase">
                {row.slot}
              </span>
              <span className="min-h-6 flex-1">
                <ItemLink itemId={row.bis.itemId} />
              </span>
              {row.bis.usagePct !== undefined && (
                <span className="font-mono text-xs tabular-nums text-accent">
                  {row.bis.usagePct}%
                </span>
              )}
              {hasAlts && (
                <ChevronDown
                  className={cn(
                    "size-3.5 text-muted transition-transform duration-200",
                    expanded && "rotate-180",
                  )}
                  aria-hidden
                />
              )}
            </button>
            {expanded && (
              <ul className="space-y-1.5 border-t border-border/60 bg-background px-4 py-2.5 pl-[6.75rem]">
                {row.alternatives.map((alt) => (
                  <li key={alt.itemId} className="flex items-baseline gap-3">
                    <span className="min-h-6 flex-1">
                      <ItemLink itemId={alt.itemId} />
                    </span>
                    {alt.usagePct !== undefined && (
                      <span className="font-mono text-xs tabular-nums text-muted">
                        {alt.usagePct}%
                      </span>
                    )}
                    {alt.pveFlexNote && (
                      <span className="max-w-[50%] text-xs text-muted">
                        {alt.pveFlexNote}
                      </span>
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
