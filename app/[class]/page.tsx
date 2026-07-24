import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLASSES, getClass } from "@/lib/classes";
import { getPvpBis } from "@/lib/bis";
import { getBuild } from "@/data/builds";
import { hasSpecGuide } from "@/data/specGuides";
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
      </main>
    </>
  );
}
