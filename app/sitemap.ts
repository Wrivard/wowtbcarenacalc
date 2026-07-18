import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, lastModified, changeFrequency: "monthly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "monthly", priority: 0.2 },
  ];
}
