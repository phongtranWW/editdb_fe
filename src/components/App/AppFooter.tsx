import { GithubFilled, LinkedinFilled } from "@ant-design/icons";
import { Card, Flex, Layout, Space, Typography } from "antd";
const { Footer } = Layout;
const { Paragraph, Text } = Typography;

export default function AppFooter() {
  return (
    <Footer className="!bg-gray-100">
      <Flex vertical align="center" justify="center" className="!w-full !py-8">
        <Text className="!text-xl !font-semibold !text-orange-400">
          Developed by
        </Text>
        <Text className="!text-4xl !font-bold !m-2">Trần Phong</Text>
        <Paragraph className="!text-xl">
          I love hearing from you. You can contact me at:
        </Paragraph>
        <Space>
          <Card size="small" className="w-[200px] text-center !bg-gray-900">
            <Space>
              <GithubFilled className="!text-xl !text-white" />
              <Text className="!text-xl !font-semibold !text-white">
                Github
              </Text>
            </Space>
          </Card>
          <Card size="small" className="w-[200px] text-center !bg-blue-900">
            <Space>
              <LinkedinFilled className="!text-xl !text-white" />
              <Text className="!text-xl !font-semibold !text-white">
                Linkedin
              </Text>
            </Space>
          </Card>
        </Space>
        <Text className="!text-sm !pt-3">
          © 2025 EDITDB. All rights reserved.
        </Text>
      </Flex>
    </Footer>
  );
}
