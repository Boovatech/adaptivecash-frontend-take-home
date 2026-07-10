# @adaptivecash/api-client

Generated TypeScript clients from .NET OpenAPI contracts.

Rules:

- feature modules use this package instead of raw fetch;
- generated models are not domain entities;
- breaking API changes require generated-client update and contract tests.

The current `requests` contract is hand-written starter code for the frontend
assignment. It preserves the boundary that a generated OpenAPI client will
replace later; feature components should depend on `PortalRequestsApi`, not on
the mock implementation.
