import React, { Suspense } from "react";
import { Button } from "antd";
import styles from "./index.less";

const Test = React.lazy(() => import('../Test'));

function Dashboard() {
  return (
    <div className={styles.page}>
      <Button type="primary">这是按钮</Button>

      <Suspense fallback={<div>Loading...</div>}>
        <Test />
      </Suspense>
      
    </div>
  );
}

export default Dashboard;
