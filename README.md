# AdaptiveCash Frontend Take-Home

Private starter repository for the Requests & Signing Readiness assignment.

## Start

Prerequisites: Node.js `^20.19.0` or `>=22.12.0`, npm and Python 3.

```bash
npm ci
npm run dev
```

Open `http://localhost:5174`. The full assignment is in
[`docs/hiring/FRONTEND-TAKE-HOME-REQUESTS-AND-SIGNING.md`](docs/hiring/FRONTEND-TAKE-HOME-REQUESTS-AND-SIGNING.md).

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
npm test
npm run build
python scripts/check_architecture.py
```

The starter includes six mock contract tests. Add the four React UX tests
required by the assignment without replacing or weakening those tests.
