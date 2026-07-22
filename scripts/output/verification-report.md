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

## Batch 3 — 8 specs (2026-07-22)

Specs: rogue/assassination, priest/holy, priest/shadow, shaman/elemental,
shaman/enhancement, mage/arcane, mage/fire, warlock/demonology. 10 findings
(mage/arcane clean). All APPLIED — commit `<pending>`. Mostly WotLK
anachronisms and talent-impossible abilities/items in TBC 2.4.3:

- **priest/shadow PvP guide cited Dispersion throughout** (high) — a Wrath
  (3.0.2) ability nonexistent in TBC. Rewrote overview/strengths/weakness/
  rotation/playstyle/commonMistakes to TBC peels (Shield, Psychic Scream,
  Fade, kiting).
- **shaman/enhancement PvE rotation used Lava Lash** (high) — a WotLK ability.
  Removed from overview + rotation; TBC priority is Stormstrike → Earth/Flame
  Shock with the weapon imbue up.
- **warlock/demonology PvP rotation listed UA** (medium) — Unstable Affliction
  is the 41-pt Affliction capstone, impossible on a Felguard/Soul Link demo
  build. Removed from the DoT list.
- **mage/fire PvE rotation aligned Icy Veins** (medium) — a deep-Frost talent a
  ~2/48/11 raid Fire build can't reach. Replaced with Combustion + Bloodlust +
  trinkets. (mage/arcane's Icy Veins reference was NOT flagged and is left as-is.)
- **shaman/elemental** (medium×2 + low) — PvP blurb named Wind Shear (WotLK) and
  claimed "instant Chain Lightning procs"; overview/strengths called Elemental
  Mastery "instant". EM is guaranteed-crit + free-cast, not instant. Reworded
  blurb (json) + overview/strengths (guides).
- **priest/holy** (medium + low) — PvE rotation called Inner Focus a
  "guaranteed-crit" (it's +25% crit, not auto-crit); PvP overview name-dropped
  Guardian Spirit (WotLK). Both reworded.
- **rogue/assassination Phase 5** (low) — Warglaive of Azzinoth (a sword) listed
  as a MH/OH alternative, but Mutilate requires daggers. Removed both entries
  (Combat parses that leaked into the Assassination bucket).

## Batch 4 — 4 specs (2026-07-22)

Specs: warlock/destruction, druid/balance, druid/feral-bear, druid/feral-cat.
2 findings (balance + feral-bear clean). All APPLIED — commit `<pending>`.

- **druid/feral-cat PvE guide built around Savage Roar** (high) — Savage Roar is
  a WotLK (3.0.2) ability, and even there it buffs physical damage, not attack
  speed as the guide claimed. Removed from overview/rotation/playstyle/
  commonMistakes/faq; replaced with the real TBC cat loop (Mangle + Shred + Rip,
  Ferocious Bite as filler finisher).
- **warlock/destruction PvP** (low) — statPriorityRationale named "Chaos Bolt"
  (a WotLK Destruction spell). Reworded to Conflagrate + Shadow Bolt burst.

---

## Summary — all 28 specs verified

**Applied: 22 fixes across 4 batches** (commits `d998245`, `84e17c7`,
`220ffb5`, `<batch4>`). Dominant failure modes:
1. **WotLK abilities cited in a TBC 2.4.3 site** — Penance, Dispersion, Lava
   Lash, Wind Shear, Guardian Spirit, Chaos Bolt, Savage Roar, Focused Aim.
2. **Talent-impossible abilities/items for the spec** — UA on Demonology,
   Icy Veins on Fire, Warglaive (sword) on dagger specs.
3. **Mechanic misstatements** — Inner Focus / Elemental Mastery described as
   guaranteed-crit or instant when they aren't; Spiritual Attunement "returns
   mana to healers"; Kill Command "on pet crit".
4. **Malformed item IDs** — 4 retail IDs (68 occurrences) breaking Wowhead links.

**Left OPEN for your decision (2):**
- **warrior/arms Phase 4–5 weapons** are dual-wield Warglaives (a Fury config)
  on a two-handed spec — the WCL aggregation folded Fury parses into the Arms
  list for late phases. Needs a call: substitute a 2H, or point late-phase Arms
  at the Fury list. (I won't invent a BiS weapon.)
- **warrior/protection stat priority** ranks Shield Block Value above Stamina.
  The verifier prefers survival-first; the file deliberately documents the
  threat+mitigation rationale for the current order. Defensible as-is — change
  only if you want to commit to Defense → Stamina → SBV → Hit → Expertise.

Specs that came back clean: mage/arcane, druid/balance, druid/feral-bear
(plus every spec not otherwise listed above had no BiS-item defects beyond
what's noted).
