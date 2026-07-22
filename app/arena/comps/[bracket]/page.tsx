import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { BRACKETS, isBracket, facetCopy } from "@/lib/comps-seo";
import { CompBrowser, queryFrom } from "@/components/arena/CompBrowser";

export const dynamicParams = false;

export function generateStaticParams() {
  return BRACKETS.map((b) => ({ bracket: b }));
}

type Params = Promise<{ bracket: string }>;
type SP = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { bracket } = await params;
  if (!isBracket(bracket)) return {};
  const c = facetCopy(bracket);
  return buildMetadata({ title: c.title, description: c.description, path: `/arena/comps/${bracket}` });
}

export default async function BracketCompsPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SP;
}) {
  const { bracket } = await params;
  if (!isBracket(bracket)) notFound();
  const sp = await searchParams;
  return <CompBrowser bracket={bracket} query={queryFrom(sp)} />;
}
