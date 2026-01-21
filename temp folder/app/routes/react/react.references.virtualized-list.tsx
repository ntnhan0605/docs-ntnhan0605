import type { MetaArgs } from 'react-router';
import { VirtualizedListPage } from '~/components-page/virtualizedList';

export function meta({}: MetaArgs) {
  return [{ title: 'Virtualized List' }, { name: 'description', content: '' }];
}

export default function ReactReferencesVirtualizedListRoute() {
  return <VirtualizedListPage />;
}
