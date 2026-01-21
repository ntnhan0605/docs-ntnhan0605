import { Outlet } from 'react-router';
import { LayoutSidebarComponent } from '~/components/LayoutComponent';
import type { IMenuItem } from '~/types/menu';

const REACT_ROUTES: IMenuItem[] = [
  {
    id: '/react/hooks',
    itemId: '/react/hooks',
    href: '/react/hooks',
    label: 'Hooks',
    children: [
      {
        id: '/react/hooks/use-state',
        itemId: '/react/hooks/use-state',
        href: '/react/hooks/use-state',
        label: 'useState',
      },
    ],
  },
  {
    id: '/react/references',
    itemId: '/react/references',
    href: '/react/references',
    label: 'References',
    children: [
      {
        id: '/react/references/virtualized-list',
        itemId: '/react/references/virtualized-list',
        href: '/react/references/virtualized-list',
        label: 'Virtualized list',
      },
    ],
  },
];

export default function JsAdvRoute() {
  return (
    <LayoutSidebarComponent
      title="Javascript Advanced"
      logo={() => <img src="/icons/react/logo_dark.svg" className="w-8 h-8" />}
      items={REACT_ROUTES}
    >
      <Outlet />
    </LayoutSidebarComponent>
  );
}
