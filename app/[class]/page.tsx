import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLASSES, PHASES, getClass } from "@/lib/classes";
import { getPvpBis } from "@/lib/bis";
import { getBuild } from "@/data/builds";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { classBackground } from "@/lib/backgrounds";
import { SITE_URL } from "@/lib/site";

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
  return {
    title: `${cls.name} TBC Classic — BiS Lists, Talents & Talent Calculator`,
    description: `Every ${cls.name} spec in TBC Classic: arena PvP BiS, phase-by-phase PvE best in slot, recommended talent builds, and a ${cls.name} talent calculator.`,
    alternates: { canonical: `/${cls.slug}` },
  };
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
              url: `${SITE_URL}/${cls.slug}/${s.slug}/talents`,
            })),
          ),
        ]}
      />
      <PageHero image={classBackground(cls.slug)}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {cls.name} — TBC Classic BiS &amp; Talents
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
      <div className="space-y-4">
        {cls.specs.map((spec) => {
          const pvpLive = Boolean(getPvpBis(cls.slug, spec.slug));
          const buildLive = Boolean(getBuild(cls.slug, spec.slug));
          return (
            <section
              key={spec.slug}
              className="rounded-xl border border-border bg-surface p-4 sm:p-5"
              aria-label={`${spec.name} ${cls.name}`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-lg font-semibold tracking-tight">
                  {spec.name}
                </h2>
                <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
                  {spec.role}
                </span>
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <li>
                  <Link
                    href={`/${cls.slug}/${spec.slug}/talents`}
                    className="text-muted-strong transition-colors hover:text-foreground"
                  >
                    Talent build{buildLive ? "" : " (soon)"}
                  </Link>
                </li>
                {spec.pvp && (
                  <li>
                    <Link
                      href={`/${cls.slug}/${spec.slug}/pvp`}
                      className="text-muted-strong transition-colors hover:text-foreground"
                    >
                      PvP BiS{pvpLive ? "" : " (soon)"}
                    </Link>
                  </li>
                )}
                {spec.pve &&
                  PHASES.map((p) => (
                    <li key={p}>
                      <Link
                        href={`/${cls.slug}/${spec.slug}/pve/phase-${p}`}
                        className="text-muted transition-colors hover:text-foreground"
                      >
                        P{p} BiS
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          );
        })}
      </div>
      </main>
    </>
  );
}
