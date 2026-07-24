import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { CompCard } from "@/components/arena/CompBits";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { compsByBracket, type Bracket } from "@/data/comps";
import { BACKGROUNDS } from "@/lib/backgrounds";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "TBC Classic Arena — Comps Tier List & Leaderboard",
    description:
      "TBC Classic arena hub: the best 2v2, 3v3 and 5v5 comps by tier, plus the live Gladiator-cutoff leaderboard and the arena points calculator.",
    path: "/arena",
  }),
};

const BRACKETS: { key: Bracket; label: string }[] = [
  { key: "2s", label: "2v2" },
  { key: "3s", label: "3v3" },
  { key: "5s", label: "5v5" },
];

export default function ArenaHub() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Arena", href: "/arena" },
  ];
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={BACKGROUNDS.arena}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Classic Arena
        </h1>
        <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          The best arena comps for every bracket, a meta tier list, and the
          live Gladiator cutoff by rating. Currently Season 2 (Merciless
          Gladiator).
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/arena/comps"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-accent-dim"
          >
            Browse all comps
          </Link>
          <Link
            href="/arena-points-calculator"
            className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-muted-strong transition-colors hover:text-foreground"
          >
            Points calculator
          </Link>
        </div>
      </PageHero>

      <main className="mx-auto max-w-[880px] px-4 pt-10">
        {BRACKETS.map(({ key, label }) => {
          const top = compsByBracket(key).slice(0, 3);
          return (
            <section key={key} className="mb-10" aria-label={`Best ${label} comps`}>
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-semibold tracking-tight">
                  Best {label} comps
                </h2>
                <Link
                  // The static facet, not ?bracket= — the query form
                  // canonicalises to the hub and can never rank.
                  href={`/arena/comps/${key}`}
                  className="text-xs text-accent underline-offset-2 hover:underline"
                >
                  All {label} comps →
                </Link>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {top.map((c) => (
                  <CompCard key={c.id} comp={c} />
                ))}
              </div>
            </section>
          );
        })}

        <section className="mb-4 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">Plan your climb</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
            Work out weekly points and weeks-to-afford in the{" "}
            <Link href="/arena-points-calculator" className="text-accent underline-offset-2 hover:underline">arena points calculator</Link>
            , pick a spec from the{" "}
            <Link href="/class-rankings" className="text-accent underline-offset-2 hover:underline">class tier list</Link>
            , and gear each spec with its arena BiS — among the top picks are{" "}
            <Link href="/shaman/elemental/pvp" className="text-accent underline-offset-2 hover:underline">Elemental Shaman</Link>,{" "}
            <Link href="/mage/arcane/pvp" className="text-accent underline-offset-2 hover:underline">Arcane Mage</Link>,{" "}
            <Link href="/druid/feral-cat/pvp" className="text-accent underline-offset-2 hover:underline">Feral Druid</Link>{" "}
            and{" "}
            <Link href="/warrior/fury/pvp" className="text-accent underline-offset-2 hover:underline">Fury Warrior</Link>.
          </p>
        </section>
      </main>
    </>
  );
}
