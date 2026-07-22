import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { facetCopy } from "@/lib/comps-seo";
import { CompBrowser, queryFrom } from "@/components/arena/CompBrowser";

type SP = Promise<Record<string, string | string[] | undefined>>;

export const metadata: Metadata = (() => {
  const c = facetCopy();
  return buildMetadata({ title: c.title, description: c.description, path: "/arena/comps" });
})();

export default async function CompsHub({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  return <CompBrowser query={queryFrom(sp)} />;
}
