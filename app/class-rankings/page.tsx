import type { Metadata } from "next";
import Link from "next/link";
import {
  RANKING_TIERS,
  getRankingTier,
  DEFAULT_TIER,
  type RankingTier,
} from "@/data/rankings";
import { getClass, getSpec } from "@/lib/classes";
import { specIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import {
  JsonLd,
  breadcrumbJsonLd,
  itemListJsonLd,
} from "@/components/seo/JsonLd";
import { AdUnit } from "@/components/AdUnit";
import { BACKGROUNDS } from "@/lib/backgrounds";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

// ISR — the rankings are static landmark data; revalidate cheaply.
export const revalidate = 3600;

export const metadata: Metadata = {
  ...buildMetadata({
    title: "TBC Classic DPS Rankings — Best DPS Specs by Raid Tier",
    description:
      "TBC Classic PvE DPS rankings: the best DPS classes and specs for Karazhan/Gruul/Magtheridon and SSC/Tempest Keep, ranked by representative single-target parse data with links to every spec guide.",
    path: "/class-rankings",
  }),
};

type SP = Promise<Record<string, string | string[] | undefined>>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

function TierTabs({ active }: { active: string }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Raid tier">
      {RANKING_TIERS.map((t) => {
        const on = t.key === active;
        return (
          <Link
            key={t.key}
            href={t.key === DEFAULT_TIER.key ? "/class-rankings" : `/class-rankings?tier=${t.key}`}
            role="tab"
            aria-selected={on}
            className={cn(
              "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
              on
                ? "border-accent bg-accent-faint text-accent"
                : "border-border bg-surface text-muted-strong hover:text-foreground",
            )}
          >
            {t.short}
          </Link>
        );
      })}
    </div>
  );
}

function RankingBars({ tier }: { tier: RankingTier }) {
  const max = Math.max(...tier.rankings.map((r) => r.dps));
  return (
    <ol className="mt-4 space-y-2">
      {tier.rankings.map((r, i) => {
        const cls = getClass(r.classSlug);
        const specRef = getSpec(r.classSlug, r.specSlug);
        const color = cls?.color ?? "#8b8b8b";
        const pct = Math.round((r.dps / max) * 100);
        const icon = specRef ? specIconName(r.classSlug, specRef.spec) : undefined;
        return (
          <li key={`${r.classSlug}-${r.specSlug}`} className="flex items-center gap-3">
            <span className="w-5 shrink-0 text-right font-mono text-xs tabular-nums text-muted">
              {i + 1}
            </span>
            {icon && <GameIcon icon={icon} alt="" size="small" />}
            <Link
              href={`/guides/${r.classSlug}/${r.specSlug}/pve`}
              className="group relative flex h-9 min-w-0 flex-1 items-center overflow-hidden rounded-md"
              title={`${r.label} — ${r.dps} DPS · open guide`}
            >
              {/* colored fill */}
              <span
                className="absolute inset-y-0 left-0 rounded-md opacity-90 transition-[filter] group-hover:brightness-110"
                style={{ width: `${pct}%`, backgroundColor: color }}
                aria-hidden
              />
              <span
                className="relative z-10 truncate px-3 text-sm font-semibold text-black/85 drop-shadow-[0_1px_0_rgba(255,255,255,0.15)]"
              >
                {r.label}
              </span>
              <span className="relative z-10 ml-auto px-3 font-mono text-sm font-bold tabular-nums text-foreground">
                {r.dps.toLocaleString()} DPS
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

export default async function ClassRankingsPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const tierKey = first(sp.tier);
  const tier = (tierKey && getRankingTier(tierKey)) || DEFAULT_TIER;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "DPS Rankings", href: "/class-rankings" },
  ];

  const listItems = tier.rankings.map((r) => ({
    name: `${r.label} — ${r.dps} DPS`,
    url: `${SITE_URL}/guides/${r.classSlug}/${r.specSlug}/pve`,
  }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(`TBC Classic ${tier.short} DPS Rankings`, listItems),
        ]}
      />
      <PageHero image={BACKGROUNDS.raids}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Classic DPS Rankings
        </h1>
        <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          The best DPS specs for each raid tier, ranked by representative
          single-target parse data. Ordering is a settled-tier landmark, not a
          live feed — real numbers move with gear, logs and tuning. Click any
          bar to open that spec&apos;s raid guide.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[820px] px-4 pt-8">
        <TierTabs active={tier.key} />

        <section className="mt-6" aria-label={`${tier.short} DPS rankings`}>
          <h2 className="text-xl font-semibold tracking-tight">
            Phase {tier.phase} — {tier.raids}
          </h2>
          <p className="mt-2 max-w-[64ch] text-sm leading-relaxed text-muted-strong">
            {tier.blurb}
          </p>
          <RankingBars tier={tier} />
        </section>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          Methodology: values reflect the aggregate top-parse picture the
          community tracks on sites like{" "}
          <a
            href="https://www.warcraftlogs.com/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-accent underline-offset-2 hover:underline"
          >
            warcraftlogs.com
          </a>{" "}
          once a tier has settled. They assume best-in-slot-adjacent gear,
          consumables and raid buffs on a single-target patchwerk-style fight;
          your own numbers depend on gear, execution and fight design.
        </p>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT} className="mt-10" />

        <section className="mt-10 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">Read the guides</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
            Rankings tell you the ceiling; the guides tell you how to reach it.
            Every spec above links to its{" "}
            <Link href="/pve" className="text-accent underline-offset-2 hover:underline">
              PvE guide
            </Link>{" "}
            with rotation, stat caps, talents and BiS — and the{" "}
            <Link href="/raids" className="text-accent underline-offset-2 hover:underline">
              raid &amp; boss guides
            </Link>{" "}
            cover where the gear drops.
          </p>
        </section>
      </main>
    </>
  );
}
