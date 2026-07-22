import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { CLASSES } from "@/lib/classes";
import { PROFESSIONS } from "@/data/professions";
import { populatedPhases } from "@/data/raids";
import { PHASE_LABELS, type Phase } from "@/lib/classes";

// llms.txt (llmstxt.org): a curated, LLM-friendly map of the site so language
// models can find and cite the right page for any TBC Classic query. Generated
// from the same registries that drive the app, so it never drifts.
export const dynamic = "force-static";

export function GET() {
  const u = (p: string) => `${SITE_URL}${p}`;
  const lines: string[] = [];

  lines.push(`# ${SITE_NAME}`);
  lines.push("");
  lines.push(`> ${SITE_DESCRIPTION}`);
  lines.push("");
  lines.push(
    "This is a tools-and-guides hub for World of Warcraft: The Burning Crusade Classic (patch 2.4.3, Arena Season 2 / Merciless Gladiator). Every best-in-slot list, stat cap, talent build and arena comp is TBC-2.4.3-accurate. Content is organized by class → spec, and by content type (PvP arena, PvE raid).",
  );
  lines.push("");

  lines.push("## Tools");
  lines.push(`- [Talent Calculator](${u("/talent-calculator")}): interactive TBC talent trees for every class.`);
  lines.push(`- [Arena Points Calculator](${u("/arena-points-calculator")}): weekly arena point income by rating and bracket.`);
  lines.push(`- [Live Arena Leaderboard](${u("/leaderboard")}): current TBC arena ladder snapshot.`);
  lines.push(`- [Class Rankings / Tier List](${u("/class-rankings")}): spec strength by phase.`);
  lines.push("");

  lines.push("## Best in Slot (BiS)");
  lines.push(`- [PvP Arena BiS hub](${u("/pvp")}): most-used arena gear per spec, Season 2 snapshot.`);
  lines.push(`- [PvE Raid BiS hub](${u("/pve")}): raid best-in-slot per spec, by phase.`);
  for (const cls of CLASSES) {
    const specs = cls.specs
      .map((s) => `${s.name} (${u(`/${cls.slug}/${s.slug}`)})`)
      .join(", ");
    lines.push(`- **${cls.name}**: ${specs}`);
  }
  lines.push("");

  lines.push("## Arena Comps");
  lines.push(`- [Arena Comp Tier List](${u("/arena/comps")}): every viable 2v2, 3v3 and 5v5 comp, ranked, with full guides.`);
  lines.push(`- [Best 2v2 comps](${u("/arena/comps/2s")}) · [Best 3v3 comps](${u("/arena/comps/3s")}) · [Best 5v5 comps](${u("/arena/comps/5s")})`);
  lines.push(`- By class: ${CLASSES.map((c) => `[${c.name}](${u(`/arena/comps/class/${c.slug}`)})`).join(" · ")}`);
  lines.push("");

  lines.push("## Raids");
  for (const phase of populatedPhases() as Phase[]) {
    lines.push(`- [Phase ${phase} raids](${u(`/raids/phase-${phase}`)}): ${PHASE_LABELS[phase]}.`);
  }
  lines.push("");

  lines.push("## Guides");
  lines.push(`- [Guides hub](${u("/guides")}): class, PvP/PvE, profession and addon guides.`);
  lines.push(`- [Best race by class](${u("/guides/best-race/warrior")}) and per-class addon guides.`);
  lines.push(`- Professions: ${PROFESSIONS.map((p) => `[${p.name}](${u(`/guides/professions/${p.slug}`)})`).join(" · ")}`);
  lines.push("");

  lines.push("## Classes");
  lines.push(`- [All classes](${u("/classes")})`);
  for (const cls of CLASSES) {
    lines.push(`- [${cls.name}](${u(`/${cls.slug}`)})`);
  }
  lines.push("");

  lines.push("## About");
  lines.push(`- [About](${u("/about")}) · [Contact](${u("/contact")}) · [Privacy](${u("/privacy-policy")}) · [Terms](${u("/terms")})`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
