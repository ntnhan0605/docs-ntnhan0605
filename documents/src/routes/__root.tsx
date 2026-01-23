import { RootContextProvider } from '@/contexts/rootContext'
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <RootContextProvider>
      <HeadContent />
      <Outlet />
    </RootContextProvider>
  ),
})
