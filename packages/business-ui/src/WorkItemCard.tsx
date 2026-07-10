import { Panel, Text } from '@adaptivecash/shared-ui';
import { Badge } from '@fluentui/react-components';
import type { WorkItem } from './types';

export function WorkItemCard({ item }: { item: WorkItem }) {
  return (
    <Panel className="p-3">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-semibold" style={{ color: 'var(--ac-primary)' }}>
          {item.type}
        </span>
        <Text variant="caption">AC-{item.id}</Text>
      </div>
      <h4 className="my-2 text-sm font-semibold leading-snug">{item.title}</h4>
      <Text variant="caption" as="div" className="mb-2 flex items-center justify-between">
        <span>{item.area}</span>
        <span>{item.assignee}</span>
      </Text>
      <div className="flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <Badge key={tag} appearance="tint" color="informative">
            {tag}
          </Badge>
        ))}
      </div>
    </Panel>
  );
}
