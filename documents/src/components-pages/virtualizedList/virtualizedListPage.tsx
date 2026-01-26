import { HeadingComponent } from '@/components/HeadingComponent'
import { VirtualizedListComponent } from '@/components/ListVirtualizedComponent'

const LIST_ITEM_LENGTH = 1000
export function VirtualizedListPage() {
  const listItems = Array.from({ length: LIST_ITEM_LENGTH }).map(
    (_, index) => index + 1,
  )
  return (
    <>
      <HeadingComponent className="text-center">
        Virtualized List
      </HeadingComponent>
      {/* <NonVirtualizedList items={listItems} /> */}
      <VirtualizedListComponent items={listItems} />
    </>
  )
}
