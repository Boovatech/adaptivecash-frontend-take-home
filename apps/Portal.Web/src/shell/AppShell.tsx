const providedItems = [
  'Typed Requests API contract and deterministic mock',
  'TanStack Query, Fluent UI and test setup',
  'Design tokens and package boundaries',
  'Six API contract tests'
];

const candidateItems = [
  'Information architecture and page composition',
  'Requests list, detail and signing flow',
  'Responsive, accessible interaction states',
  'React UX tests and implementation notes'
];

function ScopeList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="scope-list" aria-labelledby={`${title.toLowerCase().replaceAll(' ', '-')}-title`}>
      <h2 id={`${title.toLowerCase().replaceAll(' ', '-')}-title`}>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function AppShell() {
  return (
    <div className="starter-page">
      <header className="starter-header">
        <div className="starter-wordmark">
          AdaptiveCash <span>Frontend take-home</span>
        </div>
        <span className="starter-version">Starter canvas</span>
      </header>

      <main className="starter-main">
        <div className="starter-intro">
          <div className="starter-kicker">Requests &amp; Signing Readiness</div>
          <h1>Build the Requests &amp; Signing experience</h1>
          <p>
            This repository supplies the engineering boundary, not a finished product screen. The visual hierarchy,
            responsive behavior and interaction design are part of the exercise.
          </p>
        </div>

        <div className="starter-scope" role="status" aria-label="Starter canvas">
          <strong>Intentionally neutral.</strong> This starter intentionally does not include AdaptiveCash product UI,
          navigation, dashboards or AI surfaces.
        </div>

        <div className="scope-grid">
          <ScopeList title="Provided" items={providedItems} />
          <ScopeList title="You own" items={candidateItems} />
        </div>

        <section className="route-brief" aria-labelledby="route-brief-title">
          <div>
            <div className="route-label">Implementation starts here</div>
            <h2 id="route-brief-title">Add two refresh-safe routes</h2>
          </div>
          <div className="route-paths" aria-label="Required routes">
            <code>/requests</code>
            <code>/requests/:requestId</code>
          </div>
        </section>

        <footer className="starter-footer">
          Read <code>docs/hiring/FRONTEND-TAKE-HOME-REQUESTS-AND-SIGNING.md</code>, then run <code>npm run check</code>.
        </footer>
      </main>
    </div>
  );
}
