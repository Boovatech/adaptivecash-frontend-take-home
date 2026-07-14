import { Panel, SectionHeader, Text } from "@adaptivecash/shared-ui";
import { Button, Field, SearchBox, Select, Spinner } from "@fluentui/react-components";
import { RequestStatus } from "@adaptivecash/api-client";
import { useState } from "react";
import { useRequestsQuery } from "../api/useRequestsQuery";
import { RequestTable, REQUEST_STATUS_LABELS } from "@adaptivecash/business-ui";

export function RequestsPage({ navigate }: { navigate: (path: string) => void }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<RequestStatus | ''>('');
  const filters = { query: search.trim() || undefined, status: status || undefined };
  const { data, isLoading, isError, refetch, isFetching } = useRequestsQuery(filters);
  const open = (id: string) => navigate(`/requests/${encodeURIComponent(id)}`);
  const STATUS_ORDER: RequestStatus[] = [
    'Draft',
    'InReview',
    'ReadyForSignature',
    'Signing',
    'Submitted',
    'Failed'
  ];

  return (
    <div className="min-w-0">
      <Panel className="mb-3.5 p-3.5">
        <div className="flex flex-row flex-wrap items-end justify-start gap-3">
          <Field label="Search" className="w-72 max-w-full">
            <SearchBox
              value={search}
              placeholder="Request ID, applicant or branch"
              onChange={(_, d) => setSearch(d.value)}
            />
          </Field>
          <Field label="Status" className="w-56 max-w-full">
            <Select value={status} onChange={(_, d) =>
              setStatus(d.value as RequestStatus | '')}>
              <option value="">All statuses</option>
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>
                  {REQUEST_STATUS_LABELS[s]}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </Panel>
      <Panel className="overflow-hidden">
        <div
          className="flex items-center justify-between gap-4 
  border-b p-3.5"
          style={{ borderColor: 'var(--ac-line-soft)' }}
        >
          <h3 className="m-0 text-base                       
  font-semibold">Results</h3>
          <Text variant="muted" as="span" aria-live="polite">
            {isLoading
              ? 'Loading requests…'
              : data
                ? `${data.length} request${data.length === 1
                  ? '' : 's'} found`
                : ''}
          </Text>
        </div>

        {isLoading ? (
          <div className="p-8">
            <Spinner label="Loading requests…" />
          </div>
        ) : isError && !data ? (
          <div className="p-8">
            <Text className="mb-3 block">Could not load requests.</Text>
            <Button appearance="primary" onClick={() =>
              refetch()}>
              Retry
            </Button>
          </div>
        ) : data && data.length === 0 ? (
          <div className="p-8">
            <Text variant="muted">No requests match the current search and filter.</Text>
          </div>
        ) : (
          <div aria-busy={isFetching}>
            <RequestTable requests={data ?? []} onOpen={open} />
          </div>
        )}
      </Panel>
    </div>
  );
}
