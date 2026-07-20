// Arena leaderboard sync — invoked by the Vercel cron (see vercel.json,
// every 6 hours).
//
// ⚠️ NOT YET WIRED TO A LIVE FEED. Before enabling in production:
//   1. Confirm the ironforge.pro (or chosen) arena-ladder source permits
//      automated fetching + redistribution under its Terms of Service.
//   2. Fetch each bracket's ladder, filter to arena-ACTIVE players
//      (min rating + recent games — same rule as the BiS snapshot), and
//      map to LeaderboardSnapshot.
//   3. Persist the result (Vercel Blob, KV, or /public/data/leaderboard/*.json)
//      and flip isSample to false so the UI drops the "sample data" banner.
//
// Until then this endpoint intentionally returns 501 so a misconfigured
// cron can't silently publish empty or fabricated ladder data.

import { NextResponse } from "next/server";

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

  return NextResponse.json(
    {
      status: "not_implemented",
      message:
        "Leaderboard live sync is not enabled. Wire the ladder source (ToS-permitting), then persist a LeaderboardSnapshot and set isSample=false.",
    },
    { status: 501 },
  );
}
