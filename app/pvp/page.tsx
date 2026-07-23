import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CLASSES } from "@/lib/classes";
import { classIconName, specIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getPvpBis } from "@/lib/bis";
import { BACKGROUNDS } from "@/lib/backgrounds";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "TBC Classic PvP — Arena BiS, Comps, Leaderboard & Points",
    description:
      "Everything for TBC Classic arena PvP in one place: best-in-slot gear per spec, the comp tier list, the live leaderboard, and the arena points calculator.",
    path: "/pvp",
  }),
};

const CARDS = [
  { href: "/arena/comps", title: "Arena comp tier list", desc: "The best 2v2, 3v3 and 5v5 comps, filterable, with per-comp guides." },
  { href: "/leaderboard", title: "Arena leaderboard", desc: "The live ladder and current Gladiator / Duelist / Rival / Challenger cutoffs." },
  { href: "/arena-points-calculator", title: "Arena points calculator", desc: "Exact weekly points from your rating and weeks-to-afford each piece." },
];

export default function PvpHub() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "PvP", href: "/pvp" },
  ];
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={BACKGROUNDS.arena}>
        <Breadcrumbs crumbs={crumbs} />
        <div className="mt-3 font-mono text-[11px] tracking-widest text-accent uppercase">
          PvP · Arena
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Classic PvP &amp; Arena
        </h1>
        <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          Everything for the arena in one place — resilience-stacked BiS gear
          per spec, the comp tier list, the live ladder, and the tools to plan
          your climb.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[820px] px-4 pt-8">
        {/* Gameplay tools */}
        <section aria-label="Arena tools">
          <div className="grid gap-3 sm:grid-cols-3">
            {CARDS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/50"
              >
                <span className="text-sm font-semibold text-foreground">{c.title} →</span>
                <span className="mt-1.5 block text-xs leading-relaxed text-muted">{c.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Arena BiS by spec */}
        <section className="mt-10" aria-labelledby="pvp-bis">
          <h2 id="pvp-bis" className="text-xl font-semibold tracking-tight">
            Arena BiS by spec
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-strong">
            What top-rated ladder players actually equip — usage %, gems,
            enchants, stat priorities and caps for every arena spec. Popular
            ladder picks:{" "}
            <Link href="/shaman/elemental/pvp" className="text-accent underline-offset-2 hover:underline">Elemental</Link>{" "}
            and{" "}
            <Link href="/shaman/enhancement/pvp" className="text-accent underline-offset-2 hover:underline">Enhancement Shaman</Link>,{" "}
            <Link href="/mage/arcane/pvp" className="text-accent underline-offset-2 hover:underline">Arcane Mage</Link>,{" "}
            <Link href="/paladin/retribution/pvp" className="text-accent underline-offset-2 hover:underline">Retribution Paladin</Link>,{" "}
            <Link href="/druid/feral-cat/pvp" className="text-accent underline-offset-2 hover:underline">Feral (cat) Druid</Link>{" "}
            or{" "}
            <Link href="/warrior/fury/pvp" className="text-accent underline-offset-2 hover:underline">Fury Warrior</Link>.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {CLASSES.map((cls) => {
              const pvpSpecs = cls.specs.filter((s) => s.pvp);
              if (pvpSpecs.length === 0) return null;
              return (
                <div key={cls.slug} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-center gap-2.5">
                    <GameIcon icon={classIconName(cls.slug)} alt={`${cls.name} icon`} size="medium" className="rounded-lg" />
                    <span className="text-sm font-semibold text-foreground">{cls.name}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {pvpSpecs.map((spec) => {
                      const live = Boolean(getPvpBis(cls.slug, spec.slug));
                      return (
                        <li key={spec.slug} className="flex items-center gap-2.5">
                          <GameIcon icon={specIconName(cls.slug, spec)} alt="" size="small" className="rounded" />
                          <Link
                            href={`/${cls.slug}/${spec.slug}/pvp`}
                            className="text-sm text-muted-strong transition-colors hover:text-accent"
                          >
                            {spec.name} arena BiS
                          </Link>
                          {live && (
                            <span className="ml-auto rounded-full bg-accent/15 px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-accent uppercase">
                              Live
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">Also useful</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
            Pick your{" "}
            <Link href="/guides" className="text-accent underline-offset-2 hover:underline">race, professions and addons</Link>
            , or plan a spec in the{" "}
            <Link href="/talent-calculator" className="text-accent underline-offset-2 hover:underline">talent calculator</Link>
            . Prefer raids?{" "}
            <Link href="/pve" className="text-accent underline-offset-2 hover:underline">Switch to PvE →</Link>
          </p>
        </section>
      </main>
    </>
  );
}
