## Plan: Embed "Systems Audit Mode" persona (Auditor agent)

Following established pattern (verbatim source + partner interpretation + INDEX entry). No frontend changes. Companion to the previously-embedded Mermaid Mapping Mode (Mapper) — together they form the 3-mode OS with Architect (still pending future upload).

### 1. Source document (verbatim, untouched)
**File:** `src/master/knowledge/source-documents/experience-prompts/systems-audit-mode.source.md`

- Full markdown of the parsed `.docx`, preserved exactly — no edits.
- Frontmatter: `type: source`, `status: immutable`, `category: experience-prompts/systems-audit`, `backend-only: true`, pointer to partner.

### 2. Partner document (interpretation layer)
**File:** `src/master/knowledge/partner-documents/experience-prompts/systems-audit-mode.partner.md`

Contents:
- **Title / Category:** Experience Prompts → Systems Audit & Diagnostic
- **Purpose:** Defines the **Auditor** agent — pressure-tests systems for hidden manual work, broken transitions, missing states, permission flaws, scale fragility, and operator burden.
- **Influences:** When to enter audit mode; the 10 audit layers (Business Logic, Object Model, State Model, Workflow, Permissions, UI/UX, Operator Burden, Exception/Failure, Scalability, Traceability); 7 sub-modes (Flow / State / Portal UX / Operator Load / Data-Object / Scale-Stress / Edge Case); Bug Classification (Critical/High/Medium/Low + 11 type tags); 9-section output standard (Executive Diagnosis → Next Actions); the failure-mode detection checklist.
- **Triggers:** "audit / pressure-test / find bugs / what breaks at scale / review this workflow / inspect the booking funnel / what's fragile / edge cases" — plus auto-trigger when a workflow has hidden complexity.
- **Mode orchestration:** Architect → Mapper → Auditor → Mapper → Architect. Pairs explicitly with Mermaid Mapping Mode for visual evidence (per the source's "Mermaid Audit Requirement").
- **VeePo / Masters Concierge adaptation (firewall):**
  - Strip generic SaaS / construction / wedding / portal-CRM vocabulary; apply only to Masters surfaces — booking funnel, modal lifecycle, photo upload, concierge handoff, reveal day, future admin/portal if added.
  - Honor locked memories: Booking Funnel (4-step), Modal Lifecycle Management, Booking Submission Animation, Loading Sequence, Hero Section Lock, Booking Modal Architecture. Audit findings that contradict these surface as **memory-conflict flags**, never silent design changes.
  - Backend-only: audits live in chat / planning docs, never restyle the UI.
  - Use Masters' nouns: Customer, Concierge, Technician, Detail Bay, Booking, Vehicle, Service, Reveal, Photo Asset.
  - Honor brand UI Strict rules (no rounded cards, ghost buttons, human imagery) — audits never propose violations.
- **Dependencies:** Mermaid Systems Mapping Mode (for evidence diagrams), Brand Identity Architect v1+v2, Anti-Gravity Opening Engineer v1+v2, Booking Funnel + Modal Lifecycle memories.
- **Scope:** Global, invoked selectively when system-truth pressure-testing is needed.
- **Practical examples:** Audit booking funnel for conversion leaks; pressure-test modal singleton + AnimatePresence exit logic; portal UX audit of photo upload step; scale audit ("what breaks at 500 concurrent bookings"); edge-case audit ("user closes modal mid-submission while splatter animation is playing").

### 3. INDEX update
**File:** `src/master/knowledge/INDEX.md`

Add row under Experience Prompts after the Mermaid Mapping entry. Keywords: *audit, diagnostic, pressure-test, failure mode, edge case, scale, fragility, permissions, state model, operator burden, traceability, bug classification.*

### Out of scope
No frontend, motion, route, modal, design-token, or dependency changes.