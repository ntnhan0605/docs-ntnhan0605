import type { RouteConfigEntry } from '@react-router/dev/routes';
import type { IMenuItem } from '~/types/menu';

export function formatRouteToMenuItem(
  route: RouteConfigEntry,
  slug?: string
): IMenuItem | null {
  if (!route.path) {
    return null;
  }
  const rootSlug = slug ? `${slug}/` : '/';

  const path =
    rootSlug +
    route.path
      .split('/')
      .filter((p) => p !== '*')
      .join('/');

  const menuItem: IMenuItem = {
    id: path,
    href: path,
    itemId: path,
    label: route.path,
  };

  if (route?.children) {
    menuItem.children = route.children
      .map((itemRoute) => formatRouteToMenuItem(itemRoute, path))
      .filter(Boolean) as IMenuItem[];
  }
  return menuItem;
}
