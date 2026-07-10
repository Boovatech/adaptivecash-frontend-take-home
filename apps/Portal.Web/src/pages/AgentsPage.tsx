import { Panel, SectionHeader, StatePill, Text } from '@adaptivecash/shared-ui';
import type { PortalSnapshot } from '@adaptivecash/business-ui';

export function AgentsPage({ snapshot }: { snapshot: PortalSnapshot }) {
  return (
    <div>
      <SectionHeader eyebrow="AI Assist" title="Advisory agent workspace" className="mb-3" />
      <div className="grid max-w-[820px] gap-2.5">
        {snapshot.aiPolicy.allowedAssistiveActions.map((action) => (
          <Panel className="flex items-center justify-between gap-4 p-3.5" key={action}>
            <div>
              <h3 className="m-0 mb-1 text-base font-semibold">{action.replace(/_/g, ' ')}</h3>
              <Text variant="muted">Allowed as an advisory, cited, tenant-scoped assistant capability.</Text>
            </div>
            <StatePill value="Allowed" />
          </Panel>
        ))}
        <Panel className="flex items-center justify-between gap-4 p-3.5" style={{ borderColor: 'var(--ac-danger)' }}>
          <div>
            <h3 className="m-0 mb-1 text-base font-semibold">Signing, approval, deletion</h3>
            <Text variant="muted">{snapshot.aiPolicy.redactionNotice}</Text>
          </div>
          <StatePill value="Blocked" />
        </Panel>
      </div>
    </div>
  );
}
