import React from "react";
import { Outlet, Link } from "react-router-dom";

export type BasicLayoutProps = any;

const BasicLayout: React.FC<BasicLayoutProps> = () => (
  <div>
    <div>
      <Link to="/dashboard">dashboard</Link>
    </div>
    <Outlet />
  </div>
);

export default BasicLayout;
