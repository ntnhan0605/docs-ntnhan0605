import type { TanStackDevtoolsReactInit } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

export const tanstackConfig: TanStackDevtoolsReactInit['config'] = {
  position: 'bottom-left',
}

export const tanstackPlugins: TanStackDevtoolsReactInit['plugins'] = [
  { name: 'TSK Router', render: <TanStackRouterDevtoolsPanel /> },
]
