import { Content } from "antd/es/layout/layout";
import AppHeader from "./AppHeader";
import { Layout } from "antd";
import { Outlet } from "react-router";
import AppFooter from "./AppFooter";

export default function AppLayout() {
  return (
    <Layout className="!min-h-screen flex flex-col">
      <AppHeader />
      <Content className="flex-1">
        <Outlet />
      </Content>
      <AppFooter />
    </Layout>
  );
}
