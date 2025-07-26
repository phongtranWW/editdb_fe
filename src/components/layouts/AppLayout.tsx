import { Content } from "antd/es/layout/layout";
import AppHeader from "../Header";
import { ConfigProvider, Layout } from "antd";
import AppFooter from "../Footer";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff6b35", // Màu cam chủ đạo
          colorPrimaryHover: "#ff8c5a", // Màu cam khi hover
          colorPrimaryActive: "#e55a2b", // Màu cam khi active
          colorBgContainer: "#fffaf7", // Background container màu kem nhẹ
          colorBgLayout: "#fff5f0", // Background layout màu kem cam nhạt
          colorText: "#2c3e50", // Text màu xám đậm
          colorTextSecondary: "#5d6d7e", // Text phụ màu xám vừa
          colorBorder: "#ffd4c4", // Border màu cam nhạt
        },
        components: {
          Layout: {
            headerBg: "#2c3e50", // Header màu xám đậm
            footerBg: "#34495e", // Footer màu xám đậm hơn header một chút
            bodyBg: "#fffaf7", // Body background màu kem
          },
          Menu: {
            darkItemBg: "#2c3e50",
            darkItemSelectedBg: "#ff6b35",
            darkItemHoverBg: "#ff8c5a",
          },
          Card: {
            colorBgContainer: "#ffffff",
            colorBorder: "#ffd4c4",
          },
        },
      }}
    >
      <Layout className="min-h-screen">
        <AppHeader />
        <Content>
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
    </ConfigProvider>
  );
}
