# Product

## Register

product

## Users

Internal, authenticated bank/CIT operations staff (document owners, reviewers, signers, risk officers, ops leads) at tenant banks like "ACME Bank Ukraine." They work inside a dense, workflow-heavy console for most of a shift: triaging document inboxes, moving items through a signing workflow, checking evidence/audit trails, and monitoring pipeline/build health. Many already use Azure DevOps or similar Microsoft enterprise tools daily, so information density and predictable interaction patterns (boards, command bars, tables) matter more than visual novelty.

## Product Purpose

AdaptiveCash Portal is the thin, workflow-first layer on top of the legacy aDocs/aCash document and signing system: document inbox and review, sequential/parallel signing, an append-only evidence/audit ledger, and an advisory-only AI assist rail. It exists because the legacy system has no workflow state machine, audit ledger, or modern UI. Success looks like: reviewers can find and act on the right document fast, every legally-relevant action is auditable, and AI assists without ever silently touching signers or evidence.

## Brand Personality

Confident, precise, evidence-first. Voice terms already in use across the product: workflow-first, evidence-first, AI-assisted. The interface currently reads as a close Azure DevOps/Fluent skin (Microsoft blue #0078d4, Segoe UI, 2px radii) — familiar to the target users, but not distinctly AdaptiveCash. Direction: keep the information-dense DevOps-style layout grammar (boards, command bars, tables, contextual rail) that users already understand, but move the palette and type off Microsoft's exact identity so it reads as AdaptiveCash's own enterprise product, not a Microsoft skin.

## Anti-references

No specific named anti-reference. General guidance: avoid generic SaaS/marketing gloss (gradient hero sections, glassmorphism, oversized rounded cards) — this is a dense, utilitarian ops console, not a landing page.

## Design Principles

1. **Legal actions are never silent.** Signing, approval, and deletion require explicit human confirmation in the UI; AI-assist surfaces are visually and structurally distinct from action surfaces.
2. **Density over decoration.** Users are here to process work, not admire a marketing page — every visual choice should increase scanability (tables, status pills, compact cards) over ornamentation.
3. **Familiar interaction grammar, distinct identity.** Reuse the DevOps-style mental model (boards, command bars, contextual rail) the audience already knows; don't reuse Microsoft's exact brand identity to get there.
4. **One component system, one truth.** Shared visual/interaction patterns (status pills, cards, tables, command bars) live in one shared place, not duplicated per hub view.
5. **Evidence and workflow state are always visible.** Document state, risk, and evidence status should be legible at a glance from any list or card view.

## Accessibility & Inclusion

WCAG 2.1 AA baseline: verified color contrast (body text ≥4.5:1, including on status pills and muted text), full keyboard navigation and visible focus states, semantic roles/labels for icon-only controls, and screen-reader-friendly status/state announcements. Reduced-motion alternative required for any transition/animation.
