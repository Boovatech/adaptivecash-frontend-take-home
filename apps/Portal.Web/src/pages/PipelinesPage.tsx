import { Panel, SectionHeader, StatePill, Text } from '@adaptivecash/shared-ui';
import type { PipelineRun } from '@adaptivecash/business-ui';

export function PipelinesPage({ pipelineRuns }: { pipelineRuns: PipelineRun[] }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Pipelines"
        title="Build and verification status"
        description="Prototype view for CI/CD quality checks and Phase 0.5 aDocs tracer evidence."
      />
      <div className="grid gap-2.5">
        {pipelineRuns.map((run) => (
          <Panel
            className="grid grid-cols-[1fr_auto_auto] items-center gap-[18px] p-3.5 max-sm:grid-cols-1 max-sm:items-start max-sm:gap-2"
            key={run.name}
          >
            <div>
              <h3 className="m-0 mb-1 text-base font-semibold">{run.name}</h3>
              <Text variant="muted">
                {run.stage} · commit {run.commit}
              </Text>
            </div>
            <StatePill value={run.result} />
            <span className="font-mono text-xs">{run.duration}</span>
          </Panel>
        ))}
      </div>
    </div>
  );
}
