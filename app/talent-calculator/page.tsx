import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { CLASSES, getClass } from "@/lib/classes";
import { getTalents } from "@/lib/talents";
import {
  JsonLd,
  webApplicationJsonLd,
  itemListJsonLd,
  breadcrumbJsonLd,
} from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { classBackground } from "@/lib/backgrounds";
import { ClassSelect } from "@/components/talents/ClassSelect";
import { TalentCalculator } from "@/components/talents/TalentCalculator";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "TBC Classic Talent Calculator — All 9 Classes",
  description:
    "Free TBC Classic talent calculator for all 9 classes. Pick a class, plan your 61 points with real tier and prerequisite rules, then share your build with a link.",
  path: "/talent-calculator",
});

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Talent Calculator", href: "/talent-calculator" },
];

type SP = Promise<Record<string, string | string[] | undefined>>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

const DEFAULT_CLASS = "warrior";

export default async function TalentCalculatorPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const sp = await searchParams;
  const classSlug = first(sp.class);
  const cls = getClass(classSlug ?? "") ?? getClass(DEFAULT_CLASS)!;
  const talents = getTalents(cls.slug)!;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(CRUMBS),
          webApplicationJsonLd(
            "TBC Classic Talent Calculator",
            `${SITE_URL}/talent-calculator`,
            "Interactive talent calculator for WoW TBC Classic with shareable build links.",
          ),
          itemListJsonLd(
            "TBC talent calculators by class",
            CLASSES.map((c) => ({
              name: `${c.name} talent calculator`,
              url: `${SITE_URL}/talent-calculator?class=${c.slug}`,
            })),
          ),
        ]}
      />
      <PageHero image={classBackground(cls.slug)} contentClassName="max-w-[1200px]">
        <Breadcrumbs crumbs={CRUMBS} />
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          {cls.name} Talent Calculator — TBC Classic
        </h1>
        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted-strong">
          Pick a class and plan a build with the real rules — 61 points at
          level 70, tiers unlocking every 5 points, prerequisites enforced —
          then share it as a link.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[1200px] px-4 pt-6">
        <div className="mb-6">
          <ClassSelect value={cls.slug} />
        </div>

        {/* key by class so the calculator resets cleanly on class change */}
        <Suspense key={cls.slug}>
          <TalentCalculator cls={talents} className={cls.name} />
        </Suspense>

        {/* Cross-links: recommended builds per spec of the current class */}
        <nav aria-label="Recommended builds" className="mt-10 border-t border-border pt-6 pb-4">
          <h2 className="text-[11px] font-medium tracking-widest text-muted uppercase">
            Recommended {cls.name} builds
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {cls.specs.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${cls.slug}/${s.slug}/talents`}
                  className="text-sm text-muted-strong transition-colors hover:text-foreground"
                >
                  {s.name} {cls.name} build
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/${cls.slug}`}
                className="text-sm text-accent underline-offset-2 hover:underline"
              >
                All {cls.name} BiS lists →
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}
