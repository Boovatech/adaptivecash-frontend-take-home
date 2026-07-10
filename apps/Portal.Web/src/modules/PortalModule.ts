export type AiExposure = 'none' | 'read-only' | 'suggest-with-confirmation' | 'write-with-explicit-human-confirmation';

export interface PortalFrontendModule {
  id: string;
  label: string;
  routes: ReadonlyArray<{ path: string; title: string; requiredPermissions: string[] }>;
  navItems: ReadonlyArray<{ label: string; to: string; requiredPermissions: string[] }>;
  requiredPermissions: string[];
  featureFlags?: string[];
  aiExposure: AiExposure;
}

export const modules: PortalFrontendModule[] = [
  {
    id: 'documents',
    label: 'Documents & Review',
    requiredPermissions: ['documents.read'],
    routes: [
      { path: '/documents', title: 'Document inbox', requiredPermissions: ['documents.read'] },
      { path: '/documents/:documentId', title: 'Document detail', requiredPermissions: ['documents.read'] }
    ],
    navItems: [
      { label: 'Documents', to: '/documents', requiredPermissions: ['documents.read'] }
    ],
    aiExposure: 'read-only'
  },
  {
    id: 'signing',
    label: 'Signing',
    requiredPermissions: ['documents.signing.createSession'],
    routes: [
      { path: '/signing', title: 'Signing queue', requiredPermissions: ['documents.signing.createSession'] }
    ],
    navItems: [
      { label: 'Signing', to: '/signing', requiredPermissions: ['documents.signing.createSession'] }
    ],
    aiExposure: 'none'
  },
  {
    id: 'audit-evidence',
    label: 'Audit & Evidence',
    requiredPermissions: ['audit.read'],
    routes: [
      { path: '/evidence', title: 'Evidence archive', requiredPermissions: ['audit.read'] }
    ],
    navItems: [
      { label: 'Evidence', to: '/evidence', requiredPermissions: ['audit.read'] }
    ],
    aiExposure: 'none'
  }
];
