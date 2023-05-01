import React, { Suspense } from "react";
import { Button, Modal } from "antd";
import styles from "./index.less";

const Test = React.lazy(() => import("../Test"));

function Dashboard() {
  return (
    <div className={styles.page}>
      <Button
        type="primary"
        onClick={() => {
          Modal.info({
            title: "This is a notification message",
            content: (
              <div>
                <p className="test">some messages...some messages...</p>
                <p>some messages...some messages...</p>
              </div>
            ),
          });
        }}
      >
        这是按钮
      </Button>

      <Suspense fallback={<div>Loading...</div>}>
        <Test />
      </Suspense>
    </div>
  );
}

export default Dashboard;
