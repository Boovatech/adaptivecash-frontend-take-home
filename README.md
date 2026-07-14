# AdaptiveCash Frontend Take-Home

Starter repository for the Requests & Signing Readiness assignment.

The application you see after startup is a working **prototype shell**, not a
finished solution and not a set of broken product features. Existing hubs are
static demo context. Your implementation scope is the new `/requests` and
`/requests/:requestId` flow described in the assignment; you do not need to
repair or complete the other hubs. Remove the visible starter notice when your
submission is ready.

## Start

Prerequisites: Node.js `^20.19.0` or `>=22.12.0` and npm.

```bash
npm ci
npm run dev
```

On Windows, the first clean `npm ci` can take several minutes while Fluent UI
packages are unpacked. Wait for the final `added ... packages` message before
starting the app.

Open `http://localhost:5174`. The full assignment is in
[`docs/hiring/FRONTEND-TAKE-HOME-REQUESTS-AND-SIGNING.md`](docs/hiring/FRONTEND-TAKE-HOME-REQUESTS-AND-SIGNING.md).

### Expected starter state

The existing portal shell and its `Overview`, `Boards`, `Documents`, `Signing`,
`Evidence`, `Pipelines`, and `AI Assist` hubs should render. The `/requests` and
`/requests/:requestId` routes are intentionally absent: adding them is the
candidate's assignment, not a startup failure. Before changing code, run
`npm run check`; all supplied contract tests and the production build must pass.

## No backend setup

This repository intentionally contains no .NET service, Docker setup or
database. `@adaptivecash/testing` provides an asynchronous in-process
implementation of the typed `PortalRequestsApi` contract. It already models
latency, cancellation, typed errors, idempotency and the signing-session state
machine.

The candidate implements React pages and query/mutation orchestration against
`requestsApi`; the supplied mock itself is not part of the assignment.

## Verify

```bash
npm run check
```

The starter includes six mock contract tests. Add the four React UX tests
required by the assignment without replacing or weakening those tests.
