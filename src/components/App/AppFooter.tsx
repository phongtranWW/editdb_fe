import { Layout, Typography } from "antd";
const { Footer } = Layout;
const { Paragraph } = Typography;

export default function AppFooter() {
  return (
    <Footer className="text-center !bg-white border-t-4 border-orange-500 m-0 p-5 shadow-md">
      <Paragraph className="!m-0 !text-slate-700">
        EDITDB ©2025 Created with Ant Design
      </Paragraph>
    </Footer>
  );
}
