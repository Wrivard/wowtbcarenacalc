import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { BOSSES, getBoss, getRaid, bossesByRaid, raidBackground } from "@/data/raids";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { BossPortrait } from "@/components/raids/BossPortrait";
import { ItemLink } from "@/components/ItemLink";
import { BossPositionDiagram } from "@/components/raids/BossPositionDiagram";
import { bossLootInBis } from "@/lib/interlinks";
import { GameIcon } from "@/components/GameIcon";
import { AdUnit } from "@/components/AdUnit";
import {
  JsonLd,
  breadcrumbJsonLd,
  howToJsonLd,
  articleJsonLd,
} from "@/components/seo/JsonLd";

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
    description: `How to kill ${boss.name} in ${raid.name} (TBC Classic): tank, healer and DPS strategy, phases, common mistakes and loot. ${boss.strategy.overview}`,
    path: `/raids/phase-${boss.phase}/${raid.id}/${boss.id}`,
    ogType: "article",
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
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = siblings[idx + 1];
  const lootInBis = bossLootInBis(boss.name, boss.phase);

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
          articleJsonLd(
            `${boss.name} Strategy — ${raid.name} (TBC Classic)`,
            boss.strategy.overview,
            `/raids/phase-${boss.phase}/${raid.id}/${boss.id}`,
            { section: raid.name, techArticle: true },
          ),
          howToJsonLd(
            `How to kill ${boss.name} in ${raid.name} (TBC Classic)`,
            boss.strategy.overview,
            howToSteps,
          ),
        ]}
      />
      <PageHero image={raidBackground(raid.id)}>
        <Breadcrumbs crumbs={crumbs} />
        <div className="mt-4 flex items-center gap-3">
          <BossPortrait bossId={boss.id} name={boss.name} size="lg" lazy={false} />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {boss.name} Strategy — {raid.name}
            </h1>
            <p className="mt-1 font-mono text-[11px] tracking-wider text-muted uppercase">
              Phase {boss.phase} · {raid.name} · {boss.role}
            </p>
          </div>
        </div>
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
          <h2 className="text-xl font-semibold tracking-tight">{boss.name} fight phases</h2>
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
          <h2 className="text-xl font-semibold tracking-tight">{boss.name} tank, healer &amp; DPS strategy</h2>
          <div className="mt-3 grid gap-3">
            <RoleNote label="Tanks" text={boss.strategy.tankNotes} color="text-amber-300" />
            <RoleNote label="Healers" text={boss.strategy.healerNotes} color="text-emerald-300" />
            <RoleNote label="DPS" text={boss.strategy.dpsNotes} color="text-sky-300" />
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mt-10" aria-label="Common mistakes">
          <h2 className="text-xl font-semibold tracking-tight">Common {boss.name} mistakes</h2>
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
            <h2 className="text-xl font-semibold tracking-tight">{boss.name} loot ({raid.name})</h2>
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

        {/* Best-in-slot drops — the reverse of the BiS gear grid's "how to
            get" link, gear-first. The item icon is the anchor; each spec is a
            class-icon link into its BiS list, so the gear→spec connection is
            visible at a glance instead of a wall of text links. */}
        {lootInBis.length > 0 && (
          <section className="mt-10" aria-labelledby="boss-bis">
            <h2 id="boss-bis" className="text-xl font-semibold tracking-tight">
              {boss.name} best-in-slot drops
            </h2>
            <p className="mt-1.5 text-sm text-muted-strong">
              Loot from this fight that appears in a Phase {boss.phase}{" "}
              best-in-slot list — and the specs that want it.
            </p>
            <div className="mt-4 space-y-3">
              {lootInBis.map(({ itemId, specs }) => (
                <div
                  key={itemId}
                  className="rounded-xl border border-border bg-surface p-4"
                >
                  <ItemLink itemId={itemId} />
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 font-mono text-[10px] tracking-wider text-muted uppercase">
                      BiS for
                    </span>
                    {specs.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        title={`${s.specName} ${s.className} Phase ${boss.phase} BiS`}
                        aria-label={`${s.specName} ${s.className} Phase ${boss.phase} best in slot`}
                        className="transition-transform hover:-translate-y-0.5"
                      >
                        <GameIcon
                          icon={s.icon}
                          alt={`${s.specName} ${s.className}`}
                          size="small"
                          className="size-6"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Prev / next + the full boss order for this raid */}
        <nav
          aria-label="More from this raid"
          className="mt-10 border-t border-border pt-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            {prev ? (
              <Link
                href={`/raids/phase-${boss.phase}/${raid.id}/${prev.id}`}
                className="text-sm text-accent underline-offset-2 hover:underline"
              >
                ← {prev.name}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/raids/phase-${boss.phase}/${raid.id}/${next.id}`}
                className="text-sm text-accent underline-offset-2 hover:underline"
              >
                Next: {next.name} →
              </Link>
            )}
          </div>

          <h2 className="mt-6 text-[11px] font-medium tracking-widest text-muted uppercase">
            All {raid.name} bosses
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {siblings
              .filter((b) => b.id !== boss.id)
              .map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/raids/phase-${boss.phase}/${raid.id}/${b.id}`}
                    className="text-sm text-muted-strong transition-colors hover:text-foreground"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
          </ul>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/pve" className="text-sm text-muted-strong transition-colors hover:text-foreground">
                Phase {boss.phase} raid BiS by spec
              </Link>
            </li>
            <li>
              <Link
                href="/class-rankings"
                className="text-sm text-muted-strong transition-colors hover:text-foreground"
              >
                TBC DPS rankings
              </Link>
            </li>
            <li>
              <Link
                href="/guides/professions"
                className="text-sm text-muted-strong transition-colors hover:text-foreground"
              >
                Profession guides
              </Link>
            </li>
          </ul>
        </nav>

        <p className="mt-6 text-xs text-muted">
          Strategy summarized from community knowledge (WoWWiki / Wowhead) and
          rewritten for this guide. Position diagrams are original.
        </p>
      </main>
    </>
  );
}
