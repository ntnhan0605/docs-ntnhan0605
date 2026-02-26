import type { IMenuItem } from '@/types/menu'

export function formatRouteToMenuItem(
  route: IMenuItem,
  slug?: string,
): IMenuItem | null {
  if (!route.key) {
    return null
  }
  const rootSlug = slug ? `${slug}/` : '/'

  const path =
    rootSlug +
    route.key
      .split('/')
      .filter((p) => p !== '*')
      .join('/')

  const menuItem: IMenuItem = {
    key: path,
    label: route.key,
  }

  if (route?.children) {
    menuItem.children = route.children
      .map((itemRoute: any) => formatRouteToMenuItem(itemRoute, path))
      .filter(Boolean) as IMenuItem[]
  }
  return menuItem
}
