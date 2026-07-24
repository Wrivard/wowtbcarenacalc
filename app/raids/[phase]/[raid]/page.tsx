import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { RAIDS, getRaid, bossesByRaid, raidBackground } from "@/data/raids";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { BossPortrait } from "@/components/raids/BossPortrait";
import { JsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return RAIDS.map((r) => ({ phase: `phase-${r.phase}`, raid: r.id }));
}

type Params = Promise<{ phase: string; raid: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { raid: raidId } = await params;
  const raid = getRaid(raidId);
  if (!raid) return {};
  return buildMetadata({
    // Phase dropped from the title (it stays in the description): with a raid
    // name like "Tempest Keep: The Eye" the suffix pushed this past the SERP
    // cutoff, and nobody searches a raid by phase number.
    title: `${raid.name} Raid Guide — TBC Classic Strategies`,
    description: `${raid.name} (Phase ${raid.phase}, ${raid.size}-player, ${raid.location}) TBC Classic raid guide: strategy for every boss with tank, healer and DPS notes.`,
    path: `/raids/phase-${raid.phase}/${raid.id}`,
  });
}

const DIFF_LABEL = ["", "Easy", "Moderate", "Hard"];

export default async function RaidPage({ params }: { params: Params }) {
  const { phase, raid: raidId } = await params;
  const raid = getRaid(raidId);
  if (!raid || `phase-${raid.phase}` !== phase) notFound();
  const bosses = bossesByRaid(raid.id);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Raids", href: "/raids" },
    { name: `Phase ${raid.phase}`, href: `/raids/phase-${raid.phase}` },
    { name: raid.name, href: `/raids/phase-${raid.phase}/${raid.id}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(
            `${raid.name} bosses (TBC Classic)`,
            bosses.map((b) => ({
              name: b.name,
              url: `${SITE_URL}/raids/phase-${raid.phase}/${raid.id}/${b.id}`,
            })),
          ),
        ]}
      />
      <PageHero image={raidBackground(raid.id)}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {raid.name} — TBC Raid Guide
        </h1>
        <p className="mt-2 font-mono text-[11px] tracking-wider text-muted uppercase">
          Phase {raid.phase} · {raid.size}-player · {raid.location}
        </p>
        <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          {raid.blurb}
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-8">
        <div className="space-y-3">
          {bosses.map((boss, i) => (
            <Link
              key={boss.id}
              href={`/raids/phase-${raid.phase}/${raid.id}/${boss.id}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background font-mono text-xs text-muted">
                {i + 1}
              </span>
              <BossPortrait bossId={boss.id} name={boss.name} size="md" />
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold tracking-tight text-foreground">
                  {boss.name}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  {boss.role}
                </span>
              </span>
              <span className="shrink-0 font-mono text-[10px] tracking-wider text-muted uppercase">
                {DIFF_LABEL[boss.difficulty]}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
