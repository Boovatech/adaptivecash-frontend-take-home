# AdaptiveCash Frontend Take-Home

Neutral starter repository for the Requests & Signing Readiness assignment.

The page shown after startup is intentionally a **blank candidate canvas**, not
an AdaptiveCash product shell. It contains no production navigation, dashboard,
AI assistant or finished Requests UI. Information architecture, page
composition and interaction design are part of the candidate's work.

## Start

Prerequisites: Node.js `^20.19.0` or `>=22.12.0` and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:5174`. The full assignment is in
[`docs/hiring/FRONTEND-TAKE-HOME-REQUESTS-AND-SIGNING.md`](docs/hiring/FRONTEND-TAKE-HOME-REQUESTS-AND-SIGNING.md).

Before changing code, run `npm run check`; the supplied API contract tests and
production build must pass. The `/requests` and `/requests/:requestId` routes
are intentionally absent.

## What is provided

- typed request and signing contracts in `@adaptivecash/api-client`;
- a deterministic asynchronous mock in `@adaptivecash/testing`;
- TanStack Query, Fluent UI, Tailwind and Vitest setup;
- design tokens and package boundaries;
- six mock API contract tests.

The candidate owns the app structure, Requests list/detail UI, signing flow,
responsive states and React UX tests. `packages/business-ui` is deliberately an
empty extension point for candidate-owned domain presentation components.

## No backend setup

This repository contains no .NET service, Docker setup or database. The mock
already models latency, cancellation, typed errors, idempotency and the signing
session state machine. Do not replace it with a page-level mock or raw `fetch`.

## Verify

```bash
npm run check
```

Add the four React UX tests required by the assignment without replacing or
weakening the supplied contract tests.
