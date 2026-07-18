import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allSpecs, getSpec } from "@/lib/classes";
import {
  encodeBuild,
  getTalents,
  totalPoints,
  type BuildState,
} from "@/lib/talents";
import { buildValid } from "@/lib/talent-rules";
import { getBuild } from "@/data/builds";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/seo/JsonLd";
import { TalentTreeGrid } from "@/components/talents/TalentTreeGrid";
import { ComingSoon } from "@/components/ComingSoon";
import { SpecCrossLinks } from "@/components/SpecCrossLinks";
import { AdUnit } from "@/components/AdUnit";

const SLOT_INCONTENT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT;

export const dynamicParams = false;

export function generateStaticParams() {
  return allSpecs().map(({ cls, spec }) => ({
    class: cls.slug,
    spec: spec.slug,
  }));
}

type Params = Promise<{ class: string; spec: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { class: classSlug, spec: specSlug } = await params;
  const found = getSpec(classSlug, specSlug);
  if (!found) return {};
  const { cls, spec } = found;
  const build = getBuild(cls.slug, spec.slug);
  return {
    title: `${spec.name} ${cls.name} Talents — Best TBC Talent Build & Guide`,
    description: `Recommended ${spec.name} ${cls.name} talent build for TBC Classic${build ? ` (${build.summaryLabel})` : ""} — full tree, point-by-point reasoning, and a shareable build link.`,
    alternates: { canonical: `/${cls.slug}/${spec.slug}/talents` },
    ...(build ? {} : { robots: { index: false, follow: true } }),
  };
}

/** Resolve a build's id→rank maps into BuildState, failing loudly on typos. */
function resolveRanks(
  classSlug: string,
  ranksByTree: Record<string, number>[],
): BuildState {
  const talents = getTalents(classSlug);
  if (!talents) throw new Error(`no talents for ${classSlug}`);
  return talents.trees.map((tree, ti) => {
    const map = ranksByTree[ti] ?? {};
    const claimed = new Set(Object.keys(map));
    const ranks = tree.talents.map((t) => {
      claimed.delete(t.id);
      return Math.min(map[t.id] ?? 0, t.maxRank);
    });
    if (claimed.size > 0)
      throw new Error(
        `build for ${classSlug} references unknown talents: ${[...claimed].join(", ")}`,
      );
    return ranks;
  });
}

export default async function TalentBuildPage({ params }: { params: Params }) {
  const { class: classSlug, spec: specSlug } = await params;
  const found = getSpec(classSlug, specSlug);
  if (!found) notFound();
  const { cls, spec } = found;
  const build = getBuild(cls.slug, spec.slug);
  const talents = getTalents(cls.slug);
  if (!talents) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Classes", href: "/classes" },
    { name: cls.name, href: `/${cls.slug}` },
    {
      name: `${spec.name} Talents`,
      href: `/${cls.slug}/${spec.slug}/talents`,
    },
  ];

  let state: BuildState | null = null;
  let encoded = "";
  if (build) {
    state = resolveRanks(cls.slug, build.ranks);
    if (!buildValid(state, talents.trees))
      throw new Error(
        `curated build for ${cls.slug}/${spec.slug} violates talent rules`,
      );
    encoded = encodeBuild(state);
  }

  const notesByTree: Record<string, string>[] = talents.trees.map((_, ti) =>
    Object.fromEntries(
      (build?.notes ?? [])
        .filter((n) => n.treeIndex === ti)
        .map((n) => [n.talentId, n.note]),
    ),
  );

  return (
    <main className="mx-auto max-w-[1200px] px-4">
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          ...(build ? [faqJsonLd(build.faq)] : []),
        ]}
      />
      <header className="pt-10 pb-6 sm:pt-14">
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {spec.name} {cls.name} Talents — TBC Classic Build
        </h1>
        {build && (
          <>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tracking-wider text-muted uppercase">
              <span className="text-accent">{build.summaryLabel}</span>
              <span>{totalPoints(state!)} points</span>
              <span>
                Updated{" "}
                {new Date(build.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-strong sm:text-base">
              {build.blurb}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={`/talent-calculator/${cls.slug}?b=${encoded}`}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-accent-dim"
              >
                Open in the talent calculator
              </Link>
              <span className="rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs text-muted">
                {encoded}
              </span>
            </div>
          </>
        )}
      </header>

      {build && state ? (
        <>
          <div className="flex snap-x gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {talents.trees.map((tree, ti) => (
              <div key={tree.treeName} className="shrink-0 snap-start">
                <TalentTreeGrid
                  tree={tree}
                  ranks={state![ti]}
                  notes={notesByTree[ti]}
                />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            Hover a talent for its tooltip — highlighted notes explain the
            build&apos;s key picks.
          </p>

          <AdUnit slot={SLOT_INCONTENT} className="mt-10" />

          <section className="mt-12 max-w-[720px]" aria-labelledby="build-faq">
            <h2
              id="build-faq"
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              {spec.name} {cls.name} build FAQ
            </h2>
            <div className="mt-5 space-y-6">
              {build.faq.map((f) => (
                <div key={f.question}>
                  <h3 className="text-sm font-semibold text-foreground">
                    {f.question}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <ComingSoon
          title={`${spec.name} ${cls.name} talent build`}
          fallbackHref={`/talent-calculator/${cls.slug}`}
          fallbackLabel={`Build your own in the ${cls.name} calculator`}
        />
      )}

      <div className="max-w-[720px]">
        <SpecCrossLinks cls={cls} spec={spec} current="talents" />
      </div>
    </main>
  );
}
