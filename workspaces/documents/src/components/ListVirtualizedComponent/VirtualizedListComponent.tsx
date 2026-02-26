import { useEffect, useRef, useState, type FC } from 'react';

export type VirtualizedListProps = {
  items: any[];
  rowHeight?: number;
  viewportHeight?: number;
  nodePadding?: number;
};

export const VirtualizedListComponent: FC<VirtualizedListProps> = ({
  items,
  rowHeight = 35,
  viewportHeight = 500,
  nodePadding = 3,
}) => {
  const viewport = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const itemCount = items.length;

  const containerHeight = itemCount * rowHeight;

  let startNode = Math.floor(scrollTop / rowHeight) - nodePadding;
  startNode = Math.max(0, startNode);

  const offsetY = startNode * rowHeight;

  let visibleNodeCount =
    Math.ceil(viewportHeight / rowHeight) + 2 * nodePadding;
  visibleNodeCount = Math.min(itemCount - startNode, visibleNodeCount);

  const listItems = items
    .slice(startNode, startNode + visibleNodeCount)
    .map((data) => {
      return (
        <li key={`${data}`} style={{ height: rowHeight }}>
          Virtual list item index - {data}
        </li>
      );
    });

  useEffect(() => {
    function onScrollViewport(evt: any) {
      setScrollTop(evt.target.scrollTop);
    }
    viewport.current?.addEventListener('scroll', onScrollViewport);
  }, []);

  return (
    <div
      /** viewport */
      ref={viewport}
      className="border-2 border-gray-400"
      style={{ height: viewportHeight, overflow: 'auto' }}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
    >
      <ul
        /** content */
        style={{
          height: containerHeight,
          overflow: 'hidden',
        }}
      >
        <div
          /** offset for visible nodes */
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {listItems}
        </div>
      </ul>
    </div>
  );
};
