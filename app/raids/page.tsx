import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PHASE_RAIDS, getRaid, raidsByPhase, bossesByRaid } from "@/data/raids";
import { PHASE_LABELS, type Phase } from "@/lib/classes";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { BossPortrait } from "@/components/raids/BossPortrait";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { BACKGROUNDS } from "@/lib/backgrounds";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "TBC Classic Raid Guides — All Raids & Boss Strategies by Phase",
    description:
      "TBC Classic raid and boss strategy guides by content phase: Karazhan, Gruul, Magtheridon, SSC, Tempest Keep, Hyjal, Black Temple, Zul'Aman and Sunwell.",
    path: "/raids",
  }),
};

export default function RaidsHub() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Raids", href: "/raids" },
  ];
  const phases = [1, 2, 3, 4, 5] as Phase[];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={BACKGROUNDS.raids}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Classic Raid Guides
        </h1>
        <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          Boss strategies for every TBC raid, organized by content phase, with
          role-by-role notes and position diagrams.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[820px] px-4 pt-10">
        <div className="space-y-4">
          {phases.map((phase) => {
            const live = raidsByPhase(phase);
            const raidIds = PHASE_RAIDS[phase] ?? [];
            return (
              <section
                key={phase}
                className="rounded-xl border border-border bg-surface p-5"
                aria-label={`Phase ${phase}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Phase {phase}
                  </h2>
                  <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
                    {PHASE_LABELS[phase]}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {raidIds.map((rid) => {
                    const raid = getRaid(rid);
                    const isLive = live.some((r) => r.id === rid);
                    if (raid && isLive) {
                      const bosses = bossesByRaid(rid);
                      return (
                        <Link
                          key={rid}
                          href={`/raids/phase-${phase}/${rid}`}
                          className="group rounded-xl border border-border bg-background p-3 transition-colors hover:border-border-strong"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                              {raid.name}
                            </span>
                            <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
                              {bosses.length} bosses
                            </span>
                          </div>
                          {/* Boss portrait strip */}
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {bosses.map((b) => (
                              <BossPortrait key={b.id} bossId={b.id} name={b.name} size="sm" />
                            ))}
                          </div>
                        </Link>
                      );
                    }
                    // Not yet written — label from the id.
                    const name = rid
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ");
                    return (
                      <span
                        key={rid}
                        className="flex items-center rounded-xl border border-dashed border-border px-3 py-4 text-sm text-muted"
                        title="Guide coming soon"
                      >
                        {name} · soon
                      </span>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
