import { Panel, StatePill, Text } from '@adaptivecash/shared-ui';
import { AiAssistRail, type PortalSnapshot } from '@adaptivecash/business-ui';
import type { RouteState } from './routes';

export function ContextRail({
  route,
  snapshot,
  navigate
}: {
  route: RouteState;
  snapshot: PortalSnapshot;
  navigate: (path: string) => void;
}) {
  const selected = route.documentId
    ? snapshot.documents.find((doc) => doc.id === route.documentId)
    : snapshot.documents.find((doc) => !['Verified', 'Archived'].includes(doc.state)) ?? snapshot.documents[0];

  return (
    <aside
      aria-label="Contextual AI and evidence rail"
      className="sticky top-3.5 grid h-max content-start gap-3 max-lg:static max-sm:hidden"
    >
      <AiAssistRail
        selectedLabel={selected?.id ?? 'this workspace'}
        question="What is pending on"
        answer="One signer remains. The current version hash is captured and the next action is signer review. AI cannot sign or approve."
        onViewDocument={() => selected && navigate(`/documents/${encodeURIComponent(selected.id)}`)}
        onOpenSigning={() => navigate('/signing')}
        onOpenEvidence={() => navigate('/evidence')}
      />
      <Panel className="p-3.5">
        <h3 className="m-0 mb-3 text-base font-semibold">Workspace signals</h3>
        <dl className="m-0 grid gap-2">
          <div className="flex items-center justify-between gap-2 text-xs">
            <Text variant="caption" as="dt">Selected</Text>
            <dd className="m-0 font-mono">{selected?.id}</dd>
          </div>
          <div className="flex items-center justify-between gap-2 text-xs">
            <Text variant="caption" as="dt">Risk</Text>
            <dd className="m-0">{selected ? <StatePill value={selected.risk} /> : '—'}</dd>
          </div>
          <div className="flex items-center justify-between gap-2 text-xs">
            <Text variant="caption" as="dt">Evidence</Text>
            <dd className="m-0">Hash + manifest</dd>
          </div>
        </dl>
      </Panel>
    </aside>
  );
}
