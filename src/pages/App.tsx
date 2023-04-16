import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import Dashboard from "@/pages/Dashboard";
import "@/styles/global.less";

/**
 * ConfigProvider: 设置antd的全局熟悉
 */
function App() {
  let b = 1;
  console.log(b);

  function a() {
    console.log(111);
  }

  useEffect(() => {
    a();
    console.log(b);
    b += 1;
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <Dashboard />
    </ConfigProvider>
  );
}

export default App;
