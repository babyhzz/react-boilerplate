import React, { useEffect } from "react";
import styles from "./index.less";

function Test() {
  function a() {}

  useEffect(() => {
    a();
  }, []);

  return <div className={styles.page}>这是TEST</div>;
}

export default Test;
