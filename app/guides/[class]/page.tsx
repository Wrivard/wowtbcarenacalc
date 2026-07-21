import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLASSES, getClass } from "@/lib/classes";
import { hasSpecGuide } from "@/data/specGuides";
import { getBestRace } from "@/data/bestRace";
import { topProfessions } from "@/data/professions";
import { classIconName, specIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { classBackground } from "@/lib/backgrounds";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLASSES.map((c) => ({ class: c.slug }));
}

type Params = Promise<{ class: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { class: classSlug } = await params;
  const cls = getClass(classSlug);
  if (!cls) return {};
  return buildMetadata({
    title: `${cls.name} Guides — TBC Classic PvP & PvE (All Specs)`,
    description: `${cls.name} guides for TBC Classic: per-spec PvP and PvE playstyle, rotation, BiS, talents, macros, addons, best race and professions.`,
    path: `/guides/${cls.slug}`,
    ogImage: `/${cls.slug}/opengraph-image`,
  });
}

function GuidePill({ href, label, live }: { href: string; label: string; live: boolean }) {
  if (!live) {
    return (
      <span className="rounded-lg border border-dashed border-border px-2.5 py-1 text-xs text-muted" title="Guide coming soon">
        {label} · soon
      </span>
    );
  }
  return (
    <Link href={href} className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-strong transition-colors hover:border-accent/50 hover:text-accent">
      {label} →
    </Link>
  );
}

export default async function ClassGuideHub({ params }: { params: Params }) {
  const { class: classSlug } = await params;
  const cls = getClass(classSlug);
  if (!cls) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: cls.name, href: `/guides/${cls.slug}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={classBackground(cls.slug)}>
        <Breadcrumbs crumbs={crumbs} />
        <div className="mt-4 flex items-center gap-2.5">
          <GameIcon icon={classIconName(cls.slug)} alt={`${cls.name} icon`} size="medium" className="rounded-lg" />
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {cls.name} Guides
          </h1>
        </div>
        <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          Per-spec PvP and PvE guides — rotation, stat priority, BiS, talents,
          macros, addons, best race and professions — plus the {cls.name}
          reference pages.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-8">
        {/* Per-spec guides */}
        <section aria-label="Spec guides">
          <h2 className="text-xl font-semibold tracking-tight">Spec guides</h2>
          <div className="mt-4 space-y-2.5">
            {cls.specs.map((spec) => (
              <div key={spec.slug} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-border bg-surface p-4">
                <span className="flex items-center gap-2.5">
                  <GameIcon icon={specIconName(cls.slug, spec)} alt="" size="small" className="rounded" />
                  <span className="text-sm font-semibold text-foreground">{spec.name}</span>
                  <span className="font-mono text-[10px] tracking-wider text-muted uppercase">{spec.role}</span>
                </span>
                <span className="ml-auto flex flex-wrap gap-2">
                  {spec.pvp && (
                    <GuidePill
                      href={`/guides/${cls.slug}/${spec.slug}/pvp`}
                      label="PvP guide"
                      live={hasSpecGuide(cls.slug, spec.slug, "pvp")}
                    />
                  )}
                  {spec.pve && (
                    <GuidePill
                      href={`/guides/${cls.slug}/${spec.slug}/pve`}
                      label="PvE guide"
                      live={hasSpecGuide(cls.slug, spec.slug, "pve")}
                    />
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Class reference */}
        <section className="mt-10" aria-label="Class reference">
          <h2 className="text-xl font-semibold tracking-tight">{cls.name} reference</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {getBestRace(cls.slug) && (
              <Link href={`/guides/best-race/${cls.slug}`} className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong">
                <span className="text-sm font-semibold text-foreground">Best race →</span>
                <span className="mt-1 block text-xs text-muted">PvP &amp; PvE racials by faction.</span>
              </Link>
            )}
            <Link href={`/guides/addons/${cls.slug}`} className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong">
              <span className="text-sm font-semibold text-foreground">Addons &amp; macros →</span>
              <span className="mt-1 block text-xs text-muted">The addons and copy-paste macros for {cls.name}.</span>
            </Link>
          </div>
          <div className="mt-4 rounded-xl border border-border bg-surface p-4">
            <h3 className="text-sm font-semibold text-foreground">Best professions</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {topProfessions(cls.slug, "pve", 4).map((p) => (
                <Link key={p.slug} href={`/guides/professions/${p.slug}`} className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-muted-strong transition-colors hover:text-accent">
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-border bg-surface p-5">
          <p className="text-sm leading-relaxed text-muted-strong">
            Gear up:{" "}
            <Link href={`/${cls.slug}`} className="text-accent underline-offset-2 hover:underline">{cls.name} BiS &amp; talents</Link>
            {" "}· plan a build in the{" "}
            <Link href={`/talent-calculator?class=${cls.slug}`} className="text-accent underline-offset-2 hover:underline">{cls.name} talent calculator</Link>.
          </p>
        </section>
      </main>
    </>
  );
}
