import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Tooltip
} from '@fluentui/react-components';
import { StatePill } from '@adaptivecash/shared-ui';
import type { DocumentRow } from './types';

function TruncatedText({
  text,
  className,
  style
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Tooltip content={text} relationship="label">
      <span className={`block truncate ${className ?? ''}`} style={style}>
        {text}
      </span>
    </Tooltip>
  );
}

export function DocumentTable({
  documents,
  onOpen
}: {
  documents: DocumentRow[];
  onOpen: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <Table aria-label="Document inbox" size="small" style={{ minWidth: 720, tableLayout: 'fixed' }}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell style={{ width: 118 }}>ID</TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell style={{ width: 130 }}>Counterparty</TableHeaderCell>
            <TableHeaderCell style={{ width: 118 }}>State</TableHeaderCell>
            <TableHeaderCell style={{ width: 64 }}>Signers</TableHeaderCell>
            <TableHeaderCell style={{ width: 96 }}>Due</TableHeaderCell>
            <TableHeaderCell style={{ width: 84 }}>Risk</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id} onClick={() => onOpen(doc.id)} className="cursor-pointer">
              <TableCell>
                <Link
                  as="button"
                  className="whitespace-nowrap font-mono"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen(doc.id);
                  }}
                >
                  {doc.id}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex min-w-0 flex-col">
                  <TruncatedText text={doc.title} className="font-semibold" />
                  <TruncatedText
                    text={`${doc.workflow} · owner ${doc.owner}`}
                    className="text-xs"
                    style={{ color: 'var(--ac-ink-muted)' }}
                  />
                </div>
              </TableCell>
              <TableCell>
                <TruncatedText text={doc.counterparty} />
              </TableCell>
              <TableCell>
                <StatePill value={doc.state} />
              </TableCell>
              <TableCell>{doc.signers}</TableCell>
              <TableCell className="whitespace-nowrap">{doc.due}</TableCell>
              <TableCell>
                <StatePill value={doc.risk} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
