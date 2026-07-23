import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { CLASSES } from "@/lib/classes";
import {
  compsFor,
  facetCopy,
  facetPath,
  parseClasses,
  classCombos,
  comboSlug,
} from "@/lib/comps-seo";
import { CompBrowser, queryFrom } from "@/components/arena/CompBrowser";

// Only the non-empty facets are prerendered (and sitemapped); any other
// *parseable* class set still renders on demand with an empty result state
// instead of 404ing — the filter bar can walk you into a set no comp fields,
// and a dead end there is worse than a page saying "no comps". Those pages are
// noindex'd below so nothing thin enters the index.
export const dynamicParams = true;

// Single classes plus every co-occurring 2–3 class combo across all brackets.
export function generateStaticParams() {
  const params: { class: string }[] = CLASSES.map((c) => ({ class: c.slug }));
  for (const combo of classCombos()) params.push({ class: comboSlug(combo) });
  return params;
}

type Params = Promise<{ class: string }>;
type SP = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { class: seg } = await params;
  const classes = parseClasses(seg);
  if (!classes) return {};
  const c = facetCopy(undefined, classes);
  return buildMetadata({
    title: c.title,
    description: c.description,
    path: facetPath(undefined, classes),
    noindex: compsFor({ classSlugs: classes }).length === 0,
  });
}

export default async function ClassCompsPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SP;
}) {
  const { class: seg } = await params;
  const classes = parseClasses(seg);
  if (!classes) notFound();
  const sp = await searchParams;
  return <CompBrowser classSlugs={classes} query={queryFrom(sp)} />;
}
