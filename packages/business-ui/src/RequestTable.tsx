import {
  Link,
  Table,
  TableBody, TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Tooltip
} from "@fluentui/react-components";
import {
  CashRequestSummary,
  CashServiceType,
  RequestStatus
} from "@adaptivecash/api-client";
import { StatePill, StatusTone } from "@adaptivecash/shared-ui";

export const REQUEST_STATUS_LABELS: Record<RequestStatus,
  string> = {
  Draft: 'Draft',
  InReview: 'In review',
  ReadyForSignature: 'Ready for signature',
  Signing: 'Signing',
  Submitted: 'Submitted',
  Failed: 'Failed'
};

const REQUEST_STATUS_TONE: Record<RequestStatus, StatusTone>
  = {
  Draft: 'gray',
  InReview: 'orange',
  ReadyForSignature: 'blue',
  Signing: 'purple',
  Submitted: 'green',
  Failed: 'red'
};

const SERVICE_LABELS: Record<CashServiceType, string> = {
  CashCollection: 'Cash collection',
  CashDelivery: 'Cash delivery'
};

export function RequestStatusPill({ status }: { status: RequestStatus }) {
  return <StatePill value={REQUEST_STATUS_LABELS[status]}
                    tone={REQUEST_STATUS_TONE[status]} />;
}

function TruncatedText({ text, className, style }: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Tooltip content={text} relationship="label">            
      <span className={`block truncate ${className ?? ''}`}
            style={style}>                                               
        {text}                                               
      </span>
    </Tooltip>
  );
}

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit'
});

function formatWhen(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}

export function RequestTable({ requests, onOpen }: {
  requests: CashRequestSummary[], onOpen: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <Table aria-label="Cash requests" size="small" style={{ minWidth: 880, tableLayout: "fixed" }}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell style={{ width: 150 }}>Request ID</TableHeaderCell>
            <TableHeaderCell style={{ width: 130 }}>Service</TableHeaderCell>
            <TableHeaderCell style={{ width: 130 }}>Applicant</TableHeaderCell>
            <TableHeaderCell style={{ width: 130 }}>Requested for</TableHeaderCell>
            <TableHeaderCell style={{ width: 130 }}>Status</TableHeaderCell>
            <TableHeaderCell style={{ width: 130 }}>Owner</TableHeaderCell>
            <TableHeaderCell style={{ width: 130 }}>Updated</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id} onClick={() => onOpen(req.id)} className="cursor-pointer">
              <TableCell>
                <Link
                  as="button"
                  className="whitespace-nowrap font-mono"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen(req.id);
                  }}>
                  {req.id}
                </Link>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {SERVICE_LABELS[req.serviceType]}
              </TableCell>
              <TableCell>
                <div className="flex min-w-0 flex-col">
                  <TruncatedText text={req.applicant} className="font-semibold" />
                  <TruncatedText text={req.branch} className="text-xs" style={{ color: 'var(--ac-ink-muted)' }} />
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {formatWhen(req.requestedFor)}
              </TableCell>
              <TableCell>
                <RequestStatusPill status={req.status} />
              </TableCell>
              <TableCell>
                <TruncatedText text={req.owner} />
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {formatWhen(req.updatedAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}