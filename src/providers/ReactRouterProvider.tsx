import React from "react";
import BasicLayout from "@/layouts/BasicLayout";
import Dashboard from "@/pages/Dashboard";
import Test from "@/pages/Test";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: BasicLayout,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "test",
        Component: Test,
      },
    ],
  },
]);

const ReactRouterProvider: React.FC = () => <RouterProvider router={router} />;

export default ReactRouterProvider;
