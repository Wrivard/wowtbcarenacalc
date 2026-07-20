// Arena leaderboard data.
//
// ⚠️ DATA SOURCE / ToS: the live ladder is intended to come from the
// public ironforge.pro arena leaderboard, refreshed by the Vercel cron at
// /api/leaderboard/sync. Until that feed is wired AND its Terms of Service
// are confirmed to permit redistribution, the snapshots below are clearly
// labeled SAMPLE data (isSample: true) so nothing misleading ships. The
// UI shows a "sample data" banner whenever isSample is true.

export type Bracket = "2s" | "3s" | "5s";
export type Faction = "horde" | "alliance";

export interface LadderPlayer {
  name: string;
  class: string; // lib/classes slug
  spec: string;
  realm: string;
}

export interface LeaderboardEntry {
  rank: number;
  teamName?: string;
  players: LadderPlayer[];
  rating: number;
  wins: number;
  losses: number;
  faction: Faction;
  realm: string;
}

export interface LeaderboardSnapshot {
  bracket: Bracket;
  season: number;
  gladiatorCutoff: number;
  duelistCutoff: number;
  rivalCutoff: number;
  challengerCutoff: number;
  entries: LeaderboardEntry[];
  fetchedAt: string; // ISO
  isSample: boolean;
}

// Deterministic sample entries (no live data). Ratings/records are
// plausible but fictional; realms are TBC Anniversary realm names.
const P = (name: string, cls: string, spec: string, realm: string): LadderPlayer => ({
  name,
  class: cls,
  spec,
  realm,
});

const SAMPLE_2S: LeaderboardEntry[] = [
  { rank: 1, players: [P("Vanishh", "rogue", "subtlety", "Firemaw"), P("Bubblegum", "priest", "discipline", "Firemaw")], rating: 2418, wins: 214, losses: 96, faction: "alliance", realm: "Firemaw" },
  { rank: 2, players: [P("Mortis", "warrior", "arms", "Gehennas"), P("Lightbringer", "paladin", "holy", "Gehennas")], rating: 2377, wins: 188, losses: 71, faction: "alliance", realm: "Gehennas" },
  { rank: 3, players: [P("Dotarius", "warlock", "affliction", "Golemagg"), P("Innerpeace", "priest", "discipline", "Golemagg")], rating: 2344, wins: 240, losses: 133, faction: "horde", realm: "Golemagg" },
  { rank: 4, players: [P("Frostbyte", "mage", "frost", "Pyrewood"), P("Serene", "priest", "discipline", "Pyrewood")], rating: 2298, wins: 176, losses: 90, faction: "alliance", realm: "Pyrewood Village" },
  { rank: 5, players: [P("Shivv", "rogue", "subtlety", "Mograine"), P("Holylight", "paladin", "holy", "Mograine")], rating: 2265, wins: 201, losses: 121, faction: "horde", realm: "Mograine" },
  { rank: 6, players: [P("Grommash", "warrior", "arms", "Firemaw"), P("Mendd", "priest", "discipline", "Firemaw")], rating: 2231, wins: 160, losses: 98, faction: "horde", realm: "Firemaw" },
  { rank: 7, players: [P("Sinister", "rogue", "combat", "Gehennas"), P("Sunwell", "paladin", "holy", "Gehennas")], rating: 2199, wins: 155, losses: 110, faction: "alliance", realm: "Gehennas" },
  { rank: 8, players: [P("Feldemon", "warlock", "affliction", "Golemagg"), P("Sanctum", "paladin", "holy", "Golemagg")], rating: 2154, wins: 148, losses: 112, faction: "horde", realm: "Golemagg" },
  { rank: 9, players: [P("Cyclonez", "druid", "restoration", "Pyrewood"), P("Rendd", "warrior", "arms", "Pyrewood")], rating: 2098, wins: 142, losses: 121, faction: "alliance", realm: "Pyrewood Village" },
  { rank: 10, players: [P("Chillz", "mage", "frost", "Mograine"), P("Wardd", "priest", "discipline", "Mograine")], rating: 2041, wins: 130, losses: 118, faction: "horde", realm: "Mograine" },
  { rank: 11, players: [P("Backstabb", "rogue", "subtlety", "Firemaw"), P("Renewal", "priest", "discipline", "Firemaw")], rating: 1987, wins: 121, losses: 115, faction: "alliance", realm: "Firemaw" },
  { rank: 12, players: [P("Retribute", "paladin", "retribution", "Gehennas"), P("Bacon", "paladin", "holy", "Gehennas")], rating: 1902, wins: 110, losses: 120, faction: "alliance", realm: "Gehennas" },
];

const SAMPLE_3S: LeaderboardEntry[] = [
  { rank: 1, teamName: "RMP Diff", players: [P("Vanishh", "rogue", "subtlety", "Firemaw"), P("Frostbyte", "mage", "frost", "Firemaw"), P("Bubblegum", "priest", "discipline", "Firemaw")], rating: 2531, wins: 260, losses: 120, faction: "alliance", realm: "Firemaw" },
  { rank: 2, teamName: "Shadow Cleave", players: [P("Dotarius", "warlock", "affliction", "Golemagg"), P("Shivv", "rogue", "subtlety", "Golemagg"), P("Totemz", "shaman", "restoration", "Golemagg")], rating: 2489, wins: 231, losses: 108, faction: "horde", realm: "Golemagg" },
  { rank: 3, teamName: "Beetlejuice", players: [P("Mortis", "warrior", "arms", "Gehennas"), P("Dotarius", "warlock", "affliction", "Gehennas"), P("Cyclonez", "druid", "restoration", "Gehennas")], rating: 2401, wins: 205, losses: 121, faction: "alliance", realm: "Gehennas" },
  { rank: 4, players: [P("Chillz", "mage", "frost", "Mograine"), P("Feldemon", "warlock", "affliction", "Mograine"), P("Moonfyre", "druid", "restoration", "Mograine")], rating: 2333, wins: 190, losses: 130, faction: "horde", realm: "Mograine" },
  { rank: 5, players: [P("Grommash", "warrior", "arms", "Firemaw"), P("Frostbyte", "mage", "frost", "Firemaw"), P("Mendd", "priest", "discipline", "Firemaw")], rating: 2270, wins: 172, losses: 128, faction: "horde", realm: "Firemaw" },
  { rank: 6, players: [P("Sinister", "rogue", "combat", "Gehennas"), P("Feldemon", "warlock", "demonology", "Gehennas"), P("Totemz", "shaman", "restoration", "Gehennas")], rating: 2188, wins: 150, losses: 121, faction: "alliance", realm: "Gehennas" },
  { rank: 7, players: [P("Retribute", "paladin", "retribution", "Pyrewood"), P("Huntard", "hunter", "beast-mastery", "Pyrewood"), P("Renewal", "priest", "discipline", "Pyrewood")], rating: 2094, wins: 138, losses: 129, faction: "alliance", realm: "Pyrewood Village" },
  { rank: 8, players: [P("Backstabb", "rogue", "subtlety", "Golemagg"), P("Chillz", "mage", "frost", "Golemagg"), P("Wardd", "priest", "discipline", "Golemagg")], rating: 1985, wins: 120, losses: 122, faction: "horde", realm: "Golemagg" },
];

const SAMPLE_5S: LeaderboardEntry[] = [
  { rank: 1, teamName: "Melee Cleave", players: [P("Mortis", "warrior", "arms", "Firemaw"), P("Vanishh", "rogue", "combat", "Firemaw"), P("Lightbringer", "paladin", "holy", "Firemaw"), P("Bubblegum", "priest", "discipline", "Firemaw"), P("Totemz", "shaman", "restoration", "Firemaw")], rating: 2402, wins: 180, losses: 92, faction: "alliance", realm: "Firemaw" },
  { rank: 2, teamName: "Caster Cleave", players: [P("Chillz", "mage", "frost", "Golemagg"), P("Dotarius", "warlock", "affliction", "Golemagg"), P("Dotara", "priest", "shadow", "Golemagg"), P("Sanctum", "paladin", "holy", "Golemagg"), P("Moonfyre", "druid", "restoration", "Golemagg")], rating: 2311, wins: 160, losses: 100, faction: "horde", realm: "Golemagg" },
  { rank: 3, players: [P("Grommash", "warrior", "arms", "Gehennas"), P("Frostbyte", "mage", "frost", "Gehennas"), P("Mendd", "priest", "discipline", "Gehennas"), P("Sunwell", "paladin", "holy", "Gehennas"), P("Cyclonez", "druid", "restoration", "Gehennas")], rating: 2201, wins: 140, losses: 108, faction: "alliance", realm: "Gehennas" },
  { rank: 4, players: [P("Shivv", "rogue", "subtlety", "Mograine"), P("Feldemon", "warlock", "affliction", "Mograine"), P("Huntard", "hunter", "marksmanship", "Mograine"), P("Renewal", "priest", "holy", "Mograine"), P("Totemz", "shaman", "restoration", "Mograine")], rating: 2088, wins: 122, losses: 111, faction: "horde", realm: "Mograine" },
];

export const SNAPSHOTS: Record<Bracket, LeaderboardSnapshot> = {
  "2s": {
    bracket: "2s",
    season: 2,
    gladiatorCutoff: 2311,
    duelistCutoff: 2038,
    rivalCutoff: 1846,
    challengerCutoff: 1652,
    entries: SAMPLE_2S,
    fetchedAt: "2026-07-20T00:00:00Z",
    isSample: true,
  },
  "3s": {
    bracket: "3s",
    season: 2,
    gladiatorCutoff: 2354,
    duelistCutoff: 2071,
    rivalCutoff: 1879,
    challengerCutoff: 1688,
    entries: SAMPLE_3S,
    fetchedAt: "2026-07-20T00:00:00Z",
    isSample: true,
  },
  "5s": {
    bracket: "5s",
    season: 2,
    gladiatorCutoff: 2277,
    duelistCutoff: 1994,
    rivalCutoff: 1802,
    challengerCutoff: 1610,
    entries: SAMPLE_5S,
    fetchedAt: "2026-07-20T00:00:00Z",
    isSample: true,
  },
};

export function getSnapshot(bracket: Bracket): LeaderboardSnapshot {
  return SNAPSHOTS[bracket];
}
