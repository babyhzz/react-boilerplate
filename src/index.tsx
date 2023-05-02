import React from "react";
import ReactDOM from "react-dom";
import AntdConfigProvider from "./providers/AntdConfigProvider";
import ReactRouterProvider from "./providers/ReactRouterProvider";
import "./styles/global.less";

ReactDOM.render(
  <React.StrictMode>
    <AntdConfigProvider>
      <ReactRouterProvider />
    </AntdConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
