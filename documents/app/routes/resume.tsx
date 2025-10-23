import { ResumePage } from '~/components-page/resume';
import type { Route } from './+types/resume';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Nguyen Thien Nhan - Resume - Front-End Engineer' },
    {
      name: 'description',
      content:
        'Hello there! If you are here, that I can tell you will be a wonderful in my friend list.',
    },
  ];
}

export default function ResumeRoute() {
  return <ResumePage />;
}
