import { GithubFilled, LinkedinFilled } from "@ant-design/icons";
import { Card, Flex, Layout, List, Typography } from "antd";
import { useMemo } from "react";
const { Footer } = Layout;
const { Paragraph, Text } = Typography;

export default function AppFooter() {
  const contacts = useMemo(
    () => [
      {
        name: "Github",
        link: "https://github.com/phongtranWW",
        icon: <GithubFilled className="!text-white !text-xl" />,
        bgColor: "!bg-gray-900",
      },
      {
        name: "Linkedin",
        link: "https://www.linkedin.com/in/phong-tr%E1%BA%A7n-7a5534308/",
        icon: <LinkedinFilled className="!text-white !text-xl" />,
        bgColor: "!bg-blue-900",
      },
    ],
    []
  );

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
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={contacts}
          renderItem={(contact) => (
            <List.Item>
              <Card
                hoverable
                size="small"
                className={`xl:w-[200px] lg:w-[180px] md:w-[160px] w-[140px] text-center ${contact.bgColor}`}
                onClick={() => window.open(contact.link, "_blank")}
              >
                <Flex align="center" justify="center" gap={8}>
                  {contact.icon}
                  <Text className="!text-xl !font-semibold !text-white">
                    {contact.name}
                  </Text>
                </Flex>
              </Card>
            </List.Item>
          )}
        />
        <Text className="!text-sm !pt-3">
          © 2025 EDITDB. All rights reserved.
        </Text>
      </Flex>
    </Footer>
  );
}
