import { Panel, SectionHeader, Text } from '@adaptivecash/shared-ui';
import { TimelineItem, type PortalSnapshot } from '@adaptivecash/business-ui';

export function EvidencePage({ snapshot }: { snapshot: PortalSnapshot }) {
  return (
    <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(320px,.8fr)] items-start gap-4 max-lg:grid-cols-1">
      <div>
        <SectionHeader eyebrow="Evidence" title="Audit timeline" className="mb-3" />
        <ol className="m-0 list-none p-0">
          {snapshot.evidenceEvents.map((item) => (
            <TimelineItem key={`${item.time}-${item.action}`} item={item} />
          ))}
        </ol>
      </div>
      <Panel className="p-4">
        <h3 className="mb-2 mt-0 text-base font-semibold">Evidence package</h3>
        <Text variant="muted" className="mb-2">
          Archive-ready proof bundle for signed documents.
        </Text>
        <Text variant="muted" as="ul" className="pl-[18px]">
          <li>Document version hash</li>
          <li>Signer intent and step-up context</li>
          <li>Signature validation report</li>
          <li>Outbox correlation and audit chain</li>
        </Text>
      </Panel>
    </div>
  );
}
