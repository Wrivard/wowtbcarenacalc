import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLASSES, getClass } from "@/lib/classes";
import { getPvpBis } from "@/lib/bis";
import { getBuild } from "@/data/builds";
import { hasSpecGuide } from "@/data/specGuides";
import { getBestRace } from "@/data/bestRace";
import { DEFAULT_TIER } from "@/data/rankings";
import { topProfessions, professionIcon } from "@/data/professions";
import { specIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { classBackground } from "@/lib/backgrounds";
import { SITE_URL } from "@/lib/site";
import { ArrowRight } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLASSES.map((c) => ({ class: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ class: string }>;
}): Promise<Metadata> {
  const { class: classSlug } = await params;
  const cls = getClass(classSlug);
  if (!cls) return {};
  return buildMetadata({
    // "Talent Calculator" removed from both: nine class hubs carrying that
    // phrase put /warrior, /druid, /hunter and /classes into the results for
    // "tbc talent calculator" — eight pages competing on one term, with the
    // actual tool only 15th. The hubs link to it; they shouldn't rank for it.
    title: `${cls.name} TBC Classic — BiS Lists, Talents & Specs`,
    description: `Every ${cls.name} spec in TBC Classic: arena PvP BiS, phase-by-phase PvE best in slot, and recommended talent builds with full trees.`,
    path: `/${cls.slug}`,
  });
}

export default async function ClassHub({
  params,
}: {
  params: Promise<{ class: string }>;
}) {
  const { class: classSlug } = await params;
  const cls = getClass(classSlug);
  if (!cls) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Classes", href: "/classes" },
    { name: cls.name, href: `/${cls.slug}` },
  ];

  // This class's specs inside the current tier list, each with its rank out of
  // the full field — a spec's DPS number only means something next to that.
  const raidPlacements = DEFAULT_TIER.rankings
    .map((row, i) => ({ row, rank: i + 1, total: DEFAULT_TIER.rankings.length }))
    .filter(({ row }) => row.classSlug === cls.slug);
  const bestRace = getBestRace(cls.slug);
  const professions = topProfessions(cls.slug, "pvp", 4);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(
            `${cls.name} TBC Classic specs`,
            cls.specs.map((s) => ({
              name: `${s.name} ${cls.name}`,
              url: `${SITE_URL}/${cls.slug}/${s.slug}`,
            })),
          ),
        ]}
      />
      <PageHero image={classBackground(cls.slug)}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {cls.name}
          {" — TBC Classic BiS & Talents"}
        </h1>
        <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          Gear and talent resources for every {cls.name} spec: arena PvP best
          in slot, PvE BiS by raid phase, recommended builds, and the
          interactive {cls.name} talent calculator.
        </p>
        <Link
          href={`/talent-calculator/${cls.slug}`}
          className="mt-5 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-accent-dim"
        >
          Open the {cls.name} talent calculator
        </Link>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          {cls.name} specs
        </h2>
        <p className="mt-1.5 text-sm text-muted-strong">
          Pick a spec for its PvP &amp; PvE best-in-slot, in-depth guide and
          talent build.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {cls.specs.map((spec) => {
            const pvpLive = spec.pvp && Boolean(getPvpBis(cls.slug, spec.slug));
            const build = getBuild(cls.slug, spec.slug);
            const hasPvpGuide = hasSpecGuide(cls.slug, spec.slug, "pvp");
            const hasPveGuide = hasSpecGuide(cls.slug, spec.slug, "pve");
            // Compact list of what exists for this spec, as pills.
            const tags: string[] = [];
            if (hasPvpGuide || hasPveGuide) tags.push("Guide");
            if (pvpLive) tags.push("Arena BiS");
            if (spec.pve) tags.push("Raid BiS");
            if (build) tags.push("Talents");
            return (
              <Link
                key={spec.slug}
                href={`/${cls.slug}/${spec.slug}`}
                aria-label={`${spec.name} ${cls.name}`}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong hover:bg-surface-hover sm:p-5"
              >
                <div className="flex items-center gap-3">
                  <GameIcon icon={specIconName(cls.slug, spec)} alt="" size="medium" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3
                        className="truncate text-base font-semibold tracking-tight"
                        style={{ color: cls.color }}
                      >
                        {spec.name}
                      </h3>
                      <ArrowRight
                        className="size-3.5 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-muted uppercase">
                      {spec.role}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-strong"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Below the spec grid these hubs were ~186 words — a link menu and
            nothing else. Search Console has /warrior at position 17 on 46
            impressions with zero clicks, and the other eight in the same
            shape. Everything here comes from data already in the repo: no
            page renders a section it has no data for. */}
        {raidPlacements.length > 0 && (
          <section className="mt-12" aria-labelledby="raid-ranking">
            <h2 id="raid-ranking" className="text-xl font-semibold tracking-tight">
              Where {cls.name} specs rank in {DEFAULT_TIER.short}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
              Representative single-target raid DPS for {DEFAULT_TIER.raids},
              measured against every other spec in the tier list.
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[380px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-4 py-2.5 text-left text-[11px] font-medium tracking-widest text-muted uppercase">
                      Spec
                    </th>
                    <th className="px-4 py-2.5 text-right text-[11px] font-medium tracking-widest text-muted uppercase">
                      Rank
                    </th>
                    <th className="px-4 py-2.5 text-right text-[11px] font-medium tracking-widest text-muted uppercase">
                      DPS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {raidPlacements.map(({ row, rank, total }) => (
                    <tr key={row.specSlug} className="border-b border-border bg-surface last:border-b-0">
                      <td className="px-4 py-2.5">
                        <Link
                          href={`/${cls.slug}/${row.specSlug}`}
                          className="text-accent underline-offset-2 hover:underline"
                        >
                          {row.label}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-muted-strong tabular-nums">
                        {rank}/{total}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums">
                        {row.dps.toLocaleString("en-US")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-strong">
              Full context in the{" "}
              <Link href="/class-rankings" className="text-accent underline-offset-2 hover:underline">
                TBC class tier list
              </Link>
              , which covers every phase.
            </p>
          </section>
        )}

        {bestRace && (
          <section className="mt-12" aria-labelledby="best-race">
            <h2 id="best-race" className="text-xl font-semibold tracking-tight">
              Best race for a TBC {cls.name}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(["pvp", "pve"] as const).map((content) => {
                const recs = bestRace.recommendations.filter(
                  (r) => r.content === content,
                );
                if (!recs.length) return null;
                return (
                  <div key={content} className="rounded-xl border border-border bg-surface p-4">
                    <h3 className="font-mono text-[10px] tracking-widest text-muted uppercase">
                      {content === "pvp" ? "Arena PvP" : "Raid PvE"}
                    </h3>
                    <dl className="mt-2 space-y-1.5">
                      {recs.map((r) => (
                        <div key={r.faction} className="flex gap-2 text-sm">
                          <dt className="w-[4.5rem] shrink-0 text-muted">
                            {r.faction === "horde" ? "Horde" : "Alliance"}
                          </dt>
                          <dd className="font-medium text-foreground">{r.race}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-strong">
              Race is the one choice you can&apos;t respec —{" "}
              <Link
                href={`/guides/best-race/${cls.slug}`}
                className="text-accent underline-offset-2 hover:underline"
              >
                why each racial matters for {cls.name}
              </Link>{" "}
              covers the reasoning and the runners-up.
            </p>
          </section>
        )}

        {professions.length > 0 && (
          <section className="mt-12" aria-labelledby="prof">
            <h2 id="prof" className="text-xl font-semibold tracking-tight">
              Best professions for {cls.name}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
              The professions worth the levelling time on a {cls.name} in arena.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {professions.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/guides/professions/${p.slug}#leveling`}
                    className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm transition-colors hover:border-border-strong"
                  >
                    <GameIcon icon={professionIcon(p.slug)} alt="" size="small" className="size-5" />
                    <span className="text-foreground">{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav aria-label="More for this class" className="mt-12 border-t border-border pt-6 pb-4">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href={`/talent-calculator/${cls.slug}`} className="text-sm text-muted-strong transition-colors hover:text-foreground">
                TBC {cls.name} talent calculator
              </Link>
            </li>
            <li>
              <Link href={`/guides/addons/${cls.slug}`} className="text-sm text-muted-strong transition-colors hover:text-foreground">
                {cls.name} addons &amp; macros
              </Link>
            </li>
            <li>
              <Link href="/arena/comps" className="text-sm text-muted-strong transition-colors hover:text-foreground">
                Arena comp tier list
              </Link>
            </li>
            <li>
              <Link href="/arena-points-calculator" className="text-sm text-muted-strong transition-colors hover:text-foreground">
                TBC arena points calculator
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}
