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

      <main className="mx-auto max-w-[760px] px-4 pt-8 pb-4">
        {/* Two categories: BiS List and Guide. Each splits into PvP / PvE. */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* ── BiS List ─────────────────────────────── */}
          <section
            aria-label={`${spec.name} best in slot`}
            className="rounded-2xl border border-border bg-surface/60 p-5"
          >
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              BiS Lists
            </h2>
            <p className="mt-1 text-xs text-muted">Best-in-slot gear, gems &amp; enchants.</p>

            {(spec.pvp) && (
              <div className="mt-4">
                <span className="font-mono text-[10px] tracking-widest text-accent uppercase">
                  PvP · Arena
                </span>
                <div className="mt-2">
                  {pvpLive ? (
                    <ResourceLink
                      href={`/${cls.slug}/${spec.slug}/pvp`}
                      title="Arena BiS"
                      sub="Most-used gear with usage %"
                      accent
                    />
                  ) : (
                    <p className="rounded-lg border border-border bg-surface px-4 py-3 text-xs text-muted">
                      Arena BiS coming soon.
                    </p>
                  )}
                </div>
              </div>
            )}

            {spec.pve && (
              <div className="mt-4">
                <span className="font-mono text-[10px] tracking-widest text-muted-strong uppercase">
                  PvE · Raid
                </span>
                {pvePhases.length > 0 ? (
                  <ul className="mt-2 space-y-0.5 rounded-lg border border-border bg-surface p-2">
                    {pvePhases.map((p) => (
                      <li key={p}>
                        <Link
                          href={`/${cls.slug}/${spec.slug}/pve/phase-${p}`}
                          className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-muted-strong transition-colors hover:bg-surface-hover hover:text-foreground"
                        >
                          <span>Phase {p} BiS</span>
                          <span className="truncate text-xs text-muted">{PHASE_LABELS[p as Phase]}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 rounded-lg border border-border bg-surface px-4 py-3 text-xs text-muted">
                    Raid BiS coming soon.
                  </p>
                )}
              </div>
            )}
          </section>

          {/* ── Guides ───────────────────────────────── */}
          <section
            aria-label={`${spec.name} guides`}
            className="rounded-2xl border border-border bg-surface/60 p-5"
          >
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Guides
            </h2>
            <p className="mt-1 text-xs text-muted">Rotation, talents, caps &amp; playstyle.</p>

            {(spec.pvp || pvpGuide) && (
              <div className="mt-4">
                <span className="font-mono text-[10px] tracking-widest text-accent uppercase">
                  PvP · Arena
                </span>
                <div className="mt-2">
                  {pvpGuide ? (
                    <ResourceLink
                      href={`/guides/${cls.slug}/${spec.slug}/pvp`}
                      title={`${spec.name} PvP guide`}
                      sub="Rotation, talents, comps & counters"
                      accent
                    />
                  ) : (
                    <p className="rounded-lg border border-border bg-surface px-4 py-3 text-xs text-muted">
                      PvP guide coming soon.
                    </p>
                  )}
                </div>
              </div>
            )}

            {spec.pve && (
              <div className="mt-4">
                <span className="font-mono text-[10px] tracking-widest text-muted-strong uppercase">
                  PvE · Raid
                </span>
                <div className="mt-2">
                  {pveGuide ? (
                    <ResourceLink
                      href={`/guides/${cls.slug}/${spec.slug}/pve`}
                      title={`${spec.name} PvE guide`}
                      sub="Rotation, stat caps, professions & BiS"
                      accent
                    />
                  ) : (
                    <p className="rounded-lg border border-border bg-surface px-4 py-3 text-xs text-muted">
                      PvE guide coming soon.
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Talent build — shared by both, links to the full tree + calculator */}
        {build && (
          <div className="mt-5">
            <ResourceLink
              href={`/${cls.slug}/${spec.slug}/talents`}
              title={`${spec.name} talent build (${build.summaryLabel})`}
              sub={`${build.category === "pvp" ? "Arena" : "Raid"} build · full filled tree + calculator`}
            />
          </div>
        )}

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
