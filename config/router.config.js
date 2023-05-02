const path = require("path");
const { createBrowserRouter } = require("react-router-dom");

const config = [
  {
    path: "/",
    component: "../layouts/BasicLayout",
    children: [
      {
        path: "dashboard",
        component: "Dashboard",
      },
      {
        path: "test",
        component: "Test",
      },
    ],
  },
];

function convertToRoutes(config) {
  if (!config || config.length == 0) {
    return [];
  }

  const routes = [];
  config.forEach((item) => {
    const { component, children, ...rest } = item;
    const childRoutes = convertToRoutes(children);
    routes.push({
      ...rest,
      element: path.resolve(__dirname, "../src/pages/", component),
      children: childRoutes,
    });
  });

  return routes;
}

const router = convertToRoutes(config);

console.log("router:", router);

export default createBrowserRouter(router);
