import React, { useEffect } from "react";
import Dashboard from "@/pages/Dashboard";

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

  return <Dashboard />;
}

export default App;
