import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import WeekSchedule from '@/pages/WeekSchedule.tsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "weekSchedule", element: <WeekSchedule /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
