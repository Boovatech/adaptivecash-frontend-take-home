export interface WorkItem {
  id: number;
  title: string;
  type: 'Epic' | 'Feature' | 'User Story' | 'Task' | 'Bug';
  state: 'New' | 'Active' | 'Review' | 'Done';
  assignee: string;
  area: string;
  tags: string[];
}

export interface DocumentRow {
  id: string;
  title: string;
  counterparty: string;
  workflow: string;
  state: 'Draft' | 'In review' | 'Sent for signing' | 'Partially signed' | 'Verified' | 'Archived';
  due: string;
  owner: string;
  signers: string;
  risk: 'Low' | 'Medium' | 'High';
  documentType: string;
  versionHash: string;
  summary: string;
  nextAction: string;
}

export interface EvidenceEvent {
  time: string;
  action: string;
  actor: string;
  detail: string;
  tone: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray';
  documentId?: string;
}

export interface PipelineRun {
  name: string;
  stage: string;
  result: 'Succeeded' | 'Running' | 'Waiting' | 'Failed';
  duration: string;
  commit: string;
}

export interface TenantInfo {
  id: string;
  name: string;
  isolationMode: string;
  schemaName: string;
}

export interface PortalModuleStatus {
  id: string;
  label: string;
  aiExposure: string;
  routes: string[];
  permissions: string[];
}

export interface AiPolicySnapshot {
  mode: string;
  allowedAssistiveActions: string[];
  forbiddenActions: string[];
  redactionNotice: string;
}

export interface PortalSnapshot {
  tenant: TenantInfo;
  modules: PortalModuleStatus[];
  workItems: WorkItem[];
  documents: DocumentRow[];
  evidenceEvents: EvidenceEvent[];
  pipelineRuns: PipelineRun[];
  aiPolicy: AiPolicySnapshot;
}
