import React from "react";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

// 使用这种方式直接引用 props 中的定义
type MenuItem = Required<MenuProps>["items"][number];

type LayoutMenuItem = {
  label: string;
  path: string;
  children?: LayoutMenuItem[];
};

// TODO: 路由和菜单配置如何统一？
const menuItems: LayoutMenuItem[] = [
  {
    path: "/component",
    label: "组件",
    children: [
      {
        path: "/component/react-column-gallery",
        label: "列瀑布流",
      },
      {
        path: "/component/infinite-scroll-table",
        label: "无限滚动表格",
      },
    ],
  },
];

const headerMenuItems = menuItems.map((item) => ({
  key: item.path,
  label: item.label,
}));

function getSideMenuItems(path: string) {
  const menuItem = menuItems.find((item) => item.path === path);

  if (!menuItem || !menuItem.children) {
    return [];
  }

  return menuItem.children.map((item) => ({
    key: item.path,
    label: <Link to={item.path}>{item.label}</Link>,
  }));
}

export { headerMenuItems, getSideMenuItems };
