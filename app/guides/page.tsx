import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { ComingSoon } from "@/components/ComingSoon";
import { BACKGROUNDS } from "@/lib/backgrounds";

// Guides hub. Per-spec PvP/PvE guides, professions, best-race and addons
// land in section 5; noindex until real content exists.
export const metadata: Metadata = {
  ...buildMetadata({
    title: "TBC Classic Guides — PvP, PvE, Professions, Races & Addons",
    description:
      "In-depth TBC Classic guides: per-spec PvP and PvE playstyle, profession picks, best race per class, and the essential addons.",
    path: "/guides",
    noindex: true,
  }),
};

export default function GuidesHub() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
  ];
  return (
    <>
      <PageHero image={BACKGROUNDS.guides}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Classic Guides
        </h1>
        <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          Deep-dive PvP and PvE guides for every spec, plus professions, best
          race per class, macros and addons.
        </p>
      </PageHero>
      <main className="mx-auto max-w-[720px] px-4">
        <ComingSoon
          title="Class & content guides"
          heading="Guides — coming soon"
          description="Full per-spec PvP/PvE guides, profession and race recommendations, macros and addon lists are in the works. In the meantime:"
          fallbackHref="/classes"
          fallbackLabel="Browse BiS lists & talents by class"
        />
      </main>
    </>
  );
}
