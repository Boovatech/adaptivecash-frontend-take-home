# Architecture Fitness Functions

Measurable checks that keep the architecture on its declared path (ADR-009/010, DESIGN.md, AGENTS.md).
Automated ones run in `scripts/check_architecture.py` (`python scripts/check_architecture.py`); the rest are
review rubrics applied at release/design reviews. A fitness function that is neither automated nor scheduled
is a wish, not a function.

Cadence: **commit** = runs in the architecture gate on every change; **review** = applied manually per release or design review.

## FM — Frontend maintainability

| ID | Fitness function | Target | Measured by | Cadence |
|----|-----------------|--------|-------------|---------|
| FM-1 | ADR-009 import boundaries (shared-ui → design-tokens only; business-ui never → apps/api-client; design-tokens → nothing; apps never → other apps; no direct FAST/web-components imports) | 0 violations | script: `Import boundary:` checks | commit |
| FM-2 | Raw hex/rgb color literals confined to `packages/design-tokens` | 0 files outside | script | commit |
| FM-3 | No server state in Zustand stores (TanStack Query owns it, ADR-009) | 0 stores with fetch/query patterns | script | commit |
| FM-4 | Component file size ceiling | ≤250 lines per `.tsx` | script | commit |
| FM-5 | TypeScript compiles (`tsc --noEmit`) | pass | script | commit |
| FM-6 | Dependencies version-pinned (no `latest`) | 0 `latest` pins | script | commit |
| FM-7 | One styling system per concern: Fluent components for behavior, tokens for color, Tailwind for layout only | no ad-hoc CSS systems introduced | review | review |

## FD — Diagram clarity

| ID | Fitness function | Target | Measured by | Cadence |
|----|-----------------|--------|-------------|---------|
| FD-1 | Every C4/flow view doc has rendered SVG+PNG in `images/` | all present | script | commit |
| FD-2 | Every view has a Mermaid source in `diagrams/mermaid/` | all present | script | commit |
| FD-3 | Node budget per view | ≤12 nodes | script (mermaid parse) | commit |
| FD-4 | Every node justified in `NODE_NECESSITY_MATRIX.md` | 100% | review | review |
| FD-5 | Layout legibility: minimal edge crossings, consistent left→right/top→bottom flow, readable labels at 100% zoom, consistent shape language per element type | rubric 1–5, ≥4 | review of rendered PNGs | review |
| FD-6 | Each view doc states Purpose + Key points (why this view exists) | present | review | review |

## FU — UI appropriateness and beauty (vs DESIGN.md "Ledger Desk")

| ID | Fitness function | Target | Measured by | Cadence |
|----|-----------------|--------|-------------|---------|
| FU-1 | Colors come only from tokens (`--ac-*`) | 0 raw literals (= FM-2) | script | commit |
| FU-2 | Amber used sparingly: primary actions, active nav, focal accents only; white text on amber/navy fills | rubric | review of rendered pages | review |
| FU-3 | Status always color + text, never color alone | 100% of status indicators | review | review |
| FU-4 | Density: compact rows, tight metric cards, no gradient/glass/oversized cards ("no SaaS gloss") | rubric 1–5, ≥4 | review | review |
| FU-5 | WCAG AA contrast for token pairs (ink/bg, muted/bg, white/primary, white/secondary, status fg/bg) | ≥4.5:1 body, ≥3:1 large/UI | computed from token hex values | review |

## FX — UX usability

| ID | Fitness function | Target | Measured by | Cadence |
|----|-----------------|--------|-------------|---------|
| FX-1 | System status visible: data source (mock/live), loading states (`aria-busy`), active hub always evident | present on every page | review of running app | review |
| FX-2 | Navigation depth: any hub reachable in ≤2 interactions; document detail in ≤2 from any list | met | review | review |
| FX-3 | Semantic roles and keyboard reachability: toolbar/tab/nav roles present, focus visible, no mouse-only actions | no violations on reviewed pages | review (+ browser a11y audit when available) | review |
| FX-4 | Every page has sensible loading and empty states; destructive/legal actions confirm intent | present | review | review |
| FX-5 | Interaction grammar consistent across hubs: same command bar, header, context-rail placement and behavior | no per-hub deviations | review | review |

## Operating rules

- The script section of these functions **gates commits**: `RESULT: ... 0 failed` before pushing frontend or docs changes.
- A rubric score below target is a finding in the next quality evaluation report, with a ranked fix.
- Thresholds (250 lines, 12 nodes, AA contrast) are deliberate defaults; change them by editing this file and the script in the same commit, with a one-line rationale in the commit message.
- Latest evaluation against these functions: `docs/architecture/QUALITY_EVALUATION-2026-07.md`.
