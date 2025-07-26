import { Button, Card, Col, Image, Space, Typography } from "antd";
const { Paragraph, Title } = Typography;

export default function HomePage() {
  return (
    <Col className="w-full flex flex-col justify-between items-center">
      <Col className="text-center p-[80px]">
        <Title level={1} className="!font-bold !text-6xl">
          Welcome to EDITDB
        </Title>
        <Paragraph className="!text-2xl">
          Design, visualize and collaborate on entity relationship diagrams for
          your databases.
        </Paragraph>
        <Space size="middle">
          <Button type="primary" size="large">
            Get Started
          </Button>
          <Button size="large">Learn More</Button>
        </Space>
      </Col>
      <Card className="w-[80%] my-auto">
        <Image src="/home-page-diagram.webp" />
      </Card>
    </Col>
  );
}
