// Server-rendered body shared by PvP and PvE BiS pages. All prose comes
// from the per-spec dataset (blurb, rationale, notes, faq) so every
// generated page carries genuinely unique content, not a find-replaced
// template paragraph.

import Link from "next/link";
import type { BisList } from "@/lib/bis";
import type { ClassDef, SpecDef } from "@/lib/classes";
import { GearGrid } from "@/components/bis/GearGrid";
import { StatCaps } from "@/components/bis/StatCaps";
import { StatPriorityBars } from "@/components/bis/StatPriorityBars";
import { StatCapCalculator } from "@/components/bis/StatCapCalculator";
import { GearPriorityList } from "@/components/bis/GearPriorityList";
import { getStatCaps } from "@/data/caps";
import { FilledTalentTrees } from "@/components/talents/FilledTalentTrees";
import { PvpExtras } from "@/components/bis/PvpExtras";
import { ItemLink } from "@/components/ItemLink";
import { AdUnit } from "@/components/AdUnit";

const SLOT_RESULT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT;
const SLOT_INCONTENT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT;

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

export function BisPageBody({
  list,
  cls,
  spec,
}: {
  list: BisList;
  cls: ClassDef;
  spec: SpecDef;
}) {
  const specKey = `${cls.slug}-${spec.slug}-${list.content}${list.season ? `-s${list.season}` : ""}`;
  const contentLabel =
    list.content === "pvp"
      ? list.seasonPage
        ? `Season ${list.season} arena`
        : "arena PvP"
      : `Phase ${list.phase} PvE`;
  // Derived season pages carry no live usage percentages.
  const hasUsage = list.slots.some((s) => s.bis.usagePct !== undefined);

  return (
    <>
      {/* Gear grid */}
      <section className="mt-8" aria-label="Best in slot gear list">
        <GearGrid slots={list.slots} specKey={specKey} content={list.content} />
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {hasUsage ? (
            <>
              Usage percentages: share of surveyed {spec.name} {cls.name}s
              equipping each item
              {list.sampleSize ? ` (n=${list.sampleSize})` : ""}. Click a row
              to expand alternatives.
            </>
          ) : (
            <>
              Season {list.season} gear set, mapped from the current arena
              ladder&apos;s most-used {spec.name} {cls.name} setup. Click a row
              to expand alternatives.
            </>
          )}{" "}
          Hover any item for its full tooltip.
        </p>
      </section>

      <AdUnit slot={SLOT_RESULT} className="mt-10" />

      {/* Stat priority */}
      <section className="mt-12" aria-labelledby={`${specKey}-stats`}>
        <H2>
          <span id={`${specKey}-stats`}>
            {spec.name} {cls.name} stat priority ({contentLabel})
          </span>
        </H2>
        <ol className="mt-4 flex flex-wrap items-center gap-2 font-mono text-sm">
          {list.statPriority.map((stat, i) => (
            <li key={stat} className="flex items-center gap-2">
              {i > 0 && <span className="text-muted">&gt;</span>}
              <span className="rounded-lg border border-border bg-surface px-2.5 py-1 text-muted-strong">
                {stat}
              </span>
            </li>
          ))}
        </ol>
        <StatPriorityBars stats={list.statPriority} className="mt-5" />
        {list.statPriorityRationale && (
          <p className="mt-4 text-sm leading-relaxed text-muted-strong">
            {list.statPriorityRationale}
          </p>
        )}
        <StatCaps
          classSlug={cls.slug}
          specSlug={spec.slug}
          role={spec.role}
          content={list.content}
          specName={`${spec.name} ${cls.name}`}
          className="mt-6"
        />
        <StatCapCalculator
          caps={getStatCaps(cls.slug, spec.slug, spec.role, list.content)}
          content={list.content}
          className="mt-6"
        />
      </section>

      {/* What to buy first */}
      <GearPriorityList
        classSlug={cls.slug}
        role={spec.role}
        content={list.content}
        specName={`${spec.name} ${cls.name}`}
        className="mt-12"
      />

      {/* Gems */}
      {list.gems.length > 0 && (
      <section className="mt-12" aria-labelledby={`${specKey}-gems`}>
        <H2>
          <span id={`${specKey}-gems`}>Gems</span>
        </H2>
        <ul className="mt-4 space-y-3">
          {list.gems.map((gem) => (
            <li key={gem.itemId} className="flex flex-col gap-0.5">
              <span className="min-h-7">
                <ItemLink itemId={gem.itemId} fallbackName={gem.name} />
              </span>
              <span className="text-sm leading-relaxed text-muted">
                {gem.note}
              </span>
            </li>
          ))}
        </ul>
      </section>
      )}

      {/* Enchants */}
      {list.enchants.length > 0 && (
      <section className="mt-12" aria-labelledby={`${specKey}-enchants`}>
        <H2>
          <span id={`${specKey}-enchants`}>Enchants</span>
        </H2>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          {list.enchants.map((e) => (
            <div
              key={`${e.slot}-${e.text}`}
              className="flex flex-col gap-1 border-b border-border bg-surface px-4 py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-3"
            >
              <span className="w-24 shrink-0 font-mono text-[11px] tracking-wider text-muted uppercase">
                {e.slot}
              </span>
              <span className="text-sm text-foreground">{e.text}</span>
              <span className="text-xs leading-relaxed text-muted sm:flex-1 sm:text-right">
                {e.note}
              </span>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* PvP-only Tier-1 sections: macros, best comps, best race */}
      {list.content === "pvp" && <PvpExtras cls={cls} spec={spec} />}

      <AdUnit slot={SLOT_INCONTENT} className="mt-12" />

      {/* FAQ */}
      <section className="mt-12" aria-labelledby={`${specKey}-faq`}>
        <H2>
          <span id={`${specKey}-faq`}>
            {spec.name} {cls.name} {list.content === "pvp" ? "PvP" : "PvE"} FAQ
          </span>
        </H2>
        <div className="mt-5 space-y-6">
          {list.faq.map((f) => (
            <div key={f.question}>
              <h3 className="text-sm font-semibold text-foreground">
                {f.question}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
                {f.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended talent build — the full filled trees, not just x/y/z */}
      <FilledTalentTrees
        classSlug={cls.slug}
        specSlug={spec.slug}
        specName={`${spec.name} ${cls.name}`}
        className="mt-12"
      />

      {/* Arena points tie-in */}
      {list.content === "pvp" && (
        <section className="mt-12 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">
            Plan your arena points
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
            A full Gladiator set runs roughly 12,000 arena points. Use the{" "}
            <Link
              href="/arena-points-calculator"
              className="text-accent underline-offset-2 hover:underline"
            >
              arena points calculator
            </Link>{" "}
            to see your weekly income and how many resets your next piece
            costs.
          </p>
        </section>
      )}
    </>
  );
}
