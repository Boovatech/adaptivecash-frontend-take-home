import type {
  AiPolicySnapshot,
  DocumentRow,
  EvidenceEvent,
  PipelineRun,
  PortalModuleStatus,
  PortalSnapshot,
  TenantInfo,
  WorkItem
} from '@adaptivecash/business-ui';

export type { StatusTone } from '@adaptivecash/shared-ui';
export type { DocumentRow, EvidenceEvent, PipelineRun, PortalSnapshot, WorkItem } from '@adaptivecash/business-ui';

export const workItems: WorkItem[] = [
  { id: 1042, type: 'Epic', title: 'Documents & Signing MVP', state: 'Active', assignee: 'Portal Team', area: 'Documents', tags: ['evidence-first', 'tenant-aware'] },
  { id: 1071, type: 'Feature', title: 'Document inbox with legacy aDocs read model', state: 'Review', assignee: 'Nadia K.', area: 'Documents', tags: ['legacy-adapter'] },
  { id: 1084, type: 'User Story', title: 'As a document owner, I can add sequential signers', state: 'Active', assignee: 'Sergiy H.', area: 'Signing', tags: ['workflow'] },
  { id: 1090, type: 'Task', title: 'Persist audit event and outbox in one transaction', state: 'New', assignee: 'Oleh M.', area: 'Evidence', tags: ['oracle', 'outbox'] },
  { id: 1098, type: 'User Story', title: 'As a signer, I can review an evidence package before archive', state: 'New', assignee: 'Iryna P.', area: 'Evidence', tags: ['archive'] },
  { id: 1105, type: 'Bug', title: 'Prevent AI suggestion tools from changing signers directly', state: 'Done', assignee: 'AI Safety', area: 'AI', tags: ['policy'] }
];

export const documents: DocumentRow[] = [
  { id: 'DOC-2026-0041', title: 'CIT Service Agreement — Region East', counterparty: 'Eastern Cash Logistics', workflow: 'Sequential signing', state: 'Partially signed', due: '2026-07-03', owner: 'Bank Ops', signers: '2 / 3', risk: 'Medium', documentType: 'CIT agreement', versionHash: '9f18e2b7c54d4e1a8bc0', summary: 'Regional CIT services agreement with route SLA terms, liability thresholds, and paperless billing evidence requirements.', nextAction: 'Signer index 3 review and qualified signing intent capture.' },
  { id: 'DOC-2026-0042', title: 'Vault Reconciliation Act — June Cycle', counterparty: 'AdaptiveCash Vault Team', workflow: 'Parallel review', state: 'In review', due: '2026-07-01', owner: 'Cash Center', signers: '0 / 2', risk: 'Low', documentType: 'Reconciliation act', versionHash: '018afe8e9f4f4d72aa2f', summary: 'Monthly vault reconciliation act that needs operations and finance review before archive.', nextAction: 'Risk officer review and comments.' },
  { id: 'DOC-2026-0043', title: 'Cash Collection SLA Addendum', counterparty: 'City Branch Network', workflow: 'Sequential signing', state: 'Sent for signing', due: '2026-07-05', owner: 'Legal Ops', signers: '0 / 4', risk: 'High', documentType: 'SLA addendum', versionHash: 'd48d1e707a4e4f728d2d', summary: 'SLA addendum changes branch collection windows and exception-reporting obligations.', nextAction: 'First signer must authenticate and review terms.' },
  { id: 'DOC-2026-0044', title: 'Paperless Billing Evidence Package', counterparty: 'North CIT Partner', workflow: 'Archive only', state: 'Verified', due: '2026-06-28', owner: 'Billing', signers: '3 / 3', risk: 'Low', documentType: 'Evidence package', versionHash: 'a0b31cc6e9914a89a7a1', summary: 'Completed paperless billing package with validation report and archive manifest.', nextAction: 'Archive retention policy review.' },
  { id: 'DOC-2026-0045', title: 'Cash Center Onboarding Agreement', counterparty: 'South Cash Center', workflow: 'Draft package', state: 'Draft', due: '2026-07-08', owner: 'Implementation', signers: '0 / 3', risk: 'Medium', documentType: 'Onboarding', versionHash: 'f3b48a02c1d14f6dbb10', summary: 'Draft implementation agreement for new cash center onboarding with module rollout milestones.', nextAction: 'Complete metadata and assign first reviewer.' },
  { id: 'DOC-2026-0046', title: 'Route Exception Report Approval', counterparty: 'Metro CIT Partner', workflow: 'Parallel review', state: 'In review', due: '2026-07-02', owner: 'Operations Risk', signers: '0 / 2', risk: 'High', documentType: 'Exception report', versionHash: '714fd47ac5a94df49d7a', summary: 'Exception report for missed branch collection window and billing evidence dispute.', nextAction: 'Risk officer must approve evidence notes.' },
  { id: 'DOC-2026-0047', title: 'Branch Collection Schedule Update', counterparty: 'West Branch Network', workflow: 'Sequential signing', state: 'Sent for signing', due: '2026-07-06', owner: 'Branch Ops', signers: '1 / 4', risk: 'Medium', documentType: 'Schedule update', versionHash: 'e91b22d11c6f4d35a882', summary: 'Updated collection schedule for 18 branches with route SLA dependencies.', nextAction: 'Signer index 2 review and qualified signing intent capture.' },
  { id: 'DOC-2026-0048', title: 'June Audit Archive Manifest', counterparty: 'Internal Audit', workflow: 'Archive only', state: 'Archived', due: '2026-06-30', owner: 'Audit', signers: '4 / 4', risk: 'Low', documentType: 'Archive manifest', versionHash: 'c2af92e42e9d4794a777', summary: 'Completed archive manifest for June signed operational documents and validation reports.', nextAction: 'No action. Retention policy attached.' }
];

export const evidenceEvents: EvidenceEvent[] = [
  { time: '09:12', action: 'Document uploaded', actor: 'Bank Ops', detail: 'SHA-256 hash captured for version 1', tone: 'blue', documentId: 'DOC-2026-0041' },
  { time: '09:16', action: 'AI extraction completed', actor: 'AI Assist', detail: 'Parties, dates, and obligations extracted; no state changes applied', tone: 'purple', documentId: 'DOC-2026-0041' },
  { time: '09:26', action: 'Signer added', actor: 'Sergiy H.', detail: 'Signer index 2 added with sequential policy', tone: 'orange', documentId: 'DOC-2026-0041' },
  { time: '10:05', action: 'Signature verified', actor: 'Legacy aDocs Adapter', detail: 'Provider signature validation passed; evidence package updated', tone: 'green', documentId: 'DOC-2026-0041' }
];

export const pipelineRuns: PipelineRun[] = [
  { name: 'Portal.Api', stage: 'Build + OpenAPI', result: 'Succeeded', duration: '2m 18s', commit: 'phase05' },
  { name: 'Portal.Web', stage: 'Typecheck + Vite build', result: 'Running', duration: '1m 04s', commit: 'routed-ui' },
  { name: 'Frontend verification', stage: 'Tests and build', result: 'Succeeded', duration: '12s', commit: 'phase05' },
  { name: 'Legacy aDocs sandbox', stage: 'Phase 0.5 real run', result: 'Waiting', duration: 'pending', commit: 'manual' }
];

const tenant: TenantInfo = { id: 'ACME-BANK-UA', name: 'ACME Bank Ukraine', isolationMode: 'single-tenant canary', schemaName: 'PORTAL_ACME_BANK_UA' };

const modules: PortalModuleStatus[] = [
  { id: 'documents', label: 'Documents & Review', aiExposure: 'read-only', routes: ['/documents', '/documents/:documentId'], permissions: ['documents.read'] },
  { id: 'signing', label: 'Signing', aiExposure: 'none', routes: ['/signing'], permissions: ['documents.signing.createSession'] },
  { id: 'audit-evidence', label: 'Audit & Evidence', aiExposure: 'none', routes: ['/evidence'], permissions: ['audit.read'] },
  { id: 'delivery', label: 'Boards & Delivery', aiExposure: 'none', routes: ['/boards', '/pipelines'], permissions: ['work.read'] },
  { id: 'ai-assist', label: 'AI Assist', aiExposure: 'read-only', routes: ['/ai'], permissions: ['ai.assist.read'] }
];

const aiPolicy: AiPolicySnapshot = {
  mode: 'advisory-only',
  allowedAssistiveActions: ['summarize_document', 'extract_metadata', 'suggest_signers', 'explain_workflow_state'],
  forbiddenActions: ['sign_document', 'approve_document', 'delete_document', 'change_signers_without_confirmation', 'legal_advice_final'],
  redactionNotice: 'Tenant ACL and document permissions must be applied before any AI retrieval or summary.'
};

export const portalSnapshot: PortalSnapshot = { tenant, modules, workItems, documents, evidenceEvents, pipelineRuns, aiPolicy };
