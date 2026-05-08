## Plan: Embed "Mermaid Diagram + Systems Mapping Mode" persona

Following the established pattern (verbatim source + partner interpretation + INDEX entry). No frontend changes.

### 1. Create source document (verbatim, untouched)
**File:** `src/master/knowledge/source-documents/experience-prompts/mermaid-systems-mapping-mode.source.md`

- Full markdown of the parsed `.docx`, preserved exactly as provided (no edits, cleanup, or summarization inside the file).
- Frontmatter: `type: source`, `status: immutable`, `category: experience-prompts/systems-mapping`, `backend-only: true`, pointer to partner file.

### 2. Create partner document (interpretation layer)
**File:** `src/master/knowledge/partner-documents/experience-prompts/mermaid-systems-mapping-mode.partner.md`

Contents:
- **Title / Category:** Experience Prompts → Systems Mapping & Diagramming
- **Purpose:** Backend reasoning aid for when Lovable needs to externalize architecture, flows, states, object models, or exception paths as Mermaid diagrams to expose hidden complexity.
- **What it influences:** Decisions about when to produce diagrams vs prose; choice of diagram type (flowchart / sequence / state / ER / journey / gantt); diagram packs (System Context, Workflow, State, Object, Exception); naming consistency; bug-revelation discipline.
- **Trigger prompts:** "map the system / flow / lifecycle", "show me how X works", "audit this workflow", "diagram the booking funnel / admin ops / portal handoff", branching logic, multi-actor interactions, state transitions.
- **Mode orchestration:** Defines the Architect → Mapper → Auditor handoff (with Mapper as this persona's primary agent role).
- **VeePo / Masters Concierge adaptation (firewall):**
  - Strip any unrelated context (weddings, generic SaaS, foreign portals); apply only to Masters' domain — booking funnel, detailing service flow, customer ↔ concierge ↔ technician handoffs, photo upload review, status lifecycle.
  - Honor locked memories: Booking Funnel (4-step right-panel), Booking Submission Animation, Modal Lifecycle Management, Loading Sequence — diagrams describe these flows, never propose redesigns of them.
  - Backend-only intelligence: never render Mermaid diagrams in the live UI unless explicitly requested; this persona shapes reasoning, planning docs, and chat responses, not user-facing components.
  - Brand-tone diagram naming: use Masters' operational vocabulary (Concierge, Detail Bay, Intake, Reveal) over generic placeholder names when authoring examples.
- **Dependencies / related docs:** Brand Identity Architect v1+v2, Anti-Gravity Opening Engineer v1+v2, Booking Funnel feature memory, Modal Lifecycle Management memory.
- **Scope:** Global (applies whenever structural visualization is useful), but invoked selectively per the doc's "If a diagram does not improve reasoning, do not make it" rule.
- **Practical examples:** Mapping the booking-modal state machine; diagramming intake → triage → assignment → reveal; ER for Customer / Vehicle / Service / Booking / Photo objects; exception map for failed uploads or rejected bookings.

### 3. Update INDEX
**File:** `src/master/knowledge/INDEX.md`

Add a new row under Experience Prompts pointing to both source and partner files, with keywords: *mermaid, diagram, systems mapping, flowchart, state diagram, ER, sequence, workflow, audit, architecture visualization*.

### Out of scope
No edits to any frontend component, route, hero, modal, motion, or design token. No new dependencies. `.lovable/plan.md` may be touched as part of the existing knowledge-system bookkeeping pattern, consistent with prior persona embeds.