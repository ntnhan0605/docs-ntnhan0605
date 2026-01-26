import { LayoutMainComponent } from '@/components/LayoutMainComponent'
import { AppContextProvider } from '@/contexts/appContext'
import { RootContextProvider } from '@/contexts/rootContext'
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <RootContextProvider>
      <HeadContent />
      <AppContextProvider>
        <LayoutMainComponent>
          <Outlet />
        </LayoutMainComponent>
      </AppContextProvider>
    </RootContextProvider>
  ),
})
