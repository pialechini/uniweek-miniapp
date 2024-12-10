import AssignPage from '@/pages/AssignPage';
import HomePage from '@/pages/HomePage';
import LoadingPage from '@/pages/LoadingPage';
import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<LoadingPage />} />
      <Route path="/home" element={<HomePage today={new Date()} />} />
      <Route path="/assign/:token/" element={<AssignPage />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
