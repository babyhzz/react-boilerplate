import React from "react";
import { ConfigProvider } from "antd";
import Dashboard from "@/pages/Dashboard";
import zhCN from "antd/lib/locale/zh_CN";
import "@/styles/global.less";

/**
 * ConfigProvider: 设置antd的全局熟悉
 */
function App() {
  const a = 1;
  return (
    <ConfigProvider locale={zhCN}>
      <Dashboard />
    </ConfigProvider>
  );
}

export default App;
