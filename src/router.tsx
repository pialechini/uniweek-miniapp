import AuthGaurd from '@/components/AuthGaurd';
import { token } from '@/contexts/AuthContext';
import AssignPage from '@/pages/AssignPage';
import HomePage from '@/pages/HomePage';
import Layout from '@/pages/Layout';
import { fetchWeekSchedule } from '@/services/weekScheduleApi';
import { createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <AuthGaurd>
            <HomePage today={new Date()} />
          </AuthGaurd>
        ),
        loader: async () => {
          if (!token) {
            throw new Error('token not found');
          }

          return await fetchWeekSchedule(token);
        },
        // TODO
        errorElement: <div>TOKEN NOT FOUND</div>,
      },
      {
        path: 'assign/:token/',
        element: <AssignPage />,
      },
      {
        path: 'shared',
        element: <div>SHARED</div>,
        loader: async () => {
          return await new Promise((resolve) => {
            setTimeout(() => resolve({}), 2000);
          });
        },
      },
    ],
  },
]);

export default router;
