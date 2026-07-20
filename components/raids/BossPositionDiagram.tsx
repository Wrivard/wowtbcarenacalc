// Original, programmatically-drawn SVG position diagrams for boss fights.
// NOT scraped Blizzard art — simple labeled room layouts generated from a
// per-boss marker list. Theme-agnostic colors read on the dark UI.

type Role = "boss" | "tank" | "healer" | "melee" | "ranged" | "avoid" | "point";

interface Marker {
  x: number; // 0..400
  y: number; // 0..300
  label: string;
  role: Role;
}

const ROLE_COLOR: Record<Role, string> = {
  boss: "#e5484d",
  tank: "#f5a623",
  healer: "#00e599",
  melee: "#ff7d6b",
  ranged: "#69ccf0",
  avoid: "#8f8f98",
  point: "#a78bfa",
};

// Evenly spread N markers on a ring around the center.
function ring(n: number, role: Role, label: (i: number) => string, radius = 110): Marker[] {
  const cx = 200;
  const cy = 150;
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(a) * radius,
      y: cy + Math.sin(a) * radius,
      label: label(i),
      role,
    };
  });
}

function layoutFor(bossId: string): { markers: Marker[]; caption: string } {
  switch (bossId) {
    case "gruul-the-dragonkiller":
      return {
        caption: "Spread evenly around Gruul so Shatter's proximity damage can't chain.",
        markers: [
          { x: 200, y: 150, label: "Gruul", role: "boss" },
          { x: 200, y: 210, label: "Tank", role: "tank" },
          ...ring(8, "ranged", () => "spread"),
        ],
      };
    case "shade-of-aran":
      return {
        caption: "Spread around Aran; freeze on Flame Wreath, move on Blizzard/Arcane Explosion.",
        markers: [
          { x: 200, y: 150, label: "Aran", role: "boss" },
          ...ring(8, "ranged", () => "spread", 115),
        ],
      };
    case "magtheridon":
      return {
        caption: "Magtheridon centered; five cube-clickers rotate the Manticron Cubes on the walls.",
        markers: [
          { x: 200, y: 150, label: "Magtheridon", role: "boss" },
          { x: 200, y: 205, label: "Tank", role: "tank" },
          ...ring(5, "point", (i) => `Cube ${i + 1}`, 125),
        ],
      };
    case "high-king-maulgar":
      return {
        caption: "One tank per council member, kept apart. Kill order: Blindeye/Kiggler → Olm → Krosh → Maulgar.",
        markers: [
          { x: 200, y: 120, label: "Maulgar", role: "boss" },
          { x: 90, y: 90, label: "Krosh", role: "tank" },
          { x: 310, y: 90, label: "Olm", role: "tank" },
          { x: 90, y: 210, label: "Kiggler", role: "tank" },
          { x: 310, y: 210, label: "Blindeye", role: "tank" },
          { x: 200, y: 240, label: "Raid", role: "ranged" },
        ],
      };
    case "prince-malchezaar":
      return {
        caption: "Keep clean floor space — never stand in Infernal Hellfire pools. Kite subtly as they accumulate.",
        markers: [
          { x: 150, y: 150, label: "Prince", role: "boss" },
          { x: 150, y: 205, label: "Tank", role: "tank" },
          { x: 300, y: 90, label: "Infernal", role: "avoid" },
          { x: 320, y: 210, label: "Infernal", role: "avoid" },
          { x: 250, y: 250, label: "Raid", role: "ranged" },
        ],
      };
    case "lady-vashj":
      return {
        caption: "Phase 2: relay Tainted Cores from the elementals to the four generator pads at the corners; kill Striders on sight.",
        markers: [
          { x: 200, y: 150, label: "Vashj", role: "boss" },
          { x: 70, y: 70, label: "Gen 1", role: "point" },
          { x: 330, y: 70, label: "Gen 2", role: "point" },
          { x: 70, y: 230, label: "Gen 3", role: "point" },
          { x: 330, y: 230, label: "Gen 4", role: "point" },
          { x: 200, y: 220, label: "Raid", role: "ranged" },
        ],
      };
    case "kaelthas-sunstrider":
      return {
        caption: "Kite Thaladred (fixate), tank one advisor/weapon each, and survive Gravity Lapse while Kael nukes from center.",
        markers: [
          { x: 200, y: 140, label: "Kael'thas", role: "boss" },
          { x: 110, y: 90, label: "Advisor", role: "tank" },
          { x: 290, y: 90, label: "Advisor", role: "tank" },
          { x: 110, y: 200, label: "Kite", role: "avoid" },
          { x: 290, y: 200, label: "Advisor", role: "tank" },
          { x: 200, y: 235, label: "Raid", role: "ranged" },
        ],
      };
    case "moroes":
      return {
        caption: "CC the four adds apart around the room; tank Moroes central and burn him.",
        markers: [
          { x: 200, y: 150, label: "Moroes", role: "boss" },
          { x: 200, y: 205, label: "Tank", role: "tank" },
          { x: 80, y: 80, label: "CC", role: "point" },
          { x: 320, y: 80, label: "CC", role: "point" },
          { x: 80, y: 220, label: "CC", role: "point" },
          { x: 320, y: 220, label: "CC", role: "point" },
        ],
      };
    default:
      return {
        caption: "Tank the boss away from the raid; ranged and healers spread behind at max range.",
        markers: [
          { x: 200, y: 130, label: "Boss", role: "boss" },
          { x: 200, y: 185, label: "Tank", role: "tank" },
          ...ring(5, "ranged", () => "raid", 95).map((m) => ({ ...m, y: m.y + 30 })),
        ],
      };
  }
}

const LEGEND: { role: Role; label: string }[] = [
  { role: "boss", label: "Boss" },
  { role: "tank", label: "Tank" },
  { role: "healer", label: "Healer" },
  { role: "ranged", label: "Raid / ranged" },
  { role: "point", label: "Position" },
  { role: "avoid", label: "Avoid" },
];

export function BossPositionDiagram({ bossId }: { bossId: string }) {
  const { markers, caption } = layoutFor(bossId);
  const usedRoles = new Set(markers.map((m) => m.role));

  return (
    <figure className="rounded-xl border border-border bg-surface p-4">
      <svg
        viewBox="0 0 400 300"
        role="img"
        aria-label={`Position diagram for the encounter: ${caption}`}
        className="w-full"
      >
        {/* Room */}
        <rect
          x="20"
          y="20"
          width="360"
          height="260"
          rx="16"
          fill="#0a0a0a"
          stroke="#2a2a2a"
          strokeWidth="2"
        />
        {markers.map((m, i) => (
          <g key={i}>
            <circle cx={m.x} cy={m.y} r={m.role === "boss" ? 16 : 11} fill={ROLE_COLOR[m.role]} opacity={m.role === "avoid" ? 0.5 : 0.9} />
            <text
              x={m.x}
              y={m.role === "boss" ? m.y + 32 : m.y + 24}
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill="#ededed"
            >
              {m.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {LEGEND.filter((l) => usedRoles.has(l.role)).map((l) => (
          <span key={l.role} className="flex items-center gap-1.5 text-[11px] text-muted">
            <span className="size-2.5 rounded-full" style={{ background: ROLE_COLOR[l.role] }} />
            {l.label}
          </span>
        ))}
      </div>
      <figcaption className="mt-2 text-xs leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}
