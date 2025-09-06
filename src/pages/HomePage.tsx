import { GithubOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Image, Space, Typography } from "antd";
import { useNavigate } from "react-router";
const { Paragraph, Text } = Typography;

export default function HomePage() {
  const navigator = useNavigate();

  return (
    <Flex vertical align="center" justify="center" className="!p-8">
      <Text className="!font-bold !text-6xl !m-4">
        Welcome to{" "}
        <Text className="!text-orange-400 !font-bold !text-6xl">EDITDB</Text>
      </Text>
      <Paragraph className="!text-2xl">
        Design, visualize and collaborate on entity relationship diagrams for
        your databases.
      </Paragraph>
      <Space className="m-4">
        <Button
          type="primary"
          size="large"
          onClick={() => navigator("/profile")}
        >
          Get Started
        </Button>
        <Button
          size="large"
          icon={<GithubOutlined />}
          onClick={() =>
            window.open("https://github.com/phongtranWW/editdb_fe", "_blank")
          }
        >
          Source Code
        </Button>
      </Space>
      <Card className="w-full">
        <Image src="/home-page-diagram.webp" />
      </Card>
    </Flex>
  );
}
