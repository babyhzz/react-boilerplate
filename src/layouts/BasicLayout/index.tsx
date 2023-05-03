import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { Outlet, useLocation, useMatches } from "react-router-dom";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./index.less";
import { headerMenuItems, getSideMenuItems } from "./menu";

const { Header, Content, Sider } = Layout;

export type BasicLayoutProps = any;
const BasicLayout: React.FC<BasicLayoutProps> = () => {
  const matches = useMatches();

  const headerKey = matches.length > 1 ? matches[1].pathname : headerMenuItems[0].key;

  const sideMenuItems = getSideMenuItems(headerKey);
  const siderKey = matches.length > 2 ? matches[2].pathname : sideMenuItems[0].key;

  return (
    <Layout className={styles.page}>
      <Header className={styles.header}>
        <Menu mode="horizontal" theme="dark" items={headerMenuItems} selectedKeys={[headerKey]}></Menu>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu mode="inline" items={sideMenuItems} selectedKeys={[siderKey]} className={styles.sideMenu} />
        </Sider>
        <Layout>
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
