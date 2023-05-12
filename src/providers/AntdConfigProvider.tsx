import React, { PropsWithChildren } from "react";
import { ConfigProvider, App } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";

dayjs.locale("zh-cn");

type AntdConfigProviderProps = PropsWithChildren;

const AntdConfigProvider: React.FC<AntdConfigProviderProps> = ({ children }) => (
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {},
    }}
  >
    <App>{children}</App>
  </ConfigProvider>
);

export default AntdConfigProvider;
