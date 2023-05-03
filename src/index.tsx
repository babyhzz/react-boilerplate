import React from "react";
import ReactDOM from "react-dom/client";
import AntdConfigProvider from "./providers/AntdConfigProvider";
import ReactRouterProvider from "./providers/ReactRouterProvider";
import "./styles/global.less";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AntdConfigProvider>
      <ReactRouterProvider />
    </AntdConfigProvider>
  </React.StrictMode>
);
