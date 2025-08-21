import { Button, Card, Flex, Image, Space, Typography } from "antd";
const { Paragraph, Text } = Typography;

export default function HomePage() {
  return (
    <Flex vertical align="center" justify="center">
      <Flex vertical align="center" justify="center" className="!p-8">
        <Text className="!font-bold !text-6xl !m-4">Welcome to EDITDB</Text>
        <Paragraph className="!text-2xl">
          Design, visualize and collaborate on entity relationship diagrams for
          your databases.
        </Paragraph>
        <Space className="m-4">
          <Button type="primary" size="large">
            Get Started
          </Button>
          <Button size="large">Learn More</Button>
        </Space>
        <Card className="w-full">
          <Image src="/home-page-diagram.webp" />
        </Card>
      </Flex>
    </Flex>
  );
}
