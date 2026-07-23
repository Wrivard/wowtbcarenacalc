import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { CLASSES } from "@/lib/classes";
import {
  BRACKETS,
  isBracket,
  compsFor,
  facetCopy,
  facetPath,
  parseClasses,
  classCombos,
  comboSlug,
} from "@/lib/comps-seo";
import { CompBrowser, queryFrom } from "@/components/arena/CompBrowser";

export const dynamicParams = false;

// Every (bracket, class-set) that actually has comps — single classes plus the
// co-occurring 2–3 class combos. No thin pages: classCombos only returns sets
// with at least one matching comp, and single classes are guarded below.
export function generateStaticParams() {
  const out: { bracket: string; class: string }[] = [];
  for (const b of BRACKETS) {
    for (const c of CLASSES)
      if (compsFor({ bracket: b, classSlugs: [c.slug] }).length > 0)
        out.push({ bracket: b, class: c.slug });
    for (const combo of classCombos(b))
      out.push({ bracket: b, class: comboSlug(combo) });
  }
  return out;
}

type Params = Promise<{ bracket: string; class: string }>;
type SP = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { bracket, class: seg } = await params;
  const classes = parseClasses(seg);
  if (!isBracket(bracket) || !classes) return {};
  const c = facetCopy(bracket, classes);
  return buildMetadata({
    title: c.title,
    description: c.description,
    path: facetPath(bracket, classes),
  });
}

export default async function BracketClassCompsPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SP;
}) {
  const { bracket, class: seg } = await params;
  const classes = parseClasses(seg);
  if (!isBracket(bracket) || !classes) notFound();
  if (compsFor({ bracket, classSlugs: classes }).length === 0) notFound();
  const sp = await searchParams;
  return <CompBrowser bracket={bracket} classSlugs={classes} query={queryFrom(sp)} />;
}
