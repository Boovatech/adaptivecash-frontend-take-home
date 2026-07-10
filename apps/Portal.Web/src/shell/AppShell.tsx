import { TabList, Tab } from '@fluentui/react-components';
import { CommandBar, HubHeader, Text } from '@adaptivecash/shared-ui';
import { portalSnapshot } from '../data/mockPortalData';
import { usePortalSnapshot } from '../api/usePortalSnapshot';
import { OverviewPage } from '../pages/OverviewPage';
import { BoardsPage } from '../pages/BoardsPage';
import { DocumentsPage } from '../pages/DocumentsPage';
import { DocumentDetailPage } from '../pages/DocumentDetailPage';
import { SigningPage } from '../pages/SigningPage';
import { EvidencePage } from '../pages/EvidencePage';
import { PipelinesPage } from '../pages/PipelinesPage';
import { AgentsPage } from '../pages/AgentsPage';
import { TopBar } from './TopBar';
import { SideNav } from './SideNav';
import { ContextRail } from './ContextRail';
import { navItems, usePortalRoute, type RouteState } from './routes';

function primaryLabelFor(route: RouteState) {
  if (route.hub === 'boards' || route.hub === 'documents') return 'New document';
  if (route.hub === 'signing') return 'Start session';
  return 'New item';
}

export function AppShell() {
  const { route, navigate } = usePortalRoute();
  const { data, isLoading } = usePortalSnapshot();
  const dataState = data ?? { snapshot: portalSnapshot, source: 'mock' as const };
  const snapshot = dataState.snapshot;
  const active = navItems.find((item) => item.id === route.hub) ?? navItems[0];

  let page: React.ReactNode;
  if (route.hub === 'documents' && route.documentId) {
    page = (
      <DocumentDetailPage
        document={snapshot.documents.find((doc) => doc.id === route.documentId)}
        events={snapshot.evidenceEvents}
        navigate={navigate}
      />
    );
  } else {
    switch (route.hub) {
      case 'boards':
        page = <BoardsPage documents={snapshot.documents} navigate={navigate} />;
        break;
      case 'documents':
        page = <DocumentsPage snapshot={snapshot} navigate={navigate} />;
        break;
      case 'signing':
        page = <SigningPage documents={snapshot.documents} navigate={navigate} />;
        break;
      case 'evidence':
        page = <EvidencePage snapshot={snapshot} />;
        break;
      case 'pipelines':
        page = <PipelinesPage pipelineRuns={snapshot.pipelineRuns} />;
        break;
      case 'agents':
        page = <AgentsPage snapshot={snapshot} />;
        break;
      default:
        page = <OverviewPage snapshot={snapshot} navigate={navigate} />;
    }
  }

  return (
    <main className="grid min-h-screen grid-rows-[48px_42px_1fr]" style={{ background: 'var(--ac-bg)', color: 'var(--ac-ink)' }}>
      <TopBar dataState={dataState} />
      <div className="flex min-w-0 items-center gap-2.5 border-b px-[18px]" style={{ borderColor: 'var(--ac-line)' }}>
        <span
          className="grid h-7 w-7 place-items-center rounded"
          style={{ background: 'var(--ac-secondary)', color: 'var(--ac-on-secondary)' }}
        >
          ▣
        </span>
        <div className="text-sm">
          <strong>{snapshot.tenant.name}</strong>
          <Text variant="muted" as="span">
            {' '}
            · {snapshot.tenant.id} · Workflow-first · Evidence-first · AI-assisted
          </Text>
        </div>
      </div>
      <div className="flex min-h-0">
        <SideNav activeHub={route.hub} navigate={navigate} />
        <div
          className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_316px] gap-[18px] p-[18px] max-lg:grid-cols-1 max-sm:p-3"
          aria-busy={isLoading}
        >
          <section className="min-w-0">
            <HubHeader
              breadcrumb={
                <>
                  <span>AdaptiveCash</span>
                  <span>/</span>
                  <span>{active.label}</span>
                  {route.documentId && (
                    <>
                      <span>/</span>
                      <span>{route.documentId}</span>
                    </>
                  )}
                </>
              }
              title={route.documentId ? 'Document detail' : active.label}
              description={route.documentId ? 'Version, signers, evidence and workflow facts.' : active.description}
              tabs={
                <TabList defaultSelectedValue="mine" size="small">
                  <Tab value="mine">Mine</Tab>
                  <Tab value="all">All</Tab>
                  <Tab value="analytics">Analytics</Tab>
                </TabList>
              }
            />
            <CommandBar primaryLabel={primaryLabelFor(route)} onPrimary={() => navigate('/documents')} />
            <div className="route-page" key={route.path}>
              {page}
            </div>
          </section>
          <ContextRail route={route} snapshot={snapshot} navigate={navigate} />
        </div>
      </div>
    </main>
  );
}
