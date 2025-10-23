import { index, route, type RouteConfig } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

const routes: RouteConfig = [
  index('./routes/index.tsx'),
  route('resume', './routes/resume.tsx'),
  /** React Routes */
  ...(await flatRoutes({ rootDirectory: './routes/react' })),
];

export default routes;
