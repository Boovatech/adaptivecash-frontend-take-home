---
name: AdaptiveCash Portal
description: Dense, evidence-first workflow console for document review, signing, and audit
colors:
  primary: "#B8622E"
  primary-deep: "#8F4A20"
  accent: "#212C42"
  accent-deep: "#141A28"
  ink: "#23262B"
  muted: "#5B5E66"
  bg: "#FFFFFF"
  surface: "#F5F6F8"
  border: "#E2E4E9"
  border-soft: "#EDEEF1"
  success: "#1F7A3D"
  success-bg: "#E4F5EA"
  warning: "#9A5B00"
  warning-bg: "#FCEFD8"
  danger: "#A32A2A"
  danger-bg: "#FBE7E7"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.01em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
rounded:
  sm: "4px"
  md: "6px"
  lg: "10px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "18px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "32px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  button-secondary:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "32px"
  status-pill:
    rounded: "{rounded.pill}"
    padding: "2px 8px"
    typography: "{typography.label}"
---

# Design System: AdaptiveCash Portal

<!-- plan-session-link:v1
{
  "protocol": "plan-session-link/v1",
  "transport": "claude-code",
  "planner_session": {
    "descriptor": "adaptivecash-portal-design-system",
    "session_ref": null,
    "session_id": "a9b9e160-5c36-497b-8ea2-60b8d6b9d828",
    "project_dir": "C:\\specs\\boova\\new\\adaptivecash-portal-s",
    "created_at": "2026-07-07T11:41:18Z",
    "machine_hint": null
  },
  "response_contract": {
    "unknown_tokens": [
      "ASK_HUMAN:",
      "I don't know address this question to human"
    ]
  },
  "ask": {
    "command": "claude",
    "use_fork_session": true,
    "max_turns": 1,
    "disallow_tools": true,
    "timeout_seconds": 300
  }
}
-->
<!-- plan-session-link: unverified - implementor should escalate to the human directly.
     verify failed: this session's transcript is registered under a different
     project directory (adaptivecash_static_package), not adaptivecash-portal-s,
     so the feedback address could not be confirmed reachable on this machine. -->

## 1. Overview

**Creative North Star: "The Ledger Desk"**

A bank ops console modeled on the physical desk of a document examiner: warm brass-amber for anything that needs a human decision (open items, primary actions, active state), deep ledger-navy ink for structure and permanence, and a lot of plain white paper in between. The system currently on disk is a close skin of Microsoft's Azure DevOps (Fluent blue #0078d4, Segoe UI, 2px radii) — familiar to the target ops staff, but not AdaptiveCash's own identity. This spec replaces that identity while keeping the interaction grammar (boards, command bars, dense tables, contextual rail) the audience already knows.

This system explicitly rejects generic SaaS gloss: no gradient hero panels, no glassmorphism, no oversized rounded cards. It is a dense, utilitarian tool for people processing documents for hours, not a pitch.

**Key Characteristics:**
- Warm amber primary used sparingly (primary actions, active nav, focal accents) against a white/near-white field
- Deep navy-ink as the second brand color for structure: headers-on-dark contexts, the top bar, emphasis text
- Information density over whitespace: compact rows, tight metric cards, no decorative padding
- Status is always color + text (never color alone), using conventional semantic hues (green/amber/red) distinct from the brand pair

## 2. Colors

Restrained strategy: one warm brand primary at low overall surface coverage, a dark ink-navy for structural elements, and a near-white/white neutral field carrying the rest of the interface.

### Primary
- **Ledger Amber** (#B8622E / oklch(0.58 0.15 55)): primary buttons, active nav indicator, focal accents, the single warm note in an otherwise neutral interface. White text only — never dark text on this fill.
- **Ledger Amber Deep** (#8F4A20): hover/pressed state for primary amber surfaces.

### Secondary
- **Ledger Navy** (#212C42 / oklch(0.28 0.05 245)): the top bar background, brand mark, and any surface that needs to read as "structural" rather than "actionable." White text only.
- **Ledger Navy Deep** (#141A28): hover/pressed state, and the darkest structural surface (e.g. a footer or the app shell's outermost frame if ever needed).

### Neutral
- **Paper White** (#FFFFFF): page background. Pure white, no warm or cool tint — the brand's warmth lives in Primary and the ink, not in the page itself.
- **Desk Surface** (#F5F6F8): sunken panels — sidebar nav background, table header rows, hover rows. Never used for the same element type as Paper White in the same view (they're a pair: raised = white, sunken = surface).
- **Ledger Ink** (#23262B): all body text and headings. ≥7:1 against Paper White.
- **Ink Muted** (#5B5E66): secondary text, captions, timestamps, table meta rows. ≥4.5:1 against Paper White — verified, not the washed-out gray this category usually defaults to.
- **Line** (#E2E4E9) / **Line Soft** (#EDEEF1): borders and dividers. Line for structural borders (table outer edge, panel borders); Line Soft for internal dividers (row separators).

### Status tones (semantic, not brand)
- **Success** (#1F7A3D on #E4F5EA): verified, allowed, succeeded.
- **Warning** (#9A5B00 on #FCEFD8): in review, waiting, medium risk.
- **Danger** (#A32A2A on #FBE7E7): failed, blocked, high risk.

### Named Rules
**The One Warm Note Rule.** Ledger Amber appears on primary actions and the active-nav indicator only. It never fills a background section, a card, or a table row — its rarity against the white/navy field is what makes it read as a decision point rather than decoration.

**No Muddy Status Rule.** Every status pill pairs a saturated-enough text color with a light tinted background (never a mid-gray "neutral" pill standing in for an actual state) so meaning is never carried by hue alone at a glance.

## 3. Typography

**Display/Body Font:** Inter (with -apple-system, BlinkMacSystemFont, "Segoe UI" fallback)
**Mono Font:** ui-monospace / SFMono-Regular / Menlo / Consolas

**Character:** One neutral, highly-legible grotesque at multiple weights carries the whole system — a dashboard this dense has no room for a second display face competing for attention. Segoe UI is kept only as a fallback, not the primary identity choice, since it's the strongest Microsoft-identity tell in the current implementation.

### Hierarchy
- **Display** (600, 1.75rem/28px, 1.2 line-height, -0.01em tracking): hub page titles ("Overview", "Documents").
- **Title** (600, 1.375rem/22px, 1.25 line-height): section headings within a hub (e.g. "Document inbox").
- **Body** (400, 0.875rem/14px, 1.5 line-height): table cells, card copy, all reading content. Max ~70ch where prose wraps.
- **Label** (600, 0.75rem/12px, 0.01em tracking): status pills, table headers, form labels. Sentence case, not uppercase — this system does not use the uppercase-tracked-eyebrow pattern.
- **Mono** (400, 0.75rem/12px): document IDs, version hashes, correlation IDs.

### Named Rules
**The Sentence-Case Label Rule.** Labels, table headers, and section kickers use sentence case with weight (600) for hierarchy, never `text-transform: uppercase`. The current implementation's `.eyebrow` (uppercase, tracked, above nearly every section) is retired system-wide — at that frequency it reads as template scaffolding, not information.

## 4. Elevation

Flat by default, functional shadow only. The current implementation already leans flat (`0 1px 2px rgba(0,0,0,.08)` on nearly everything, applied uniformly whether or not the element is actually elevated); this system narrows shadow to two real roles instead of one blanket default.

### Shadow Vocabulary
- **resting** (`box-shadow: 0 1px 2px rgba(23, 27, 33, 0.06)`): default card/panel border reinforcement. Subtle enough to be nearly invisible at rest.
- **raised** (`box-shadow: 0 8px 24px rgba(23, 27, 33, 0.10)`): hover state on interactive cards (work items, board cards) and the sticky contextual AI rail. Signals "this responds to you."

### Named Rules
**The Earned Shadow Rule.** A shadow only deepens on interaction (hover/focus) or on a genuinely floating element (sticky rail, popover). A static card at rest gets a 1px border, not a shadow doing a border's job.

## 5. Components

### Buttons
- **Shape:** 4px radius (sm), not Fluent's 2px — enough to read as AdaptiveCash's own, not a Microsoft screenshot.
- **Primary:** Ledger Amber fill (#B8622E), white text, 0 12px padding, 32px height. Hover → Ledger Amber Deep (#8F4A20).
- **Secondary:** white fill, Ledger Ink text, 1px Line border. Hover → Desk Surface background.
- **Icon-only:** 32×32px, transparent, must carry an `aria-label` (several exist today with only a glyph and no label — see Accessibility in PRODUCT.md).

### Status Pills
- **Style:** pill radius (999px), 2px 8px padding, Label typography, tinted background + saturated text per the Status tones above (never brand Amber/Navy — status and brand are visually distinct vocabularies).

### Cards / Containers (work cards, board columns, metric tiles)
- **Corner Style:** 6px radius.
- **Background:** Paper White on Desk Surface board columns; Desk Surface on the page-level sunken areas (board column bodies).
- **Shadow Strategy:** resting at rest, raised on hover (work cards only — static metric tiles stay flat, never hover-elevate something non-interactive).
- **Border:** 1px Line Soft.
- **Internal Padding:** 12–16px (md/lg).

### Tables
- **Style:** Desk Surface header row, Line Soft row dividers, Ledger Ink body text, Ink Muted for secondary line (owner/workflow captions under a title).
- **Row hover:** Desk Surface background, not a colored tint — hover signals "row is interactive," it doesn't imply status.

### Navigation (side rail)
- **Style:** Desk Surface background, active item indicated by a filled Desk-Surface-to-white background swap plus the Ledger Amber left rule (3px) — this is the one sanctioned left-border accent in the system, an interactive-state indicator, not decoration on a static card.
- **Typography:** Label for the item name, Ink Muted caption below.
- **Mobile:** collapses to icon-only, horizontal scroll strip below 760px (existing behavior retained).

### AI Assist Rail (signature component)
Distinct visual register from the rest of the UI: Ledger Navy spark icon on a tinted navy chip, "raised" shadow (it's the one genuinely floating/sticky panel), and a persistent "Advisory only" / "AI can make mistakes" disclosure. This is intentional — the AI surface should never be visually confusable with a transactional action surface (per PRODUCT.md's "legal actions are never silent" principle).

## 6. Do's and Don'ts

### Do:
- **Do** keep Ledger Amber to primary actions and the active-nav rule only — check any new screen for amber creeping into backgrounds or cards.
- **Do** use sentence-case, weighted labels (Label typography) for anything that currently reaches for an uppercase eyebrow.
- **Do** pair every status color with visible text, never color-only meaning.
- **Do** keep the page background pure white (#FFFFFF) and reserve Desk Surface (#F5F6F8) for sunken panels only.
- **Do** verify Ink Muted (#5B5E66) contrast on every new light background — it's tuned for exactly 4.5:1 on white; a tinted background under it can silently fail.

### Don't:
- **Don't** reintroduce Microsoft Fluent blue (#0078d4) or Segoe UI as the primary typeface — both are direct identity tells this redesign exists to remove.
- **Don't** use `text-transform: uppercase` on section kickers/eyebrows above every section — the current `.eyebrow` class pattern is retired.
- **Don't** use `border-left`/`border-right` as a decorative colored stripe on cards or board columns (the current board-column top-stripe-by-color-per-column pattern is exactly this and should be replaced with the column header dot/label already present, not a bar of color).
- **Don't** add a shadow to a static, non-interactive element (a metric tile, a resting panel) — shadows are earned by hover/focus/floating status only.
- **Don't** ship generic SaaS gloss (gradient hero panels, glassmorphism) anywhere in this console.
