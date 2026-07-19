import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CLASSES, allSpecs } from "@/lib/classes";
import { filledBisRoutes } from "@/lib/bis";
import { getBuild } from "@/data/builds";

// Enumerates every indexable route from lib/classes.ts + the data
// registries. BiS/talent pages whose dataset isn't curated yet render
// noindex "coming soon" bodies and are deliberately EXCLUDED here —
// they join the sitemap automatically the moment their data file lands
// in the registry (full matrix ≈ 150+ URLs when all specs are filled).

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/arena-points-calculator`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/classes`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/talent-calculator`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, lastModified, changeFrequency: "monthly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "monthly", priority: 0.2 },
  ];

  // Class hubs + per-class calculators — always live (data-independent).
  for (const cls of CLASSES) {
    entries.push({
      url: `${SITE_URL}/${cls.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    entries.push({
      url: `${SITE_URL}/talent-calculator/${cls.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Curated BiS pages.
  for (const route of filledBisRoutes()) {
    const path =
      route.content === "pvp"
        ? `/${route.classSlug}/${route.specSlug}/pvp`
        : `/${route.classSlug}/${route.specSlug}/pve/phase-${route.phase}`;
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(route.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Talent build pages (curated + generated) — one per spec with a build.
  for (const { cls, spec } of allSpecs()) {
    const build = getBuild(cls.slug, spec.slug);
    if (!build) continue;
    entries.push({
      url: `${SITE_URL}/${cls.slug}/${spec.slug}/talents`,
      lastModified: new Date(build.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
