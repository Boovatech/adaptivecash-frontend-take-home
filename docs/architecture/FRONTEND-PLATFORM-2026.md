# Frontend Platform 2026

## Final direction

AdaptiveCash Portal uses a **governed multi-app monorepo**:

```text
apps/client-app      - external client / signer / requester portal
apps/provider-app    - CIT/provider/operations workspace
apps/admin-app       - tenant/system administration
```

The current `apps/Portal.Web` is a prototype and transition shell.

## Shared packages

```text
packages/design-tokens
packages/shared-ui
packages/business-ui
packages/api-client
packages/auth
packages/i18n
packages/validation
packages/testing
```

## Stack

| Layer | Decision | Boundary |
| --- | --- | --- |
| Runtime | React + TypeScript + Vite | No SSR/RSC for the authenticated signing portal MVP. |
| Primary UI | Fluent UI React | Enterprise components, a11y, forms, tables, dialogs, command bars. |
| Layout | Tailwind CSS | Layout/responsive composition only. |
| Special widgets | FAST / Fluent Web Components | Through `shared-ui` wrappers only. |
| Server state | TanStack Query | API data, caching, invalidation. |
| UI state | React local state / Zustand | Shell state only. |
| API | Generated TypeScript client | From .NET OpenAPI contracts. |

## Security and context boundaries

A monorepo does not make apps less safe if runtime boundaries are explicit. Enforce:

- app-specific OIDC clients/scopes where needed;
- server-side permission checks on every API command/query;
- tenant context on every data access path;
- app-specific route guards;
- separate deployment artifacts when risk/cadence differs;
- CI lint rules preventing cross-app imports.

## Import rules

```text
client-app   -> shared packages + client modules only
provider-app -> shared packages + provider modules only
admin-app    -> shared packages + admin modules only
shared-ui    -> design-tokens only; no API or business logic
business-ui  -> shared-ui + design-tokens + domain-neutral types
```

## UI component promotion rule

Start local. Promote to shared only when reuse appears at least twice.

## Why this is maintainable

- One place for design tokens and component governance.
- One generated API-client strategy.
- Different user contexts without runtime micro-frontend complexity.
- App boundaries are visible in code and can become separate deployments later.
