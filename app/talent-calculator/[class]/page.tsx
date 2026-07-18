import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLASSES, getClass } from "@/lib/classes";
import { getTalents } from "@/lib/talents";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  JsonLd,
  breadcrumbJsonLd,
  webApplicationJsonLd,
} from "@/components/seo/JsonLd";
import { TalentCalculator } from "@/components/talents/TalentCalculator";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLASSES.map((c) => ({ class: c.slug }));
}

type Params = Promise<{ class: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { class: classSlug } = await params;
  const cls = getClass(classSlug);
  if (!cls) return {};
  return {
    title: `${cls.name} Talent Calculator — TBC Classic`,
    description: `Interactive ${cls.name} talent calculator for TBC Classic: ${cls.specs.map((s) => s.name).join(", ")}. 61 points, real tier & prereq rules, shareable build links.`,
    alternates: { canonical: `/talent-calculator/${cls.slug}` },
  };
}

export default async function ClassCalculatorPage({
  params,
}: {
  params: Params;
}) {
  const { class: classSlug } = await params;
  const cls = getClass(classSlug);
  const talents = getTalents(classSlug);
  if (!cls || !talents) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Talent Calculator", href: "/talent-calculator" },
    { name: cls.name, href: `/talent-calculator/${cls.slug}` },
  ];

  return (
    <main className="mx-auto max-w-[1200px] px-4">
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          webApplicationJsonLd(
            `${cls.name} Talent Calculator (TBC Classic)`,
            `${SITE_URL}/talent-calculator/${cls.slug}`,
            `Plan and share ${cls.name} talent builds for TBC Classic.`,
          ),
        ]}
      />
      <header className="pt-10 pb-6 sm:pt-14">
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {cls.name} Talent Calculator — TBC Classic
        </h1>
      </header>

      <Suspense>
        <TalentCalculator cls={talents} className={cls.name} />
      </Suspense>

      {/* Cross-links: recommended builds per spec */}
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
  );
}
