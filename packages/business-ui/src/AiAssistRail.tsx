import { Panel, Stack, SurfaceBlock, ActionList, Text } from '@adaptivecash/shared-ui';
import { Sparkle24Filled } from '@fluentui/react-icons';

export function AiAssistRail({
  selectedLabel,
  answer,
  question,
  onViewDocument,
  onOpenSigning,
  onOpenEvidence
}: {
  selectedLabel: string;
  question: string;
  answer: string;
  onViewDocument: () => void;
  onOpenSigning: () => void;
  onOpenEvidence: () => void;
}) {
  return (
    <Panel floating className="p-3.5">
      <Stack gap="default">
        <Stack direction="row" gap="default" className="items-center">
          <span
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full"
            style={{ background: 'var(--ac-ai-icon-bg)', color: 'var(--ac-ai-icon-fg)' }}
          >
            <Sparkle24Filled />
          </span>
          <div>
            <Text variant="section">Ask AdaptiveCash AI</Text>
            <Text variant="caption" as="p">
              Advisory only
            </Text>
          </div>
        </Stack>
        <SurfaceBlock tone="question">
          {question} <strong>{selectedLabel}</strong>?
        </SurfaceBlock>
        <SurfaceBlock tone="answer">{answer}</SurfaceBlock>
        <ActionList
          items={[
            { label: 'View document', onClick: onViewDocument },
            { label: 'Open signer queue', onClick: onOpenSigning },
            { label: 'Review audit trail', onClick: onOpenEvidence }
          ]}
        />
        <Text variant="caption" as="small" style={{ color: 'var(--ac-ai-disclosure)' }}>
          AI can make mistakes. Verify important information.
        </Text>
      </Stack>
    </Panel>
  );
}
