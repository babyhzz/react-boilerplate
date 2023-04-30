import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider, App } from "antd";
import dayjs from "dayjs";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";
import "./styles/global.less";

import Root from "@/pages/Root";

dayjs.locale("zh-cn");

ReactDOM.render(
  <React.StrictMode>
    {/* antd全局配置 */}
    <ConfigProvider locale={zhCN}>
      {/* and 包裹组件 */}
      <App>
        <Root />
      </App>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
