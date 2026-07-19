import type { Metadata } from "next";
import Link from "next/link";
import { Swords } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BACKGROUNDS } from "@/lib/backgrounds";
import { CLASSES, allSpecs } from "@/lib/classes";
import { classIconName, specIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { AdUnit } from "@/components/AdUnit";
import { JsonLd, webApplicationJsonLd } from "@/components/seo/JsonLd";
import { filledBisRoutes } from "@/lib/bis";
import { getBuild } from "@/data/builds";
import { SITE_URL } from "@/lib/site";

const SLOT_INCONTENT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT;

export const metadata: Metadata = {
  title: {
    absolute:
      "WoW TBC Classic Hub — BiS Lists, Talent Calculator & Arena Points",
  },
  description:
    "TBC Classic tools in one place: live-snapshot PvP & PvE BiS lists for every spec, talent builds, an interactive talent calculator, and an arena points calculator.",
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

export default function Home() {
  const specCount = allSpecs().length;
  const routes = filledBisRoutes();
  const pvpCount = routes.filter((r) => r.content === "pvp").length;
  const pveCount = routes.filter((r) => r.content === "pve").length;
  const buildCount = allSpecs().filter(({ cls, spec }) =>
    getBuild(cls.slug, spec.slug),
  ).length;

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WoW TBC Classic Hub",
    url: SITE_URL,
    description:
      "BiS lists, talent builds, talent calculator and arena points calculator for WoW: The Burning Crusade Classic.",
  };

  return (
    <>
      <JsonLd
        data={[
          websiteJsonLd,
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

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link
            href="/classes"
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-accent-dim"
          >
            Browse BiS lists
          </Link>
          <Link
            href="/talent-calculator"
            className="rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground backdrop-blur transition-colors hover:bg-surface-hover"
          >
            Plan talents
          </Link>
          <Link
            href="/arena-points-calculator"
            className="rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground backdrop-blur transition-colors hover:bg-surface-hover"
          >
            Arena points calculator
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
            maxes throughput and drops from bosses. Every spec has both lists
            — pick your side:
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/classes"
              className="group relative overflow-hidden rounded-xl border border-border transition-colors hover:border-accent/60"
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${BACKGROUNDS.classes})` }}
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
                  Arena PvP BiS Lists →
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-strong">
                  Live snapshots of what gladiator-range players equip —
                  usage %, gems, enchants, stat priorities per spec.
                </span>
              </span>
            </Link>
            <Link
              href="/classes"
              className="group relative overflow-hidden rounded-xl border border-border transition-colors hover:border-accent/60"
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${BACKGROUNDS.legal})` }}
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
                  Raid BiS by Phase →
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-strong">
                  Phase 1–5 gear from top Warcraft Logs parses — Karazhan
                  through Sunwell, every spec, every slot.
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

        <AdUnit slot={SLOT_INCONTENT} className="mt-14" />

        {/* Tools */}
        <section className="mt-14" aria-labelledby="tools">
          <SectionHeading id="tools">Plan before you queue</SectionHeading>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/talent-calculator"
              className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/50"
            >
              <span className="text-sm font-semibold text-foreground">
                TBC Talent Calculator →
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                All 9 classes with real rules — 61 points at level 70, tier
                gates every 5 points, prerequisites enforced. Load a
                recommended build or share your own as a link.
              </span>
            </Link>
            <Link
              href="/arena-points-calculator"
              className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/50"
            >
              <span className="text-sm font-semibold text-foreground">
                Arena Points Calculator →
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                Exact weekly points from your 2v2/3v3/5v5 rating, the rating
                you need for any points target, and weeks-to-afford for your
                next Gladiator piece.
              </span>
            </Link>
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
