import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import "moment/locale/zh-cn";

console.log(moment().format("ll"));

import App from "@/pages/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
