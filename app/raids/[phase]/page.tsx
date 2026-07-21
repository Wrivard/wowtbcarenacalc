import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { raidsByPhase, bossesByRaid, bossIcon } from "@/data/raids";
import { PHASE_LABELS, PHASES, type Phase } from "@/lib/classes";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { GameIcon } from "@/components/GameIcon";
import { ComingSoon } from "@/components/ComingSoon";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { BACKGROUNDS } from "@/lib/backgrounds";

export const dynamicParams = false;

export function generateStaticParams() {
  return PHASES.map((p) => ({ phase: `phase-${p}` }));
}

type Params = Promise<{ phase: string }>;

function parsePhase(raw: string): Phase | null {
  const m = /^phase-([1-5])$/.exec(raw);
  return m ? (Number(m[1]) as Phase) : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { phase: raw } = await params;
  const phase = parsePhase(raw);
  if (phase === null) return {};
  const live = raidsByPhase(phase);
  return buildMetadata({
    title: `TBC Phase ${phase} Raids — ${PHASE_LABELS[phase]} Boss Guides`,
    description: `TBC Classic Phase ${phase} raid guides (${PHASE_LABELS[phase]}): boss strategies, role notes and loot for every encounter.`,
    path: `/raids/phase-${phase}`,
    noindex: live.length === 0,
  });
}

export default async function PhasePage({ params }: { params: Params }) {
  const { phase: raw } = await params;
  const phase = parsePhase(raw);
  if (phase === null) notFound();
  const raids = raidsByPhase(phase);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Raids", href: "/raids" },
    { name: `Phase ${phase}`, href: `/raids/phase-${phase}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={BACKGROUNDS.raids}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Phase {phase} Raids
        </h1>
        <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          {PHASE_LABELS[phase]}
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-8">
        {raids.length > 0 ? (
          <div className="space-y-3">
            {raids.map((raid) => {
              const bosses = bossesByRaid(raid.id);
              return (
                <section
                  key={raid.id}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <Link
                    href={`/raids/phase-${phase}/${raid.id}`}
                    className="text-lg font-semibold tracking-tight text-foreground hover:text-accent"
                  >
                    {raid.name}
                  </Link>
                  <p className="mt-1 font-mono text-[11px] tracking-wider text-muted uppercase">
                    {raid.size}-player · {raid.location} · {bosses.length} bosses
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-strong">
                    {raid.blurb}
                  </p>
                  {bosses.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {bosses.map((b) => (
                        <Link
                          key={b.id}
                          href={`/raids/phase-${phase}/${raid.id}/${b.id}`}
                          title={b.name}
                          className="transition-transform hover:scale-110"
                        >
                          <GameIcon icon={bossIcon(b.id)} alt={b.name} size="small" />
                        </Link>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          <ComingSoon
            title={`Phase ${phase} raids`}
            heading={`Phase ${phase} raid guides — coming soon`}
            description={`Boss strategies for the Phase ${phase} raids (${PHASE_LABELS[phase]}) are being written. In the meantime:`}
            fallbackHref="/raids/phase-1"
            fallbackLabel="Phase 1 raid guides"
          />
        )}
      </main>
    </>
  );
}
