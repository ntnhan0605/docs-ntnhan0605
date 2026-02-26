import { HeadingComponent } from '@/components/HeadingComponent'
import { VirtualizedListComponent } from '@/components/ListVirtualizedComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/react/demo/virtualized_list')({
  component: RouteComponent,
})

function RouteComponent() {
  const listItems = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)

  return (
    <>
      <HeadingComponent />
      {/* <NonVirtualizedList items={listItems} /> */}
      <VirtualizedListComponent items={listItems} />
    </>
  )
}
