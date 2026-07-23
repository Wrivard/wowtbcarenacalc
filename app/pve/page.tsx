import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CLASSES, PHASES, PHASE_LABELS } from "@/lib/classes";
import { classIconName, specIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { BACKGROUNDS } from "@/lib/backgrounds";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "TBC Classic PvE — Raid BiS by Phase, Boss Guides & Professions",
    description:
      "Everything for TBC Classic raiding in one place: phase-by-phase best-in-slot gear per spec, raid boss strategy guides, and profession picks.",
    path: "/pve",
  }),
};

export default function PveHub() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "PvE", href: "/pve" },
  ];
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={BACKGROUNDS.raids}>
        <Breadcrumbs crumbs={crumbs} />
        <div className="mt-3 font-mono text-[11px] tracking-widest text-muted-strong uppercase">
          PvE · Raids
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Classic PvE &amp; Raids
        </h1>
        <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          Everything for raiding in one place — phase-by-phase BiS gear per
          spec, boss strategy guides, and the professions that back them up.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[820px] px-4 pt-8">
        {/* Gameplay tools */}
        <section aria-label="Raid tools">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/raids" className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/50">
              <span className="text-sm font-semibold text-foreground">Raid &amp; boss guides →</span>
              <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                Role-by-role boss strategies with position diagrams, by phase —
                Karazhan through Sunwell.
              </span>
            </Link>
            <Link href="/guides/professions" className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/50">
              <span className="text-sm font-semibold text-foreground">Professions tier list →</span>
              <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                Which professions give the best raid benefits (Drums, sockets,
                spellthread) and which classes want them.
              </span>
            </Link>
          </div>
        </section>

        {/* Raid BiS by phase */}
        <section className="mt-10" aria-label="Raid BiS by phase">
          <h2 className="text-xl font-semibold tracking-tight">Raid BiS by phase</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-strong">
            Jump straight to a phase, or browse a spec below.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {PHASES.map((p) => (
              <Link
                key={p}
                href={`/raids/phase-${p}`}
                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted-strong transition-colors hover:border-border-strong hover:text-foreground"
                title={PHASE_LABELS[p]}
              >
                Phase {p}
              </Link>
            ))}
          </div>
        </section>

        {/* Raid BiS by spec */}
        <section className="mt-8" aria-labelledby="pve-bis">
          <h2 id="pve-bis" className="text-xl font-semibold tracking-tight">
            Raid BiS by spec
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-strong">
            Phase-by-phase best in slot from top parses — every spec, every
            slot, with gems, enchants, caps and the talent build. Not sure which
            spec to bring? The{" "}
            <Link href="/class-rankings" className="text-accent underline-offset-2 hover:underline">DPS rankings</Link>{" "}
            show what tops the meters each phase.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {CLASSES.map((cls) => {
              const pveSpecs = cls.specs.filter((s) => s.pve);
              if (pveSpecs.length === 0) return null;
              return (
                <div key={cls.slug} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-center gap-2.5">
                    <GameIcon icon={classIconName(cls.slug)} alt={`${cls.name} icon`} size="medium" className="rounded-lg" />
                    <span className="text-sm font-semibold text-foreground">{cls.name}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {pveSpecs.map((spec) => (
                      <li key={spec.slug} className="flex items-center gap-2.5">
                        <GameIcon icon={specIconName(cls.slug, spec)} alt="" size="small" className="rounded" />
                        <Link
                          href={`/${cls.slug}/${spec.slug}/pve/phase-1`}
                          className="text-sm text-muted-strong transition-colors hover:text-accent"
                        >
                          {spec.name} raid BiS
                        </Link>
                      </li>
                    ))}
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
            <Link href="/guides" className="text-accent underline-offset-2 hover:underline">race and addons</Link>
            , or plan a spec in the{" "}
            <Link href="/talent-calculator" className="text-accent underline-offset-2 hover:underline">talent calculator</Link>
            . Prefer arena?{" "}
            <Link href="/pvp" className="text-accent underline-offset-2 hover:underline">Switch to PvP →</Link>
          </p>
        </section>
      </main>
    </>
  );
}
