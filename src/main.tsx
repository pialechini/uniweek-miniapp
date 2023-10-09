import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import WeekSchedule from "@/pages/WeekSchedulePage";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./fonts.css";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "week-schedule", element: <WeekSchedule /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
