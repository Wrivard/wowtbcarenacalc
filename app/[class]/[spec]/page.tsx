import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allSpecs, getSpec, PHASES, PHASE_LABELS, type Phase } from "@/lib/classes";
import { getPvpBis, getPveBis } from "@/lib/bis";
import { getBuild } from "@/data/builds";
import { hasSpecGuide } from "@/data/specGuides";
import { specIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { classBackground } from "@/lib/backgrounds";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return allSpecs().map(({ cls, spec }) => ({ class: cls.slug, spec: spec.slug }));
}

type Params = Promise<{ class: string; spec: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { class: classSlug, spec: specSlug } = await params;
  const found = getSpec(classSlug, specSlug);
  if (!found) return {};
  const { cls, spec } = found;
  return buildMetadata({
    title: `${spec.name} ${cls.name} — TBC Classic BiS, Guides & Talents`,
    description: `${spec.name} ${cls.name} hub for TBC Classic: PvP arena and PvE raid best-in-slot, in-depth spec guides, and the recommended talent build — all in one place.`,
    path: `/${cls.slug}/${spec.slug}`,
    ogImage: `/${cls.slug}/opengraph-image`,
  });
}

// A single card linking to a resource, with an arrow affordance.
function ResourceLink({
  href,
  title,
  sub,
  accent,
}: {
  href: string;
  title: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-between gap-3 rounded-lg border px-4 py-3 transition-colors",
        accent
          ? "border-accent/40 bg-accent-faint hover:border-accent"
          : "border-border bg-surface hover:border-border-strong hover:bg-surface-hover",
      )}
    >
      <span>
        <span className="block text-sm font-medium text-foreground">{title}</span>
        <span className="block text-xs text-muted">{sub}</span>
      </span>
      <ArrowRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" aria-hidden />
    </Link>
  );
}

export default async function SpecHub({ params }: { params: Params }) {
  const { class: classSlug, spec: specSlug } = await params;
  const found = getSpec(classSlug, specSlug);
  if (!found) notFound();
  const { cls, spec } = found;

  const pvpLive = spec.pvp && Boolean(getPvpBis(cls.slug, spec.slug));
  const pvpGuide = hasSpecGuide(cls.slug, spec.slug, "pvp");
  const pveGuide = hasSpecGuide(cls.slug, spec.slug, "pve");
  const build = getBuild(cls.slug, spec.slug);
  // PvE BiS: show the phases that actually have a filled list.
  const pvePhases = spec.pve
    ? PHASES.filter((p) => getPveBis(cls.slug, spec.slug, p as Phase))
    : [];

  const icon = specIconName(cls.slug, spec);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Classes", href: "/classes" },
    { name: cls.name, href: `/${cls.slug}` },
    { name: spec.name, href: `/${cls.slug}/${spec.slug}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={classBackground(cls.slug)}>
        <Breadcrumbs crumbs={crumbs} />
        <div className="mt-4 flex items-center gap-3">
          <GameIcon icon={icon} alt="" size="large" lazy={false} />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              <span style={{ color: cls.color }}>{spec.name}</span> {cls.name}
            </h1>
            <p className="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
              {spec.role} · TBC Classic
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          Everything for {spec.name} {cls.name} in one place — arena and raid
          best-in-slot, the in-depth spec guides, and the recommended talent
          build.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-8 pb-4">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* PvP column */}
          {(spec.pvp || build?.category === "pvp") && (
            <section aria-label={`${spec.name} PvP`}>
              <h2 className="flex items-center gap-2 text-sm font-semibold tracking-widest text-accent uppercase">
                PvP · Arena
              </h2>
              <div className="mt-3 space-y-2">
                {pvpGuide && (
                  <ResourceLink
                    href={`/guides/${cls.slug}/${spec.slug}/pvp`}
                    title={`${spec.name} PvP guide`}
                    sub="Rotation, talents, comps & counters"
                    accent
                  />
                )}
                {pvpLive && (
                  <ResourceLink
                    href={`/${cls.slug}/${spec.slug}/pvp`}
                    title="Arena BiS"
                    sub="Best-in-slot gear with usage %"
                  />
                )}
                {build?.category === "pvp" && (
                  <ResourceLink
                    href={`/${cls.slug}/${spec.slug}/talents`}
                    title="Arena talent build"
                    sub={`${build.summaryLabel} · full tree`}
                  />
                )}
                {!pvpGuide && !pvpLive && build?.category !== "pvp" && (
                  <p className="rounded-lg border border-border bg-surface px-4 py-3 text-xs text-muted">
                    PvP resources for this spec are coming soon.
                  </p>
                )}
              </div>
            </section>
          )}

          {/* PvE column */}
          {spec.pve && (
            <section aria-label={`${spec.name} PvE`}>
              <h2 className="flex items-center gap-2 text-sm font-semibold tracking-widest text-muted-strong uppercase">
                PvE · Raid
              </h2>
              <div className="mt-3 space-y-2">
                {pveGuide && (
                  <ResourceLink
                    href={`/guides/${cls.slug}/${spec.slug}/pve`}
                    title={`${spec.name} PvE guide`}
                    sub="Rotation, stat caps, professions & BiS"
                    accent
                  />
                )}
                {build?.category === "pve" && (
                  <ResourceLink
                    href={`/${cls.slug}/${spec.slug}/talents`}
                    title="Raid talent build"
                    sub={`${build.summaryLabel} · full tree`}
                  />
                )}
                {pvePhases.length > 0 ? (
                  <div className="rounded-lg border border-border bg-surface p-2">
                    <span className="block px-2 pt-1 pb-2 font-mono text-[10px] tracking-widest text-muted uppercase">
                      Raid BiS by phase
                    </span>
                    <ul className="space-y-0.5">
                      {pvePhases.map((p) => (
                        <li key={p}>
                          <Link
                            href={`/${cls.slug}/${spec.slug}/pve/phase-${p}`}
                            className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-muted-strong transition-colors hover:bg-surface-hover hover:text-foreground"
                          >
                            <span>Phase {p}</span>
                            <span className="truncate text-xs text-muted">{PHASE_LABELS[p as Phase]}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  !pveGuide && build?.category !== "pve" && (
                    <p className="rounded-lg border border-border bg-surface px-4 py-3 text-xs text-muted">
                      PvE resources for this spec are coming soon.
                    </p>
                  )
                )}
              </div>
            </section>
          )}
        </div>

        {/* Cross-links */}
        <div className="mt-8 flex flex-wrap gap-2 text-sm">
          <Link
            href={`/${cls.slug}`}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-muted-strong transition-colors hover:text-foreground"
          >
            ← All {cls.name} specs
          </Link>
          <Link
            href={`/talent-calculator/${cls.slug}`}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-muted-strong transition-colors hover:text-foreground"
          >
            {cls.name} talent calculator
          </Link>
        </div>
      </main>
    </>
  );
}
