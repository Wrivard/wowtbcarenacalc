// Per-class talent calculator — a real, indexable page per class.
//
// These used to 308 into /talent-calculator?class=<slug>, which shares its
// title, description, canonical and og:url with the bare hub: nine classes
// collapsed into one indexed page and "hunter talent calculator tbc" had
// nothing to rank. The class dimension belongs in the path.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CLASSES, getClass } from "@/lib/classes";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd, webApplicationJsonLd } from "@/components/seo/JsonLd";
import { CalculatorView, calculatorPath } from "@/components/talents/CalculatorView";
import { SITE_URL } from "@/lib/site";

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
    title: `${cls.name} Talent Calculator — TBC Classic`,
    description: `Free TBC Classic ${cls.name} talent calculator: plan your 61 points with real tier gates and prerequisites, load a recommended ${cls.name} build, and share it as a link.`,
    path: calculatorPath(cls.slug),
    ogImage: `/${cls.slug}/opengraph-image`,
  });
}

export default async function ClassCalculatorPage({ params }: { params: Params }) {
  const { class: classSlug } = await params;
  const cls = getClass(classSlug);
  if (!cls) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Talent Calculator", href: "/talent-calculator" },
            { name: cls.name, href: calculatorPath(cls.slug) },
          ]),
          webApplicationJsonLd(
            `TBC Classic ${cls.name} Talent Calculator`,
            `${SITE_URL}${calculatorPath(cls.slug)}`,
            `Interactive ${cls.name} talent calculator for WoW TBC Classic with shareable build links.`,
          ),
        ]}
      />
      <CalculatorView cls={cls} variant="class" />
    </>
  );
}
