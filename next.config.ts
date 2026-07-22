import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF/WebP with width-appropriate srcsets where next/image is used
    // (hero art). Small repeated zamimg CDN icons stay raw <img>, but the
    // remotePattern unlocks optimizing any large zamimg image if needed.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "wow.zamimg.com" }],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
