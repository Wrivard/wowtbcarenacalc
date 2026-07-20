// Official Battle.net (Blizzard) Game Data API client for the BCC arena
// PvP leaderboards — the ToS-clean source (this is the same official API
// third-party aggregators consume). Env-gated: with no credentials it
// returns null and the leaderboard page falls back to the labeled sample.
//
// ── Setup (done by the site owner, not automatable here) ──────────────
//   1. Register a client at https://develop.battle.net (free).
//   2. Set these env vars in the Vercel project:
//        BLIZZARD_CLIENT_ID       = <client id>
//        BLIZZARD_CLIENT_SECRET   = <client secret>
//        BLIZZARD_REGION          = us | eu (default: us)
//        BLIZZARD_PVP_NAMESPACE   = dynamic-classic-us  (verify for the
//                                    current Anniversary progression)
//        BLIZZARD_PVP_SEASON_ID   = <current PvP season id>  (verify via
//                                    /data/wow/pvp-season/index)
//   3. Redeploy. The page auto-switches to live data (isSample=false).
//
// The official leaderboard does NOT include class/spec — those need extra
// per-character calls (what ironforge does). Live entries therefore render
// without class colors until such enrichment is added.

import type { Bracket, Faction, LeaderboardEntry, LeaderboardSnapshot } from "@/data/leaderboard";

const BRACKET_API: Record<Bracket, string> = { "2s": "2v2", "3s": "3v3", "5s": "5v5" };

function config() {
  const id = process.env.BLIZZARD_CLIENT_ID;
  const secret = process.env.BLIZZARD_CLIENT_SECRET;
  if (!id || !secret) return null;
  return {
    id,
    secret,
    region: process.env.BLIZZARD_REGION ?? "us",
    namespace: process.env.BLIZZARD_PVP_NAMESPACE ?? "dynamic-classic-us",
    seasonId: process.env.BLIZZARD_PVP_SEASON_ID,
  };
}

async function getToken(id: string, secret: string): Promise<string | null> {
  try {
    const res = await fetch("https://oauth.battle.net/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      // Cache the token for its ~24h lifetime, well within a revalidate cycle.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { access_token?: string };
    return json.access_token ?? null;
  } catch {
    return null;
  }
}

interface RawEntry {
  rank: number;
  rating: number;
  player?: { name: string; realm?: { slug?: string } };
  character?: { name: string; realm?: { slug?: string } };
  faction?: { type?: string };
  season_match_statistics?: { won?: number; lost?: number };
}

// Rough TBC title bands as percentiles of the returned ladder. Real
// cutoffs depend on total population; this is a defensible approximation
// until a population-aware calculation is wired.
function computeCutoffs(sorted: number[]) {
  const at = (pct: number) => {
    if (sorted.length === 0) return 0;
    const i = Math.min(sorted.length - 1, Math.floor(sorted.length * pct));
    return sorted[i];
  };
  return {
    gladiatorCutoff: at(0.005),
    duelistCutoff: at(0.03),
    rivalCutoff: at(0.1),
    challengerCutoff: at(0.35),
  };
}

/**
 * Fetch the live BCC arena leaderboard for a bracket, or null if the
 * client isn't configured / the request fails (caller falls back to
 * sample data). Never throws.
 */
export async function fetchLiveSnapshot(bracket: Bracket): Promise<LeaderboardSnapshot | null> {
  const cfg = config();
  if (!cfg || !cfg.seasonId) return null;

  const token = await getToken(cfg.id, cfg.secret);
  if (!token) return null;

  const url =
    `https://${cfg.region}.api.blizzard.com/data/wow/pvp-season/${cfg.seasonId}` +
    `/pvp-leaderboard/${BRACKET_API[bracket]}` +
    `?namespace=${encodeURIComponent(cfg.namespace)}&locale=en_US`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { entries?: RawEntry[]; season_id?: number };
    const raw = json.entries ?? [];
    if (raw.length === 0) return null;

    const entries: LeaderboardEntry[] = raw.map((e) => {
      const ch = e.player ?? e.character;
      const realm = ch?.realm?.slug ?? "";
      const faction = (e.faction?.type ?? "").toLowerCase() === "alliance" ? "alliance" : "horde";
      return {
        rank: e.rank,
        players: [{ name: ch?.name ?? "Unknown", class: "", spec: "", realm }],
        rating: e.rating,
        wins: e.season_match_statistics?.won ?? 0,
        losses: e.season_match_statistics?.lost ?? 0,
        faction: faction as Faction,
        realm,
      };
    });

    const cutoffs = computeCutoffs(entries.map((e) => e.rating).sort((a, b) => b - a));

    return {
      bracket,
      season: Number(cfg.seasonId) || json.season_id || 2,
      ...cutoffs,
      entries,
      fetchedAt: new Date().toISOString(),
      isSample: false,
    };
  } catch {
    return null;
  }
}
