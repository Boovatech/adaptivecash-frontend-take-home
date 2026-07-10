import { Button, ProgressBar } from '@fluentui/react-components';
import { Panel, SectionHeader, StatePill, Text } from '@adaptivecash/shared-ui';
import type { DocumentRow } from '@adaptivecash/business-ui';

export function SigningPage({ documents, navigate }: { documents: DocumentRow[]; navigate: (path: string) => void }) {
  const active = documents.filter((d) => d.state.includes('sign') || d.state === 'Sent for signing');

  return (
    <div>
      <SectionHeader
        eyebrow="Signing"
        title="Signing queue"
        description="Legal actions are deterministic and require explicit human confirmation. AI can summarize, but cannot sign or approve."
      />
      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {active.map((doc) => {
          const [done, total] = doc.signers.split('/').map((n) => parseInt(n, 10));
          const progress = total ? done / total : 0.1;
          return (
            <Panel className="p-3.5" key={doc.id}>
              <div className="flex items-center justify-between gap-2">
                <StatePill value={doc.state} />
                <span className="font-mono text-xs">{doc.id}</span>
              </div>
              <h3 className="my-2.5 text-base font-semibold">{doc.title}</h3>
              <Text variant="muted" className="mb-2.5">
                {doc.signers} signers complete · due {doc.due}
              </Text>
              <ProgressBar value={progress} className="mb-3.5" />
              <div className="flex items-center justify-between gap-4">
                <Button appearance="primary" onClick={() => navigate(`/documents/${encodeURIComponent(doc.id)}`)}>
                  Open review
                </Button>
                <Button appearance="secondary">View policy</Button>
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
