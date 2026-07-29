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

import Link from "next/link";
import {
  ChevronDown,
  TriangleAlert,
  MapPin,
  ShieldOff,
  Shield,
} from "lucide-react";
import type { BisSlot } from "@/lib/bis";
import { ItemLink } from "@/components/ItemLink";
import { getItemSource, formatItemSource } from "@/data/itemSources";
import { sourceLink } from "@/lib/raid-links";
import { trackEvent } from "@/lib/gtag";
import { cn } from "@/lib/utils";

// "How to get" line. Raid drops link to the boss guide (or the raid, when we
// publish no page for that boss) — the reader's next question is always "so
// how do I kill it", and it's the only internal link on the page that points
// at the raid section.
function ItemSourceLine({ itemId }: { itemId: number }) {
  const sources = getItemSource(itemId);
  if (!sources) return null;
  return (
    <span className="flex items-start gap-1.5 text-xs text-muted">
      <MapPin className="mt-0.5 size-3 shrink-0 text-muted" aria-hidden />
      <span>
        {sources.map((s, i) => {
          const link = sourceLink(s);
          return (
            <span key={`${s.type}-${s.location}-${i}`}>
              {i > 0 && " · "}
              {formatItemSource(s)}
              {link && (
                <>
                  {" "}
                  <Link
                    href={link.href}
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    {link.label} guide
                  </Link>
                </>
              )}
            </span>
          );
        })}
      </span>
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
  role,
}: {
  slots: BisSlot[];
  specKey: string;
  content: "pvp" | "pve";
  /** Decides how a PvE resilience row reads — see resilienceNote below. */
  role?: string;
}) {
  const isTank = role === "Tank";
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {slots.map((row) => {
        const hasAlts = row.alternatives.length > 0;
        const hasSource = getItemSource(row.bis.itemId) !== null;
        const expandable = hasAlts || hasSource;
        // Driven by the snapshot's own isPvP flag, set in build-bis.mjs.
        // This replaced a hand-curated list of 22 "known offender" item ids,
        // which could only ever warn about the raid pieces someone had
        // already noticed.
        const raidWarning = content === "pvp" && row.raidPick === true;
        const resilienceAlt = row.alternatives.find(
          (a) => a.itemId === row.resilienceAlt,
        );

        // The PvE mirror of the raid warning, and it has to cut both ways.
        // Resilience reduces your chance to be critically hit by NPCs in TBC,
        // so a tank wearing arena gear is buying crit immunity with it, while
        // a mage in the same bracers is carrying a stat that does nothing.
        // Same item, opposite verdict — never one blanket warning.
        const pveResi = content === "pve" ? row.bis.resilience : undefined;
        const cleanAlt = pveResi
          ? row.alternatives.find((a) => !a.resilience)
          : undefined;

        const line = (
          <>
            <span className="w-16 shrink-0 font-mono text-[10px] tracking-wider text-muted uppercase sm:w-20 sm:text-[11px]">
              {SLOT_LABEL[row.slot] ?? row.slot}
            </span>
            <span className="min-h-7 flex-1">
              <ItemLink itemId={row.bis.itemId} fallbackName={row.bis.name} />
            </span>
            {/* Before the %, so the caveat is read with the number rather
                than after the reader has already taken it as a shopping
                list. */}
            {raidWarning && (
              <span
                className="hidden shrink-0 items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-amber-500/90 uppercase sm:inline-flex"
                title="Most-equipped on the ladder, but it is raid gear — no resilience"
              >
                <ShieldOff className="size-2.5" aria-hidden />
                No resilience
              </span>
            )}
            {pveResi !== undefined && (
              <span
                className={cn(
                  "hidden shrink-0 items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[9px] tracking-wider uppercase sm:inline-flex",
                  isTank
                    ? "border-accent/30 bg-accent/10 text-accent"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-500/90",
                )}
                title={
                  isTank
                    ? `${pveResi} resilience — counts toward crit immunity`
                    : `${pveResi} resilience — does nothing in PvE`
                }
              >
                <Shield className="size-2.5" aria-hidden />
                {pveResi} resi
              </span>
            )}
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
              This is the most-equipped item for the slot, but it is raid gear
              with no resilience.{" "}
              {resilienceAlt ? (
                <>
                  For a pure-arena setup take{" "}
                  <span className="font-medium">
                    {resilienceAlt.name ?? "the arena piece"}
                  </span>{" "}
                  below
                  {resilienceAlt.usagePct !== undefined
                    ? ` (${resilienceAlt.usagePct}%)`
                    : ""}
                  .
                </>
              ) : (
                "Prefer the season arena set piece for this slot."
              )}
            </span>
          </div>
        );

        const resilienceNote = pveResi !== undefined && (
          <div
            className={cn(
              "flex items-start gap-2 border-t px-3 py-2 text-[11px] leading-relaxed sm:px-4",
              isTank
                ? "border-accent/20 bg-accent/[0.06] text-accent/90"
                : "border-amber-500/20 bg-amber-500/[0.06] text-amber-500/90",
            )}
          >
            <Shield className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            {isTank ? (
              <span>
                Carries {pveResi} resilience. In TBC that reduces your chance
                to be critically hit by bosses too, so it counts toward crit
                immunity and frees up the defence you would otherwise need
                elsewhere — which is why tanks raid in arena gear.
              </span>
            ) : (
              <span>
                Carries {pveResi} resilience, which does nothing in PvE — that
                much of its budget is dead on a raid boss. Top parsers wear it
                anyway because the rest of the item still wins the slot
                {cleanAlt
                  ? `; ${cleanAlt.name} is the closest option without it.`
                  : "."}
              </span>
            )}
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
              {resilienceNote}
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
            {resilienceNote}
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
