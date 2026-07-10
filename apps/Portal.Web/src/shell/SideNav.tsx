import { Button, mergeClasses, makeStyles } from '@fluentui/react-components';
import { ChevronLeft20Regular, ChevronRight20Regular } from '@fluentui/react-icons';
import { Text } from '@adaptivecash/shared-ui';
import { useUiStore } from '../store/uiStore';
import { navItems, type Hub } from './routes';

const useStyles = makeStyles({
  item: {
    borderLeft: '3px solid transparent'
  },
  itemActive: {
    background: 'var(--ac-surface)',
    borderLeftColor: 'var(--ac-primary)'
  }
});

// Icon-only below `lg` regardless of the manual toggle (there isn't room for
// labels on tablet/mobile); above `lg`, the manual `collapsed` toggle rules.
export function SideNav({ activeHub, navigate }: { activeHub: Hub; navigate: (path: string) => void }) {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const styles = useStyles();

  return (
    <aside
      aria-label="Portal sections"
      className={mergeClasses('flex flex-col border-r max-lg:w-[72px]', collapsed ? 'w-[72px]' : 'w-[220px]')}
      style={{ background: 'var(--ac-surface)', borderColor: 'var(--ac-line)' }}
    >
      <nav className="flex flex-col gap-0.5 py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={mergeClasses(
              styles.item,
              item.id === activeHub && styles.itemActive,
              'grid min-h-[46px] w-full items-center gap-2 bg-transparent px-3.5 py-1.5 text-left max-lg:grid-cols-[1fr] max-lg:justify-items-center',
              collapsed ? 'grid-cols-[1fr] justify-items-center' : 'grid-cols-[30px_1fr] justify-items-stretch'
            )}
          >
            <span className="text-lg" style={{ color: 'var(--ac-primary)' }}>
              {item.icon}
            </span>
            {!collapsed && (
              <span className="min-w-0 max-lg:hidden">
                <strong className="block text-sm">{item.label}</strong>
                <Text variant="caption" as="small" className="block truncate">
                  {item.description}
                </Text>
              </span>
            )}
          </button>
        ))}
      </nav>
      <Button
        appearance="transparent"
        icon={collapsed ? <ChevronRight20Regular /> : <ChevronLeft20Regular />}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="mx-3 mb-2.5 mt-auto justify-center max-lg:hidden"
        onClick={toggleSidebar}
      />
    </aside>
  );
}
