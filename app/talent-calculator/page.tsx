import type { Metadata } from "next";
import { CLASSES, getClass } from "@/lib/classes";
import {
  JsonLd,
  webApplicationJsonLd,
  itemListJsonLd,
  breadcrumbJsonLd,
} from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { CalculatorView, calculatorPath } from "@/components/talents/CalculatorView";
import { SITE_URL } from "@/lib/site";

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Talent Calculator", href: "/talent-calculator" },
];

type SP = Promise<Record<string, string | string[] | undefined>>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

const DEFAULT_CLASS = "warrior";

// ?class=<slug> is kept working for old links and shared ?b= builds, but it
// canonicalises to that class's own page — the query param cannot rank and
// must not compete with the path.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SP;
}): Promise<Metadata> {
  const sp = await searchParams;
  const cls = getClass(first(sp.class) ?? "");
  if (cls) {
    return buildMetadata({
      title: `${cls.name} Talent Calculator — TBC Classic`,
      description: `Free TBC Classic ${cls.name} talent calculator: plan your 61 points with real tier gates and prerequisites, load a recommended ${cls.name} build, and share it as a link.`,
      path: calculatorPath(cls.slug),
      ogImage: `/${cls.slug}/opengraph-image`,
    });
  }
  return buildMetadata({
    // "wow tbc talent calculator" is a recorded query and the page did not
    // carry "WoW" at all.
    title: "WoW TBC Talent Calculator — TBC Classic, All 9 Classes",
    description:
      "Free WoW TBC Classic talent calculator for all 9 classes. Pick a class, plan your 61 points with real tier and prerequisite rules, then share your build with a link.",
    path: "/talent-calculator",
  });
}

export default async function TalentCalculatorPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const sp = await searchParams;
  const requested = getClass(first(sp.class) ?? "");
  const cls = requested ?? getClass(DEFAULT_CLASS)!;

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
          // Points at the indexable per-class paths, not the ?class= variants
          // those pages canonicalise away from.
          itemListJsonLd(
            "TBC talent calculators by class",
            CLASSES.map((c) => ({
              name: `${c.name} talent calculator`,
              url: `${SITE_URL}${calculatorPath(c.slug)}`,
            })),
          ),
        ]}
      />
      <CalculatorView cls={cls} variant={requested ? "class" : "hub"} />
    </>
  );
}
