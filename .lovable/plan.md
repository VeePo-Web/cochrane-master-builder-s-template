## Plan — Embed Navigation Architect Persona (v3 snapshot)

The uploaded `GENERAL_PROMPT_for_NAV_BARS_AND_NAV_PAGES-3.docx` is byte-identical in content to the `-2.docx` already embedded last turn as the canonical Navigation Architect Persona. Per your selection, I will store it as a **versioned snapshot** for audit-trail purposes and route all decision logic back to the canonical v2 partner doc — so future AI consultations have a single source of truth and don't get confused by two parallel interpretation layers.

### Files to create

1. **`src/master/knowledge/source-documents/navigation/navigation-architect-persona.v3.source.md`**
   - Verbatim, untouched copy of the `-3.docx` content (all 11 pages, including the trailing `<mark>FANTASY.CO</mark>` instruction block).
   - Frontmatter notes: `version: v3`, `uploaded: 2026-05-01`, `canonical: ./navigation-architect-persona.source.md`, `status: snapshot`.
   - No edits, no cleanup, no summarization inside the file body.

2. **`src/master/knowledge/partner-documents/navigation/navigation-architect-persona.v3.partner.md`**
   - Short partner doc (not a full re-interpretation).
   - Explicitly states: this snapshot exists for provenance only; **all decision logic, brand mapping, Calem Wood adaptations, nav/footer coherence rules, mobile specs, and "Never No Changes" mandate live in the canonical partner doc** at `partner-documents/navigation/navigation-architect-persona.partner.md`.
   - Includes a diff note: "Content matches v2 verbatim; no semantic delta detected. Treat v2 partner as authoritative."
   - Trigger keywords intentionally **not** duplicated here — to avoid splitting the topic-index across two files.

3. **`src/master/knowledge/INDEX.md`** (update)
   - Under the existing **Navigation — Wayfinding & Sitewide Nav Systems** category, add a single sub-bullet under the canonical entry:
     - `↳ v3 snapshot (provenance only) — source-documents/navigation/navigation-architect-persona.v3.source.md`
   - No new top-level category. No new keyword routes. The canonical v2 entry remains the only one the decision-map points to.

### What will NOT change
- `navigation-architect-persona.source.md` (canonical v2) — untouched.
- `navigation-architect-persona.partner.md` (canonical v2) — untouched.
- All other knowledge files — untouched.
- Front-end code — untouched (zero React/CSS/component changes).
- Memory index — untouched (no new core rules; nav specs already covered).

### Decision-routing behavior after embed
When future prompts ask about nav bars, footers, wayfinding, hover states, mobile menus, mega menus, breadcrumbs, accessibility of nav, or "Never No Changes" audits → the system will continue to consult the **canonical v2 partner doc only**. The v3 snapshot is reachable via direct path lookup but is not in the active decision rotation.

### Rationale for this approach
Embedding a second full partner doc with identical guidance would create two competing interpretation layers and dilute decision quality — the opposite of the intent. A thin provenance snapshot preserves the upload trail (in case you later upload a `-3.docx` that *does* differ and want to compare) without polluting the routing layer.