import { LayoutMainComponent } from '@/components/LayoutMainComponent'
import { AppContextProvider } from '@/utils/contexts/appContext'
import { RootContextProvider } from '@/utils/contexts/rootContext'
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
