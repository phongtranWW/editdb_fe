import { Content } from "antd/es/layout/layout";
import AppHeader from "../Header";
import { Layout } from "antd";
import AppFooter from "../Footer";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <Layout className="h-screen flex flex-col">
      <AppHeader />
      <Content className="flex-1 overflow-auto">
        <Outlet />
      </Content>
      <AppFooter />
    </Layout>
  );
}
