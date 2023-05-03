import React from "react";
import BasicLayout from "@/layouts/BasicLayout";
import Test from "@/pages/Test";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactColumnGallery from "@/pages/Component/ReactColumnGallery";
import InfiniteScrollTable from "@/pages/Component/InfiniteScrollTable";

// TODO 这个和菜单定义重叠
const router = createBrowserRouter([
  {
    path: "/",
    Component: BasicLayout,
    children: [
      {
        path: "component",
        children: [
          {
            path: "react-column-gallery",
            Component: ReactColumnGallery,
          },
          {
            path: "infinite-scroll-table",
            Component: InfiniteScrollTable,
          },
        ],
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
