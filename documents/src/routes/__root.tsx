import { RootContextProvider } from '@/contexts/rootContext'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <RootContextProvider>
      <Outlet />
    </RootContextProvider>
  ),
})
