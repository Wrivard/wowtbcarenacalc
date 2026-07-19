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
import { classIconName, specIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
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
      <div className="grid gap-3 sm:grid-cols-2">
        {CLASSES.map((cls) => (
          <div
            key={cls.slug}
            className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
          >
            <Link
              href={`/talent-calculator/${cls.slug}`}
              className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground hover:text-accent"
            >
              <GameIcon
                icon={classIconName(cls.slug)}
                alt={`${cls.name} class icon`}
                size="medium"
                className="rounded-lg"
              />
              {cls.name} Calculator
            </Link>
            <ul className="mt-3 space-y-2">
              {cls.specs.map((spec) => (
                <li key={spec.slug} className="flex items-center gap-2.5">
                  <GameIcon
                    icon={specIconName(cls.slug, spec)}
                    alt=""
                    size="small"
                    className="rounded"
                  />
                  <Link
                    href={`/${cls.slug}/${spec.slug}/talents`}
                    className="text-sm text-muted-strong transition-colors hover:text-foreground"
                  >
                    {spec.name} talent build
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </main>
    </>
  );
}
