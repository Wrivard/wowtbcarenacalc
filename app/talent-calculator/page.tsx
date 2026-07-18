import type { Metadata } from "next";
import Link from "next/link";
import { CLASSES } from "@/lib/classes";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  JsonLd,
  breadcrumbJsonLd,
  itemListJsonLd,
  webApplicationJsonLd,
} from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { BACKGROUNDS } from "@/lib/backgrounds";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "TBC Talent Calculator — All Classes (TBC Classic)",
  description:
    "Free TBC Classic talent calculator for all 9 classes. Plan your 61 points with real tier and prerequisite rules, then share your build with a link.",
  alternates: { canonical: "/talent-calculator" },
};

export default function TalentCalculatorHub() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Talent Calculator", href: "/talent-calculator" },
  ];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          webApplicationJsonLd(
            "TBC Classic Talent Calculator",
            `${SITE_URL}/talent-calculator`,
            "Interactive talent calculator for WoW TBC Classic with shareable build links.",
          ),
          itemListJsonLd(
            "TBC talent calculators by class",
            CLASSES.map((c) => ({
              name: `${c.name} talent calculator`,
              url: `${SITE_URL}/talent-calculator/${c.slug}`,
            })),
          ),
        ]}
      />
      <PageHero image={BACKGROUNDS.calculator}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Talent Calculator
        </h1>
        <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          Plan a TBC Classic build with the real rules — 61 points at level
          70, tiers unlocking every 5 points, prerequisite arrows enforced —
          and share it as a link. Talent data sourced from wowsims and
          Wowhead. Pick a class:
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-10">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CLASSES.map((cls) => (
          <Link
            key={cls.slug}
            href={`/talent-calculator/${cls.slug}`}
            className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/50 hover:bg-surface-hover"
          >
            <span className="text-sm font-semibold">{cls.name}</span>
            <span className="mt-1 block text-xs text-muted">
              {cls.specs.map((s) => s.name).join(" · ")}
            </span>
          </Link>
        ))}
      </div>
      </main>
    </>
  );
}
