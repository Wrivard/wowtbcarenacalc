# BiS + Guide editorial verification

Multi-agent sweep (one agent per spec) cross-checking every BiS list and spec
guide against Wowhead TBC / wowsims / Warcraft Logs. Findings are reviewed by
hand before any data edit. Status: **APPLIED** = fixed & committed,
**OPEN** = needs an editorial decision.

## Batch 1 — 8 pillars (2026-07-22)

Specs: rogue/subtlety, priest/discipline, warrior/arms, mage/frost,
warlock/affliction, druid/restoration, shaman/restoration, paladin/holy.
7 findings.

### APPLIED — commit `d998245`

- **4 malformed 6-digit itemIds** (medium) — the Ahune/Midsummer seasonal
  cloaks + amulet carried retail IDs that 404 on Wowhead TBC, breaking their
  tooltips/links. Corrected across 68 occurrences in 56 PvP files. Correct IDs
  corroborated by this repo's own PvE files **and** Wowhead:
  - `278827 → 35507` Amulet of Bitter Hatred
  - `278819 → 35495` The Frost Lord's War Cloak
  - `279240 → 35494` Shroud of Winter's Chill
  - `278774 → 35497` Cloak of the Frigid Winds
  - Note: these appear as low-usage PvE-flex *alternatives*; the ID was the
    only defect. Whether a caster/spell-damage cloak belongs as a healer PvP
    flex at all is a separate editorial call (left as-is — they're flagged
    "PvE flex piece" and low usage%).
- **Discipline priest PvP rotation named Penance** (low) — Penance is a Wrath
  (patch 3.0.2) ability, nonexistent in TBC 2.4.3. Replaced with
  "Instant Flash Heal topping; Greater Heal only when safe from interrupt."

### OPEN — needs your call

- **warrior/arms Phase 4–5 weapon = dual-wield Warglaives** (medium).
  `warrior-arms-pve-5.json` MainHand = Warglaive of Azzinoth (32837) + OffHand =
  Warglaive (32838); Phase 4 same pattern. Dual-wielding one-handers is the
  **Fury** config — Arms is a two-handed MS/Slam spec (the file's own blurb and
  the Arms PvE guide say so). The WCL aggregation appears to have folded Fury
  parses into the Arms list for late phases (Phases 1–3 correctly show
  two-handers, e.g. Twinblade of the Phoenix 29993).
  **Decision needed:** which 2H to substitute for Phase 4/5 Arms
  (e.g. Apolyon / Cataclysm's Edge bridge), or accept that late-phase Arms
  has no distinct dataset and point it at the Fury list. I won't invent a BiS
  weapon silently.

## Batch 2 — 8 specs (2026-07-22)

Specs: warrior/fury, warrior/protection, paladin/protection, paladin/retribution,
hunter/beast-mastery, hunter/marksmanship, hunter/survival, rogue/combat.
4 findings.

### APPLIED — commit `<pending>`

- **hunter/beast-mastery Kill Command trigger** (high) — the PvE guide said Kill
  Command lights up "when the pet crits"; in TBC 2.4.3 it's gated on the
  **hunter's own** critical strike (off the GCD). Fixed both occurrences in
  `data/specGuides.ts`.
- **hunter ranged-hit cap note credited "Focused Aim"** (medium) — a WotLK
  talent that doesn't exist in TBC. The real TBC hunter hit talent is
  **Surefooted** (Survival, +3% hit). Fixed the note in `data/caps.ts`. Cap
  value (142/9%) was already correct.
- **paladin/protection "returns mana to healers"** (low) — Spiritual Attunement
  and Improved Blessing of Sanctuary refund mana to the **paladin**, not to
  healers. Reworded the overview + strengths line in `data/specGuides.ts` to
  self-sustain phrasing (the JSON blurb was already correct).

### OPEN — needs your call

- **warrior/protection stat priority: Shield Block Value above Stamina**
  (medium). The verifier argues survival-first prot should rank Stamina before
  SBV. **But** the file's own `statPriorityRationale` deliberately defends the
  current order: "shield block value doubles as threat (Shield Slam) and
  mitigation, which is why prot warriors gear block value where druids would
  stack armor." So this is a documented editorial choice, not an internal
  contradiction — TBC prot threat-vs-EH ordering is genuinely debated. Left
  as-is; change only if you want to commit to the survival-first ordering
  (Defense → Stamina → SBV → Hit → Expertise) across all 5 PvE files.

## Batch 3 — pending
## Batch 4 — pending
