# Candidate UI guardrails

<!-- plan-session-link:v1
{
  "protocol": "plan-session-link/v1",
  "transport": "codex",
  "planner_session": {
    "descriptor": "neutral-candidate-ui-guardrails",
    "session_ref": null,
    "session_id": "019f667a-505a-7920-b212-1bbe7fe419d6",
    "project_dir": "C:\\specs\\boova\\adaptivecash-portal\\take-home\\adaptivecash-frontend-take-home",
    "created_at": "2026-07-15T15:57:59Z",
    "machine_hint": null
  },
  "response_contract": {
    "unknown_tokens": [
      "ASK_HUMAN:",
      "I don't know address this question to human"
    ]
  },
  "ask": {
    "command": "codex",
    "read_only": true,
    "timeout_seconds": 300
  }
}
-->

This document defines constraints, not a finished AdaptiveCash interface.
Candidates are expected to make and explain their own information-architecture,
layout and responsive-design decisions for the Requests & Signing flow.

## What must remain consistent

- Use Fluent UI React v9 for interactive controls and feedback.
- Use values from `@adaptivecash/design-tokens`; do not add raw brand or status
  colours in application code.
- Treat the interface as a compact operational tool, not a marketing page.
- Keep legal/signing actions explicit, reviewable and reversible until the
  external provider verifies the operation.
- Preserve readable hierarchy, semantic status text and keyboard access.

## What is deliberately not prescribed

- application shell or navigation pattern;
- page grid, sidebar, context rail or dashboard structure;
- table-versus-card treatment on small screens;
- exact component appearance beyond Fluent UI and token constraints;
- placement of filters, actions, evidence and signing status.

The starter screen is not a visual reference for the submitted solution. It is
an assignment boundary marker and should be replaced or integrated into the
candidate's own route structure.

## Token roles

Use the supplied semantic roles rather than copying a screenshot:

- `--ac-bg`, `--ac-surface`: page and grouped-content surfaces;
- `--ac-ink`, `--ac-ink-muted`: primary and secondary text;
- `--ac-line`, `--ac-line-soft`: structural separation;
- `--ac-primary`: primary emphasis and actionable accents;
- `--ac-success`, `--ac-warning`, `--ac-danger` and matching `*-bg` tokens:
  status feedback with visible text labels.

Status colour never replaces status text. Contrast, focus visibility and
minimum target sizes still apply even when a Fluent component is customised.

## Responsive acceptance

Verify the final flow at approximately `1280x800` and `390x844` with the longest
seeded IDs and applicant names. Horizontal table scrolling is acceptable when
it is intentional and does not make page-level controls inaccessible. A mobile
summary layout is also acceptable.

## Evaluation boundary

Visual polish is evaluated only after correctness: loading/error/empty states,
confirmation, idempotency, provider polling and honest terminal status are more
important than decorative detail. At the same time, merely reproducing the
starter canvas does not demonstrate product-design judgment.
