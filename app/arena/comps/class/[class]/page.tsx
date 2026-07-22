import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { CLASSES } from "@/lib/classes";
import { isClassSlug, facetCopy } from "@/lib/comps-seo";
import { CompBrowser, queryFrom } from "@/components/arena/CompBrowser";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLASSES.map((c) => ({ class: c.slug }));
}

type Params = Promise<{ class: string }>;
type SP = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { class: classSlug } = await params;
  if (!isClassSlug(classSlug)) return {};
  const c = facetCopy(undefined, classSlug);
  return buildMetadata({ title: c.title, description: c.description, path: `/arena/comps/class/${classSlug}` });
}

export default async function ClassCompsPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SP;
}) {
  const { class: classSlug } = await params;
  if (!isClassSlug(classSlug)) notFound();
  const sp = await searchParams;
  return <CompBrowser classSlug={classSlug} query={queryFrom(sp)} />;
}
