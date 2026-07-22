import { ADSENSE_CLIENT } from "@/lib/site";

// Authorized Digital Sellers file for Google AdSense. Served at /ads.txt so
// Google can verify this site is authorized to sell its ad inventory. The
// publisher id is derived from ADSENSE_CLIENT (ca-pub-XXXX → pub-XXXX);
// f08c47fec0942fa0 is Google's fixed certification-authority TAG id.
export const dynamic = "force-static";

export function GET() {
  const pub = ADSENSE_CLIENT.replace(/^ca-/, "");
  const body = `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
