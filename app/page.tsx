import type { Metadata } from "next";
import Link from "next/link";
import { Swords } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BACKGROUNDS } from "@/lib/backgrounds";
import { CLASSES, allSpecs } from "@/lib/classes";
import { classIconName, specIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { bossesByRaid, bossImage } from "@/data/raids";
import { BossPortrait } from "@/components/raids/BossPortrait";
import { AdUnit } from "@/components/AdUnit";
import { JsonLd, webApplicationJsonLd } from "@/components/seo/JsonLd";
import { filledBisRoutes } from "@/lib/bis";
import { getBuild } from "@/data/builds";
import { SITE_URL } from "@/lib/site";

const SLOT_INCONTENT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT;

// Deliberately does NOT say "arena points calculator" or "talent calculator".
// Search Console showed this page ranking 10th for "tbc arena point
// calculator" while /arena-points-calculator did not rank for it at all, and
// beating /talent-calculator on its own head term. The homepage was winning
// the impression and losing the click (310 impr, 1.0% CTR). It now targets
// the hub intent and leaves the tool terms to the tool pages.
export const metadata: Metadata = {
  title: {
    absolute: "TBC Classic BiS Lists, Talent Builds & Arena Guides",
  },
  // Kept under 160 by hand: this page sets `metadata` directly rather than
  // going through buildMetadata (it needs an absolute title), so it doesn't
  // get clampDescription — it was the site's only over-long description.
  description:
    "What the best TBC Classic players actually wear and spec: arena PvP snapshots, phase-by-phase raid BiS, talent builds and arena comp tier lists.",
  alternates: { canonical: "/" },
};

function SectionHeading({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 text-xl font-semibold tracking-tight text-foreground"
    >
      {children}
    </h2>
  );
}

// A compact icon-led link card for the "Explore" grid.
function FeatureCard({
  href,
  icon,
  title,
  sub,
}: {
  href: string;
  icon: string;
  title: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/50"
    >
      <GameIcon icon={icon} alt="" size="large" className="rounded-lg" />
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{title} →</span>
        <span className="block text-xs leading-relaxed text-muted">{sub}</span>
      </span>
    </Link>
  );
}

// Raids featured on the homepage — one marquee raid per bookend phase.
const FEATURED_RAIDS = [
  { phase: 1, id: "karazhan", name: "Karazhan" },
  { phase: 3, id: "black-temple", name: "Black Temple" },
  { phase: 5, id: "sunwell-plateau", name: "Sunwell Plateau" },
];

export default function Home() {
  const specCount = allSpecs().length;
  const routes = filledBisRoutes();
  const pvpCount = routes.filter((r) => r.content === "pvp").length;
  const pveCount = routes.filter((r) => r.content === "pve").length;
  const buildCount = allSpecs().filter(({ cls, spec }) =>
    getBuild(cls.slug, spec.slug),
  ).length;

  // The WebSite + Organization + VideoGame nodes come from the root layout
  // (single source of truth); the homepage no longer re-declares WebSite.
  return (
    <>
      <JsonLd
        data={[
          webApplicationJsonLd(
            "WoW TBC Classic Hub",
            SITE_URL,
            "TBC Classic BiS lists, talent builds and calculators.",
          ),
        ]}
      />

      <PageHero image={BACKGROUNDS.home} size="large">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-accent uppercase">
          <Swords className="size-3.5" aria-hidden />
          TBC Classic · Anniversary
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          TBC Classic BiS Lists, Talents &amp; Arena Tools
        </h1>
        <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          What the best players actually wear and spec — live arena
          snapshots, phase-by-phase raid BiS, recommended talent builds, and
          the calculators to plan it all.
        </p>

        {/* CTAs — the two doors first, then the calculator */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link
            href="/pvp"
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-accent-dim"
          >
            PvP &amp; Arena →
          </Link>
          <Link
            href="/pve"
            className="rounded-lg border border-accent/50 bg-accent-faint px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            PvE &amp; Raids →
          </Link>
          <Link
            href="/talent-calculator"
            className="rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground backdrop-blur transition-colors hover:bg-surface-hover"
          >
            Talent calculator
          </Link>
        </div>

        {/* Class icon strip */}
        <div className="mt-7 flex flex-wrap items-center gap-2">
          {CLASSES.map((cls) => (
            <Link
              key={cls.slug}
              href={`/${cls.slug}`}
              title={`${cls.name} BiS & talents`}
              className="rounded-lg border border-border/60 bg-background/50 p-1 backdrop-blur transition-all hover:border-accent hover:bg-surface"
            >
              <GameIcon
                icon={classIconName(cls.slug)}
                alt={`${cls.name} BiS & talents`}
                size="medium"
                className="rounded-md border-0"
                lazy={false}
              />
            </Link>
          ))}
        </div>

        {/* Live stats */}
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-wider text-muted uppercase">
          <span>
            <span className="text-accent">{specCount}</span> specs
          </span>
          <span>
            <span className="text-accent">{pvpCount}</span> PvP BiS lists
          </span>
          <span>
            <span className="text-accent">{pveCount}</span> PvE BiS lists
          </span>
          <span>
            <span className="text-accent">{buildCount}</span> talent builds
          </span>
        </div>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-12">
        {/* PvP vs PvE — the two clearly separated categories */}
        <section aria-labelledby="categories">
          <SectionHeading id="categories">
            PvP and PvE — two separate gear worlds
          </SectionHeading>
          <p className="mt-2 text-sm leading-relaxed text-muted-strong">
            TBC gearing splits cleanly in two, and so does this site. Arena
            gear stacks resilience and comes from points and honor; raid gear
            maxes throughput and drops from bosses. Pick your side — each hub
            has the BiS gear, the gameplay guides, and the tools for it:
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/pvp"
              className="group relative overflow-hidden rounded-xl border border-border transition-colors hover:border-accent/60"
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${BACKGROUNDS.arena})` }}
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30"
              />
              <span className="relative block p-5 pt-20">
                <span className="font-mono text-[10px] tracking-widest text-accent uppercase">
                  PvP · Arena
                </span>
                <span className="mt-1 block text-base font-semibold text-foreground">
                  PvP &amp; Arena hub →
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-strong">
                  Arena BiS per spec, the comp tier list, the live leaderboard,
                  and the arena points calculator.
                </span>
              </span>
            </Link>
            <Link
              href="/pve"
              className="group relative overflow-hidden rounded-xl border border-border transition-colors hover:border-accent/60"
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${BACKGROUNDS.raids})` }}
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30"
              />
              <span className="relative block p-5 pt-20">
                <span className="font-mono text-[10px] tracking-widest text-accent uppercase">
                  PvE · Raids
                </span>
                <span className="mt-1 block text-base font-semibold text-foreground">
                  PvE &amp; Raids hub →
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-strong">
                  Phase-by-phase raid BiS per spec, boss strategy guides, and
                  profession picks.
                </span>
              </span>
            </Link>
          </div>
        </section>

        {/* Class grid */}
        <section className="mt-14" aria-labelledby="by-class">
          <SectionHeading id="by-class">Browse by class</SectionHeading>
          <p className="mt-2 text-sm leading-relaxed text-muted-strong">
            Every class hub links its specs&apos; PvP and PvE BiS lists,
            recommended talent builds, and the interactive calculator.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {CLASSES.map((cls) => (
              <div
                key={cls.slug}
                className="rounded-xl border border-border bg-surface p-3.5 transition-colors hover:border-border-strong"
              >
                <Link
                  href={`/${cls.slug}`}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent"
                >
                  <GameIcon
                    icon={classIconName(cls.slug)}
                    alt={`${cls.name} class icon`}
                    size="medium"
                    className="rounded-lg"
                  />
                  {cls.name}
                </Link>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {cls.specs.map((spec) => (
                    <Link
                      key={spec.slug}
                      href={
                        spec.pvp
                          ? `/${cls.slug}/${spec.slug}/pvp`
                          : `/${cls.slug}/${spec.slug}/pve/phase-1`
                      }
                      title={`${spec.name} ${cls.name} BiS`}
                      className="rounded border border-transparent transition-all hover:border-accent"
                    >
                      <GameIcon
                        icon={specIconName(cls.slug, spec)}
                        alt={`${spec.name} ${cls.name} BiS`}
                        size="small"
                        className="rounded"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Raids & boss guides */}
        <section className="mt-14" aria-labelledby="raids">
          <SectionHeading id="raids">Raids &amp; boss strategies</SectionHeading>
          <p className="mt-2 text-sm leading-relaxed text-muted-strong">
            Every TBC raid, phase by phase — role-by-role boss strategies,
            position diagrams and loot, from Karazhan to the Sunwell.
          </p>
          <div className="mt-5 space-y-2.5">
            {FEATURED_RAIDS.map((r) => {
              const allBosses = bossesByRaid(r.id);
              // Show only bosses with real portrait art — skip icon fallbacks.
              const bosses = allBosses.filter((b) => bossImage(b.id));
              return (
                <Link
                  key={r.id}
                  href={`/raids/phase-${r.phase}/${r.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-accent/50"
                >
                  <span className="w-40 shrink-0">
                    <span className="block text-sm font-semibold text-foreground group-hover:text-accent">
                      {r.name}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
                      Phase {r.phase} · {allBosses.length} bosses
                    </span>
                  </span>
                  <span className="flex flex-1 flex-wrap gap-1.5 overflow-hidden">
                    {bosses.slice(0, 9).map((b) => (
                      <BossPortrait key={b.id} bossId={b.id} name={b.name} size="sm" />
                    ))}
                  </span>
                </Link>
              );
            })}
          </div>
          <Link
            href="/raids"
            className="mt-3 inline-block text-sm text-accent underline-offset-2 hover:underline"
          >
            All raids &amp; boss guides →
          </Link>
        </section>

        <AdUnit slot={SLOT_INCONTENT} className="mt-14" />

        {/* Tools */}
        <section className="mt-14" aria-labelledby="tools">
          <SectionHeading id="tools">Plan before you queue</SectionHeading>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/talent-calculator"
              className="flex gap-3.5 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/50"
            >
              <GameIcon icon="spell_arcane_arcane01" alt="" size="large" className="rounded-lg" />
              <span className="min-w-0">
                <span className="text-sm font-semibold text-foreground">
                  TBC Talent Calculator →
                </span>
                <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                  All 9 classes with real rules — 61 points at level 70, tier
                  gates every 5 points, prerequisites enforced. Load a
                  recommended build or share your own as a link.
                </span>
              </span>
            </Link>
            <Link
              href="/arena-points-calculator"
              className="flex gap-3.5 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/50"
            >
              <GameIcon icon="inv_misc_coin_02" alt="" size="large" className="rounded-lg" />
              <span className="min-w-0">
                <span className="text-sm font-semibold text-foreground">
                  Arena Points Calculator →
                </span>
                <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                  Exact weekly points from your 2v2/3v3/5v5 rating, the rating
                  you need for any points target, and weeks-to-afford for your
                  next Gladiator piece.
                </span>
              </span>
            </Link>
          </div>
        </section>

        {/* Explore the rest of the site */}
        <section className="mt-14" aria-labelledby="explore">
          <SectionHeading id="explore">Explore the site</SectionHeading>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <FeatureCard
              href="/class-rankings"
              icon="inv_sword_48"
              title="DPS Rankings"
              sub="Best DPS specs for every raid tier, Phase 1 to Sunwell."
            />
            <FeatureCard
              href="/arena/comps"
              icon="achievement_arena_2v2_2"
              title="Arena Comp Tier List"
              sub="The strongest 2v2, 3v3 and 5v5 comps, with full guides."
            />
            <FeatureCard
              href="/arena-points-calculator"
              icon="inv_misc_coin_02"
              title="Arena Points Calculator"
              sub="Exact weekly points from your rating, and weeks to afford each piece."
            />
            <FeatureCard
              href="/guides"
              icon="inv_misc_book_11"
              title="Class & Spec Guides"
              sub="Rotation, stat priority, best race, macros and addons."
            />
            <FeatureCard
              href="/guides/professions"
              icon="trade_blacksmithing"
              title="Professions & Leveling"
              sub="Every profession ranked, plus 1–375 leveling paths."
            />
            <FeatureCard
              href="/talent-calculator"
              icon="spell_arcane_arcane01"
              title="Talent Calculator"
              sub="All 9 classes with real TBC rules and shareable builds."
            />
          </div>
        </section>

        {/* About the data */}
        <section className="mt-14 pb-4" aria-labelledby="data">
          <SectionHeading id="data">Where the data comes from</SectionHeading>
          <p className="mt-3 text-sm leading-relaxed text-muted-strong">
            Nothing here is hand-me-down spreadsheet theory. The arena BiS
            lists aggregate what top-rated ladder players actually equip,
            refreshed from public leaderboard data with per-slot usage
            percentages. The raid lists do the same with top Warcraft Logs
            parses for each phase. Talent trees come from the wowsims
            dataset validated against Wowhead, and every recommended build is
            checked against the real allocation rules before it ships.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-strong">
            Spotted something off?{" "}
            <Link
              href="/contact"
              className="text-accent underline-offset-2 hover:underline"
            >
              Tell us
            </Link>{" "}
            — data corrections land fast.
          </p>
        </section>
      </main>
    </>
  );
}
