// Arena leaderboard sync / health check — invoked by the Vercel cron
// (see vercel.json, daily at 00:00 UTC).
//
// The live data path is the official Battle.net PvP Season API via
// lib/blizzard.ts (ToS-clean). The leaderboard page fetches it directly
// with ISR (revalidate=3600), so this route mainly serves as a cron-driven
// cache-warm + health check: it probes the live feed and reports whether
// credentials are configured and the feed is reachable. It returns 200
// with `live: true` once BLIZZARD_CLIENT_ID/SECRET (+ namespace/season)
// are set, otherwise `live: false` (the page shows labeled sample data).

import { NextResponse } from "next/server";
import { fetchLiveSnapshot } from "@/lib/blizzard";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Optional shared-secret guard for the cron (set CRON_SECRET in the
  // Vercel project and send it as a bearer token from the cron config).
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const probe = await fetchLiveSnapshot("2s");
  const live = probe !== null;
  return NextResponse.json({
    status: "ok",
    live,
    message: live
      ? `Live Battle.net feed reachable (${probe?.entries.length ?? 0} 2v2 entries).`
      : "No live feed — set BLIZZARD_CLIENT_ID/SECRET + BLIZZARD_PVP_NAMESPACE/SEASON_ID to enable. Serving labeled sample data.",
  });
}
