# Тестове завдання: Requests & Signing Readiness

<!-- plan-session-link:v1
{
  "protocol": "plan-session-link/v1",
  "transport": "codex",
  "planner_session": {
    "descriptor": "frontend-candidate-requests-signing-assignment",
    "session_ref": null,
    "session_id": "019f40ae-a9be-7821-88b7-364846a74220",
    "project_dir": "C:\\specs\\boova\\new\\adaptivecash-portal-s",
    "created_at": "2026-07-10T12:29:44Z",
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

> Candidate-facing document. Його можна передавати кандидату без додаткових
> усних вимог. Усі обов'язкові критерії та правила оцінювання наведені нижче.

## Коротко

За 6-8 годин потрібно виконати короткий modern-frontend review, спроєктувати й
додати дві сторінки (`/requests` і `/requests/:requestId`), підключити готовий
typed mock API через TanStack Query, реалізувати безпечний
confirmation/pending/result UX для зовнішньої signing session і щонайменше
чотири React UX tests. Не потрібно змінювати backend, писати mock API,
реалізовувати справжню КЕП або будувати нову design system.

## 1. Контекст

AdaptiveCash Portal переносить старі desktop/web-функції роботи із заявками та
документами у новий React-портал. Найближчий реліз має дати банківському
оператору мінімальний, але надійний шлях без паперу:

1. знайти заявку;
2. перевірити її дані та прикріплені документи;
3. підтвердити намір підписати;
4. перейти до зовнішнього провайдера КЕП;
5. побачити чесний статус сесії підписання.

Реальний криптографічний провайдер ще не підключений. У завданні використовується
детермінований mock API. Кнопка у браузері не має права самостійно робити заявку
`Signed` або `Submitted`.

## 2. Мета

Перетворити нейтральний starter canvas на `Requests` experience із release-ready
вертикальним сценарієм та показати сучасний підхід до React:

- React 19 + TypeScript;
- Fluent UI React v9;
- TanStack Query для server state;
- існуючі design tokens;
- явні loading, empty, error та pending states;
- доступний і адаптивний UX;
- компоненти, які можна розвивати й повторно використовувати без передчасної
  універсалізації.

Це не конкурс на найбільшу кількість коду або найефектніший dashboard.

## 3. Timebox

Рекомендований час: **6-8 годин**.

Після 8 годин зупиніться. Незавершене коротко опишіть у `DECISIONS.md`. Добре
обмежений scope оцінюється вище, ніж велика, але нестабільна реалізація.

Stretch goals не впливають на основний бал.

## 4. Початок роботи

Після отримання посилання на starter repository:

```bash
git clone https://github.com/Boovatech/adaptivecash-frontend-take-home.git
cd adaptivecash-frontend-take-home
npm ci
npm run dev
```

Після запуску ви побачите **нейтральний starter canvas**, а не готовий
AdaptiveCash portal shell. Production navigation, dashboards, AI surfaces і
Requests UI навмисно не надані. Структура сторінок, інформаційна ієрархія та
responsive composition є частиною завдання. Scope — routes `/requests` і
`/requests/:requestId`; не потрібно вигадувати інші product hubs.

На Windows перший чистий `npm ci` може тривати кілька хвилин через розпакування
Fluent UI packages. Дочекайтеся повідомлення `added ... packages`, після чого
запускайте `npm run dev`.

Для перевірки:

```bash
npm run check
```

Окремий backend **не потрібен**. Не запускайте .NET, Docker або базу даних:
`@adaptivecash/testing` надає асинхронний in-process mock реалізації
`PortalRequestsApi`. Він має latency, typed `404/409/503`, cancellation,
idempotency та signing state machine, тому React-код працює з ним як із
віддаленим API boundary. Дані синтетичні та повертаються до початкового стану
після перезавантаження сторінки.

Сумісні aliases `npm run dev:prototype`, `npm run test:prototype` і
`npm run build:prototype` також залишені у starter repository.

Основні місця:

```text
apps/Portal.Web
packages/design-tokens
packages/shared-ui
packages/business-ui
packages/api-client
```

Перед початком перегляньте:

- `PRODUCT.md`;
- `DESIGN.md`;
- `docs/architecture/FRONTEND-PLATFORM-2026.md`.

Starter canvas не є візуальним референсом для фінального рішення. Замініть або
інтегруйте його у власну мінімальну route structure та додайте вертикальний
сценарій, не копіюючи production UI з інших продуктів чи screenshots.

## 5. Обов'язковий user flow

### A. Requests list

Додайте route `/requests` і зрозумілий entry point до нього.

Сторінка повинна містити:

- компактну таблицю заявок;
- пошук за номером, клієнтом або відділенням;
- фільтр за статусом;
- кількість знайдених заявок;
- явний loading state;
- empty state для порожнього результату;
- error state з дією `Retry`;
- перехід до `/requests/:requestId` через доступне посилання або кнопку.

Рекомендовані колонки:

```text
Request ID | Service | Applicant / branch | Requested for | Status | Owner | Updated
```

Таблиця не повинна ламати layout на вузькому екрані. Дозволено горизонтальний
scroll зі стабільною мінімальною шириною або окреме компактне mobile-подання.

### B. Request detail

Сторінка `/requests/:requestId` показує:

- номер, тип послуги, заявника, відділення та заплановану дату;
- поточний workflow status;
- owner;
- перелік документів із версією та hash;
- короткий evidence/status timeline;
- contextual next action;
- повернення до списку без втрати зрозумілого контексту.

Для відсутньої заявки покажіть нормальний not-found state, а не exception або
порожню сторінку.

### C. Start signing session

Кнопка `Review and sign` доступна лише у стані `ReadyForSignature`.

Перед створенням сесії покажіть Fluent UI `Dialog`, де користувач бачить:

- request ID;
- ім'я очікуваного підписанта;
- immutable document version/hash;
- пояснення, що підпис буде виконаний зовнішнім провайдером;
- `Cancel` та явну дію підтвердження.

Після підтвердження:

1. створіть idempotency key;
2. виконайте mutation `createSigningSession`;
3. заблокуйте повторне натискання на час запиту;
4. покажіть pending state;
5. після відповіді покажіть provider URL та expiration time;
6. перевіряйте статус сесії до terminal state;
7. покажіть `Verified`, `Failed` або `Expired` із коректною наступною дією.

Заявка не стає `Submitted` оптимістично. Успіх показується лише після відповіді
mock provider зі статусом `Verified`.

## 6. Готовий domain contract

Типи вже надані у `packages/api-client/src/requests.ts`. Нижче наведена частина
контракту для орієнтації; створювати або дублювати ці типи не потрібно:

```ts
export type RequestStatus =
  | 'Draft'
  | 'InReview'
  | 'ReadyForSignature'
  | 'Signing'
  | 'Submitted'
  | 'Failed';

export interface CashRequestSummary {
  id: string;
  serviceType: 'CashCollection' | 'CashDelivery';
  applicant: string;
  branch: string;
  requestedFor: string;
  status: RequestStatus;
  owner: string;
  updatedAt: string;
}

export interface RequestDocument {
  id: string;
  name: string;
  versionId: string;
  versionHash: string;
  status: 'Ready' | 'RequiresReview';
}

export type SigningSessionStatus =
  | 'Pending'
  | 'AwaitingProvider'
  | 'Verified'
  | 'Failed'
  | 'Expired';
```

Готові synthetic seed data містять шість заявок, різні статуси та довгі назви.

## 7. Готовий mock API

Mock API вже реалізований і покритий contract tests:

```text
packages/api-client/src/requests.ts
packages/testing/src/requests/mockRequestsApi.ts
packages/testing/src/requests/requestFixtures.ts
apps/Portal.Web/src/api/requestsApi.ts
apps/Portal.Web/src/api/requestsApi.test.ts
```

Кандидат не повинен змінювати його, якщо не знайшов підтверджений bug. Завдання
полягає у правильному використанні API з React і TanStack Query.

Готовий boundary має такий рівень:

```ts
export interface PortalRequestsApi {
  listRequests(
    filters: { query?: string; status?: RequestStatus },
    signal?: AbortSignal
  ): Promise<CashRequestSummary[]>;

  getRequest(requestId: string, signal?: AbortSignal): Promise<CashRequestDetail>;

  createSigningSession(command: {
    requestId: string;
    documentVersionId: string;
    versionHash: string;
    idempotencyKey: string;
  }): Promise<SigningSession>;

  getSigningSession(sessionId: string, signal?: AbortSignal): Promise<SigningSession>;
}
```

У page/query layer використовуйте готовий singleton:

```ts
import { requestsApi } from './api/requestsApi';

useQuery({
  queryKey: ['requests', tenantId, filters],
  queryFn: ({ signal }) => requestsApi.listRequests(filters, signal)
});
```

Для UI-тестів доступний controller:

```ts
import { requestsApiMock } from './api/requestsApi';

beforeEach(() => requestsApiMock.reset());

requestsApiMock.failNext('list');
requestsApiMock.setSigningOutcome('Failed');
requestsApiMock.setSigningOutcome('Expired');
```

Наданий mock уже гарантує:

- deterministic, без `Math.random()` у тестових сценаріях;
- latency 300-700 ms, щоб UX states можна було побачити;
- керований success/error/expired scenario;
- підтримка `AbortSignal` для reads;
- create operation із тим самим idempotency key не створює другу сесію;
- невідома заявка повертає typed `404` error;
- спроба підписання у неправильному workflow state повертає typed `409` error;
- керований provider/service failure повертає typed `503` error;
- signing session проходить лише дозволені переходи
  `Pending -> AwaitingProvider -> Verified|Failed|Expired`;
- mock ніколи не приймає password, private key або credential container.

Raw `fetch` у page/component не дозволений. `requestsApiMock` використовується
тільки у test/dev scenario code, не у presentation components.

## 8. Modern React expectations

### Server та client state

- Queries, cache, mutation і polling належать TanStack Query.
- Filter input, dialog visibility і view preference є local/UI state.
- Не копіюйте query result у `useState` або Zustand.
- Query key повинен містити tenant та filters, які впливають на результат.
- Після terminal mutation інвалідуйте тільки релевантні queries.

### Effects

- Не використовуйте `useEffect` для derived data або звичайної реакції на click.
- Якщо effect синхронізує timer, browser API або іншу зовнішню систему, він має
  повний cleanup.
- Реалізація повинна коректно працювати у React `StrictMode` без подвійної
  create-signing side effect.
- Не додавайте `useMemo`/`useCallback` до кожної функції. Використовуйте їх лише
  там, де можете пояснити користь.

### Component boundaries

- Page/module orchestration залишається в `apps/Portal.Web`.
- Reusable domain presentation може бути в `packages/business-ui`.
- `business-ui` не викликає API, не читає auth/storage і не приймає рішення про
  permissions.
- У `shared-ui` потрапляє лише справді generic primitive.
- Новий reusable component має мати невеликий typed props contract і окремий
  приклад хоча б у сторінці або тесті.

Достатньо якісно виділити **один або два** reusable components. Велика власна
design system не потрібна.

## 9. UX та visual constraints

- Використовуйте Fluent UI React v9 для controls, dialog, table, badges та
  feedback.
- Колір береться лише з `@adaptivecash/design-tokens`; raw hex/rgb за межами
  token package не допускається.
- Tailwind використовується для layout, spacing, responsive composition та
  overflow.
- Starter canvas задає лише boundary, а не готовий layout. Кандидат самостійно
  визначає shell, hierarchy і mobile composition та коротко пояснює їх у
  `DECISIONS.md`.
- Інтерфейс має бути щільним operational console, а не landing page.
- Legal action ніколи не є silent або автоматичною.
- Status завжди має видимий текст, а не тільки колір.
- Перевірте desktop приблизно 1280x800 і mobile приблизно 390x844.
- Long IDs, applicant names і status labels не перекривають сусідній content.
- Icon-only controls мають accessible name/tooltip.
- Async status повідомляється через відповідний `aria-live`/Fluent feedback.
- Keyboard user може знайти заявку, відкрити її, пройти dialog та скасувати дію.

Не витрачайте час на dark theme, анімації, gradients або декоративний redesign.

## 10. Required states

Під час demo повинні бути відтворювані:

| Surface | States |
| --- | --- |
| Requests list | loading, populated, filtered empty, load error |
| Request detail | loading, loaded, not found, load error |
| Signing command | idle, confirmation, submitting, provider pending |
| Signing result | verified, failed, expired |

Не обов'язково робити окремий dev panel. Сценарії можуть перемикатися seed
configuration, query parameter або test adapter.

## 11. React UX tests

Vitest, jsdom та React Testing Library уже налаштовані. Contract tests готового
mock API вже проходять і не зараховуються як робота кандидата.

Додайте мінімум чотири meaningful React UX tests:

1. list показує loading, а потім дані та фільтрує їх;
2. load error показує `Retry`, після якого дані з'являються;
3. signing API не викликається до явного підтвердження і не викликається двічі
   під час pending;
4. UI не показує `Verified` до відповідного provider response та коректно
   обробляє failed/expired result.

Тести перевіряють поведінку через roles, labels і user interactions, а не
внутрішні state variables або implementation details.

## 12. Definition of done

Обов'язкова частина готова, якщо:

- [ ] `/requests` і `/requests/:requestId` працюють після browser refresh;
- [ ] list/detail/signing flow використовують typed API adapter;
- [ ] server state керується TanStack Query;
- [ ] legal action має confirmation і double-submit protection;
- [ ] `Verified` не симулюється клієнтом;
- [ ] loading, empty, error та retry states видимі;
- [ ] layout придатний для desktop і mobile;
- [ ] reusable components не залежать від API/auth/storage;
- [ ] `MODERN-FRONTEND-REVIEW.md` містить аналіз і dependency diagram;
- [ ] надані mock API contract tests залишаються green;
- [ ] щонайменше чотири додані React UX tests проходять;
- [ ] `npm run build:prototype` проходить;
- [ ] `npm run check` проходить;
- [ ] у repository немає secrets або реальних персональних/банківських даних.

## 13. Deliverables

1. Код у branch або archive з короткою commit history.
2. `MODERN-FRONTEND-REVIEW.md`, максимум одна сторінка, з аналізом стартового
   snippet та Mermaid dependency diagram.
3. `DECISIONS.md`, максимум одна сторінка:
   - що увійшло у 6-8 годин;
   - де проходять component/state/API boundaries;
   - який technical debt свідомо залишено;
   - що ви зробили б наступним для production rollout.
4. Два screenshots: desktop list/detail та mobile critical flow.
5. Команди запуску й тестів.
6. `AI-NOTES.md`, 5-15 рядків, якщо використовувався AI:
   - для чого;
   - що було перевірено вручну;
   - один приклад, де AI-рішення було виправлено або відхилено.

AI та офіційна документація дозволені. Кандидат відповідає за кожен рядок і має
бути готовий пояснити рішення на follow-up.

## 14. Out of scope

- backend/.NET зміни;
- реалізація або redesign наданого mock API;
- справжня КЕП-криптографія;
- password/private-key upload;
- identity provider integration;
- file upload/preview engine;
- drag-and-drop workflow board;
- micro-frontends;
- реалізація інших portal hubs, dashboard або AI assistant;
- production deployment.

## 15. Stretch goals

Тільки після Definition of done:

- filters у URL із коректним back/forward navigation;
- polling policy із backoff та припиненням у background tab;
- один Playwright happy-path test;
- measured rendering improvement для 1,000 rows із коротким profiler note;
- feature flag між mock та HTTP adapter.

Stretch не компенсує відсутність error state, confirmation або тестів.

## 16. Оцінювання: 100 балів

Критерії відкриті, прихованих вимог немає.

| Dimension | Points | Що оцінюється |
| --- | ---: | --- |
| Release UX | 20 | Чіткий list-detail-signing flow, потрібні states, мінімум зайвих кроків, mobile usability. |
| Modern React | 20 | Hooks і derived state, коректні effects/cleanup, StrictMode safety, зрозуміла component composition. |
| Server state та API | 20 | Коректне використання готового API: query keys, cancellation, mutation, polling, invalidation, idempotency і double-submit protection. |
| Reuse та boundaries | 15 | Правильне розміщення app/business/shared code, typed props, відсутність API/auth у presentation components. |
| Tests та accessibility | 15 | Meaningful interaction tests, keyboard/focus, semantic controls, text status, async feedback. |
| Architecture review та communication | 10 | Якість `MODERN-FRONTEND-REVIEW.md`, dependency diagram, зрозумілий `DECISIONS.md`, чесний scope/debt. |

Орієнтир:

- `85-100`: strong ready-to-contribute result;
- `70-84`: good result, невеликі прогалини можна закрити в onboarding;
- `55-69`: потрібен follow-up та цільове навчання;
- `<55`: поки недостатньо для самостійної роботи над release frontend.

Critical findings, які обмежують результат до 59 незалежно від visual quality:

- UI самостійно позначає заявку signed/submitted до provider verification;
- signing side effect дублюється в StrictMode або при double click;
- private key/password/secret потрапляє у frontend або repository;
- reusable UI component напряму читає auth/storage або викликає API;
- happy path є, але немає observable failure/retry path.

## 17. Follow-up discussion

Після виконання очікується 30-45 хвилин технічного walkthrough:

1. Чому server state не знаходиться у Zustand/local state?
2. Де effect був потрібен, як працює cleanup і що перевіряє StrictMode?
3. Як UI гарантує, що одна дія не створить дві signing sessions?
4. Чому обраний component reusable, а інший залишився app-specific?
5. Що ви скоротили заради релізу і як розширювали б модуль далі?
6. Як контракт зміниться при заміні mock на generated OpenAPI client?

## 18. Корисні офіційні матеріали

- React: You Might Not Need an Effect:
  https://react.dev/learn/you-might-not-need-an-effect
- React `useEffect` та cleanup/StrictMode:
  https://react.dev/reference/react/useEffect
- TanStack Query overview:
  https://tanstack.com/query/latest/docs/framework/react/overview
- TanStack Query invalidation:
  https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation
- Fluent UI React v9:
  https://react.fluentui.dev/
- React Testing Library:
  https://testing-library.com/docs/react-testing-library/intro/

## Author feedback contract

Майбутні `PLAN-QUESTION` отримують відповіді лише щодо рішень, фактично
прийнятих у цій сесії. Невідомі product, legal, provider або hiring-policy
питання повертаються як `ASK_HUMAN: <exact question>`.
