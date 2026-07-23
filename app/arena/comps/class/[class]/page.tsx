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

export const dynamicParams = false;

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
  if (!classes || compsFor({ classSlugs: classes }).length === 0) notFound();
  const sp = await searchParams;
  return <CompBrowser classSlugs={classes} query={queryFrom(sp)} />;
}
