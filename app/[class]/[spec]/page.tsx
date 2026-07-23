import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allSpecs, getSpec, PHASES, PHASE_LABELS, PHASE_ICONS, type Phase } from "@/lib/classes";
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

// A single card linking to a resource, with a leading game icon and an
// arrow affordance. The icon lets players navigate by imagery they know.
function ResourceLink({
  href,
  title,
  sub,
  icon,
  accent,
}: {
  href: string;
  title: string;
  sub: string;
  icon?: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
        accent
          ? "border-accent/40 bg-accent-faint hover:border-accent"
          : "border-border bg-surface hover:border-border-strong hover:bg-surface-hover",
      )}
    >
      {icon && <GameIcon icon={icon} alt="" size="medium" />}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-foreground">{title}</span>
        <span className="block truncate text-xs text-muted">{sub}</span>
      </span>
      <ArrowRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" aria-hidden />
    </Link>
  );
}

// Sub-heading inside a PvP/PvE section (e.g. "Best in slot", "Guide") with
// a small leading icon.
function SubHead({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 mb-2 flex items-center gap-2 first:mt-0">
      <GameIcon icon={icon} alt="" size="small" />
      <span className="font-mono text-[10px] font-medium tracking-widest text-muted-strong uppercase">
        {children}
      </span>
    </div>
  );
}

const ICON_GEAR = "inv_chest_chain_05";
const ICON_GUIDE = "inv_misc_book_11";
const ICON_TALENTS = "spell_arcane_arcane01";
const ICON_ARENA = "achievement_featsofstrength_gladiator_10";
const ICON_RAID = "inv_misc_head_dragon_01";

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

      <main className="mx-auto max-w-[820px] px-4 pt-8 pb-4">
        {/* Primary split: a PvP door and a PvE door. Each door holds its own
            Best-in-slot (per phase/season) and Guide, icon-anchored. */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* ── PvP · Arena ──────────────────────────── */}
          {(spec.pvp || pvpGuide) && (
            <section
              aria-label={`${spec.name} PvP`}
              className="rounded-2xl border border-border bg-surface/60 p-5"
            >
              <div className="flex items-center gap-2.5">
                <GameIcon icon={ICON_ARENA} alt="" size="medium" lazy={false} />
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    PvP · Arena
                  </h2>
                  <p className="text-xs text-muted">Best-in-slot &amp; the arena guide.</p>
                </div>
              </div>

              <SubHead icon={ICON_GEAR}>Best in slot</SubHead>
              {pvpLive ? (
                <ResourceLink
                  href={`/${cls.slug}/${spec.slug}/pvp`}
                  title="Arena BiS"
                  sub="Season 1–4 gear with ladder usage %"
                  icon={ICON_ARENA}
                  accent
                />
              ) : (
                <p className="rounded-lg border border-border bg-surface px-4 py-3 text-xs text-muted">
                  Arena BiS coming soon.
                </p>
              )}

              <SubHead icon={ICON_GUIDE}>Guide</SubHead>
              {pvpGuide ? (
                <ResourceLink
                  href={`/guides/${cls.slug}/${spec.slug}/pvp`}
                  title={`${spec.name} PvP guide`}
                  sub="Rotation, talents, comps & counters"
                  icon={ICON_GUIDE}
                  accent
                />
              ) : (
                <p className="rounded-lg border border-border bg-surface px-4 py-3 text-xs text-muted">
                  PvP guide coming soon.
                </p>
              )}
            </section>
          )}

          {/* ── PvE · Raid ───────────────────────────── */}
          {spec.pve && (
            <section
              aria-label={`${spec.name} PvE`}
              className="rounded-2xl border border-border bg-surface/60 p-5"
            >
              <div className="flex items-center gap-2.5">
                <GameIcon icon={ICON_RAID} alt="" size="medium" lazy={false} />
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    PvE · Raid
                  </h2>
                  <p className="text-xs text-muted">Best-in-slot per phase &amp; the raid guide.</p>
                </div>
              </div>

              <SubHead icon={ICON_GEAR}>Best in slot — by phase</SubHead>
              {pvePhases.length > 0 ? (
                <div className="space-y-1.5">
                  {pvePhases.map((p) => (
                    <ResourceLink
                      key={p}
                      href={`/${cls.slug}/${spec.slug}/pve/phase-${p}`}
                      title={`Phase ${p} BiS`}
                      sub={PHASE_LABELS[p as Phase]}
                      icon={PHASE_ICONS[p as Phase]}
                    />
                  ))}
                </div>
              ) : (
                <p className="rounded-lg border border-border bg-surface px-4 py-3 text-xs text-muted">
                  Raid BiS coming soon.
                </p>
              )}

              <SubHead icon={ICON_GUIDE}>Guide</SubHead>
              {pveGuide ? (
                <ResourceLink
                  href={`/guides/${cls.slug}/${spec.slug}/pve`}
                  title={`${spec.name} PvE guide`}
                  sub="Rotation, stat caps, professions & BiS"
                  icon={ICON_GUIDE}
                  accent
                />
              ) : (
                <p className="rounded-lg border border-border bg-surface px-4 py-3 text-xs text-muted">
                  PvE guide coming soon.
                </p>
              )}
            </section>
          )}
        </div>

        {/* Talent build — shared by both, links to the full tree + calculator */}
        {build && (
          <div className="mt-5">
            <ResourceLink
              href={`/${cls.slug}/${spec.slug}/talents`}
              title={`${spec.name} talent build (${build.summaryLabel})`}
              sub={`${build.category === "pvp" ? "Arena" : "Raid"} build · full filled tree + calculator`}
              icon={ICON_TALENTS}
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
