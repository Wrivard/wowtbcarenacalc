import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { CLASSES } from "@/lib/classes";
import { BRACKETS, isBracket, isClassSlug, compsFor, facetCopy } from "@/lib/comps-seo";
import { CompBrowser, queryFrom } from "@/components/arena/CompBrowser";

export const dynamicParams = false;

// Only the (bracket, class) pairs that actually have comps — no thin pages.
export function generateStaticParams() {
  const out: { bracket: string; class: string }[] = [];
  for (const b of BRACKETS)
    for (const c of CLASSES)
      if (compsFor({ bracket: b, classSlug: c.slug }).length > 0)
        out.push({ bracket: b, class: c.slug });
  return out;
}

type Params = Promise<{ bracket: string; class: string }>;
type SP = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { bracket, class: classSlug } = await params;
  if (!isBracket(bracket) || !isClassSlug(classSlug)) return {};
  const c = facetCopy(bracket, classSlug);
  return buildMetadata({
    title: c.title,
    description: c.description,
    path: `/arena/comps/${bracket}/class/${classSlug}`,
  });
}

export default async function BracketClassCompsPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SP;
}) {
  const { bracket, class: classSlug } = await params;
  if (!isBracket(bracket) || !isClassSlug(classSlug)) notFound();
  if (compsFor({ bracket, classSlug }).length === 0) notFound();
  const sp = await searchParams;
  return <CompBrowser bracket={bracket} classSlug={classSlug} query={queryFrom(sp)} />;
}
