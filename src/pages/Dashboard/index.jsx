import React from "react";
import { Button } from "antd";
import styles from "./index.less";

console.log("styles", styles);

function Dashboard() {
  return (
    <div className={styles.page}>
      <Button type="primary">这是按钮</Button>
    </div>
  );
}

export default Dashboard;
