import { useEffect, useState } from 'react';

export type Hub = 'overview' | 'boards' | 'documents' | 'signing' | 'evidence' | 'pipelines' | 'agents' | 'requests';

export interface RouteState {
  hub: Hub;
  path: string;
  documentId?: string;
  requestId?: string;
}

export interface NavItem {
  id: Hub;
  label: string;
  path: string;
  icon: string;
  description: string;
}

export const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', path: '/', icon: '⌂', description: 'Project dashboard' },
  { id: 'boards', label: 'Boards', path: '/boards', icon: '▦', description: 'Workflow board' },
  { id: 'requests', label: 'Requests', path: '/requests', icon: '≡', description: 'Requests and signing' },
  { id: 'documents', label: 'Documents', path: '/documents', icon: '▤', description: 'Inbox and review' },
  { id: 'signing', label: 'Signing', path: '/signing', icon: '✒', description: 'Signer queues' },
  { id: 'evidence', label: 'Evidence', path: '/evidence', icon: '◈', description: 'Audit trail' },
  { id: 'pipelines', label: 'Pipelines', path: '/pipelines', icon: '⚙', description: 'Build health' },
  { id: 'agents', label: 'AI Assist', path: '/ai', icon: '✧', description: 'Advisory tools' }
];

export function parseRoute(pathname: string): RouteState {
  const path = pathname.replace(/\/$/, '') || '/';
  
  const docMatch = path.match(/^\/documents\/([^/]+)$/);
  if (docMatch) return { hub: 'documents', path, documentId: decodeURIComponent(docMatch[1]) };

  const requestMatch = path.match(/^\/requests\/([^/]+)$/);
  if (requestMatch) return { hub: 'requests', path, requestId: decodeURIComponent(requestMatch[1]) };
  
  if (path === '/boards') return { hub: 'boards', path };
  if (path === '/documents') return { hub: 'documents', path };
  if (path === '/requests') return { hub: 'requests', path };
  if (path === '/signing') return { hub: 'signing', path };
  if (path === '/evidence') return { hub: 'evidence', path };
  if (path === '/pipelines') return { hub: 'pipelines', path };
  if (path === '/ai') return { hub: 'agents', path };
  return { hub: 'overview', path: '/' };
}

export function usePortalRoute() {
  const [route, setRoute] = useState<RouteState>(() => parseRoute(window.location.pathname));

  useEffect(() => {
    const onPop = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (path: string) => {
    const normalized = path === '' ? '/' : path;
    if (window.location.pathname !== normalized) window.history.pushState({}, '', normalized);
    setRoute(parseRoute(normalized));
  };

  return { route, navigate };
}
