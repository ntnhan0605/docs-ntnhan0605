import type { MetaArgs } from 'react-router';

export function meta({}: MetaArgs) {
  return [{ title: 'useState' }, { name: 'description', content: '' }];
}
export default function ReactUseStateRoute() {
  return <>this page for use state</>;
}
