import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { BOSSES, getBoss, getRaid, bossesByRaid } from "@/data/raids";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { ItemLink } from "@/components/ItemLink";
import { BossPositionDiagram } from "@/components/raids/BossPositionDiagram";
import { AdUnit } from "@/components/AdUnit";
import {
  JsonLd,
  breadcrumbJsonLd,
  howToJsonLd,
} from "@/components/seo/JsonLd";
import { BACKGROUNDS } from "@/lib/backgrounds";

export const dynamicParams = false;

export function generateStaticParams() {
  return BOSSES.map((b) => ({
    phase: `phase-${b.phase}`,
    raid: b.raidId,
    boss: b.id,
  }));
}

type Params = Promise<{ phase: string; raid: string; boss: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { boss: bossId } = await params;
  const boss = getBoss(bossId);
  const raid = boss ? getRaid(boss.raidId) : undefined;
  if (!boss || !raid) return {};
  return buildMetadata({
    title: `${boss.name} Strategy — ${raid.name} TBC Classic Guide (Phase ${boss.phase})`,
    description: `How to kill ${boss.name} in ${raid.name} (TBC Classic): tank, healer and DPS strategy, phases, common mistakes and loot. ${boss.strategy.overview.slice(0, 70)}`,
    path: `/raids/phase-${boss.phase}/${raid.id}/${boss.id}`,
  });
}

function RoleNote({ label, text, color }: { label: string; text: string; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <h3 className={`text-sm font-semibold ${color}`}>{label}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">{text}</p>
    </div>
  );
}

export default async function BossPage({ params }: { params: Params }) {
  const { phase, raid: raidId, boss: bossId } = await params;
  const boss = getBoss(bossId);
  const raid = getRaid(raidId);
  if (!boss || !raid || boss.raidId !== raid.id || `phase-${boss.phase}` !== phase) {
    notFound();
  }

  const siblings = bossesByRaid(raid.id);
  const idx = siblings.findIndex((b) => b.id === boss.id);
  const next = siblings[idx + 1];

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Raids", href: "/raids" },
    { name: `Phase ${boss.phase}`, href: `/raids/phase-${boss.phase}` },
    { name: raid.name, href: `/raids/phase-${boss.phase}/${raid.id}` },
    { name: boss.name, href: `/raids/phase-${boss.phase}/${raid.id}/${boss.id}` },
  ];

  const howToSteps = boss.strategy.phases.map((p) => ({ name: p.name, text: p.description }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          howToJsonLd(
            `How to kill ${boss.name} in ${raid.name} (TBC Classic)`,
            boss.strategy.overview,
            howToSteps,
          ),
        ]}
      />
      <PageHero image={BACKGROUNDS.raids}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {boss.name} Strategy — {raid.name}
        </h1>
        <p className="mt-2 font-mono text-[11px] tracking-wider text-muted uppercase">
          Phase {boss.phase} · {raid.name} · {boss.role}
        </p>
        <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          {boss.strategy.overview}
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-8">
        {boss.hasDiagram && (
          <section className="mb-8" aria-label="Position diagram">
            <BossPositionDiagram bossId={boss.id} />
          </section>
        )}

        {/* Phases */}
        <section aria-label="Fight phases">
          <h2 className="text-xl font-semibold tracking-tight">Fight phases</h2>
          <ol className="mt-3 space-y-3">
            {boss.strategy.phases.map((p, i) => (
              <li key={p.name} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-faint font-mono text-xs font-semibold text-accent">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-strong">
                    {p.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT} className="mt-10" />

        {/* Role notes */}
        <section className="mt-10" aria-label="Role notes">
          <h2 className="text-xl font-semibold tracking-tight">By role</h2>
          <div className="mt-3 grid gap-3">
            <RoleNote label="Tanks" text={boss.strategy.tankNotes} color="text-amber-300" />
            <RoleNote label="Healers" text={boss.strategy.healerNotes} color="text-emerald-300" />
            <RoleNote label="DPS" text={boss.strategy.dpsNotes} color="text-sky-300" />
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mt-10" aria-label="Common mistakes">
          <h2 className="text-xl font-semibold tracking-tight">Common mistakes</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-strong">
            {boss.strategy.commonMistakes.map((m) => (
              <li key={m} className="flex gap-2">
                <span className="text-rose-400">✕</span>
                {m}
              </li>
            ))}
          </ul>
        </section>

        {/* Loot */}
        {boss.loot.length > 0 && (
          <section className="mt-10" aria-label="Notable loot">
            <h2 className="text-xl font-semibold tracking-tight">Notable loot</h2>
            <ul className="mt-3 space-y-2">
              {boss.loot.map((l) => (
                <li key={l.itemId} className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                  <span className="min-h-7">
                    <ItemLink itemId={l.itemId} />
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
                    {l.slot} · {l.type}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Next boss */}
        {next && (
          <div className="mt-10 border-t border-border pt-6">
            <Link
              href={`/raids/phase-${boss.phase}/${raid.id}/${next.id}`}
              className="text-sm text-accent underline-offset-2 hover:underline"
            >
              Next: {next.name} →
            </Link>
          </div>
        )}

        <p className="mt-6 text-xs text-muted">
          Strategy summarized from community knowledge (WoWWiki / Wowhead) and
          rewritten for this guide. Position diagrams are original.
        </p>
      </main>
    </>
  );
}
