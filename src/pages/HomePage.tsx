import {
  GithubOutlined,
  DatabaseOutlined,
  AntDesignOutlined as DesignOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Card, Image, Space, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router";

const { Paragraph, Title } = Typography;

export default function HomePage() {
  const navigator = useNavigate();

  const features = [
    {
      icon: <DatabaseOutlined className="text-2xl text-blue-500" />,
      title: "Database Design",
      description: "Create professional entity relationship diagrams with ease",
    },
    {
      icon: <DesignOutlined className="text-2xl text-green-500" />,
      title: "Visual Editor",
      description: "Intuitive drag-and-drop interface for seamless design",
    },
    {
      icon: <SaveOutlined className="text-2xl text-purple-500" />,
      title: "Save and Share",
      description: "Save and share your diagrams for next edits",
    },
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="px-8 py-16 max-w-7xl mx-auto">
        <Row gutter={[48, 32]} align="middle" className="min-h-[70vh]">
          <Col xs={24} lg={12}>
            <div className="space-y-6">
              <div>
                <Title
                  level={1}
                  className="!mb-4 !text-6xl !font-extrabold !leading-tight"
                >
                  Welcome to{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    EDITDB
                  </span>
                </Title>
                <div className="h-1 w-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
              </div>

              <Paragraph className="!text-xl !text-gray-600 !leading-relaxed">
                Design, visualize and collaborate on entity relationship
                diagrams for your databases with our powerful and intuitive
                platform.
              </Paragraph>

              <Space size="large" className="!mt-8">
                <Button
                  type="primary"
                  size="large"
                  className="!h-12 !px-8 !text-lg !font-semibold !bg-gradient-to-r !from-blue-500 !to-blue-600 !border-none hover:!from-blue-600 hover:!to-blue-700 !shadow-lg hover:!shadow-xl !transition-all !duration-300"
                  onClick={() => navigator("/profile")}
                >
                  Get Started Free
                </Button>
                <Button
                  size="large"
                  icon={<GithubOutlined />}
                  className="!h-12 !px-8 !text-lg !font-semibold !border-2 !border-gray-300 hover:!border-gray-400 !transition-all !duration-300"
                  onClick={() =>
                    window.open(
                      "https://github.com/phongtranWW/editdb_fe",
                      "_blank"
                    )
                  }
                >
                  Source Code
                </Button>
              </Space>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              className="!border-none !shadow-2xl !bg-white/80 !backdrop-blur-sm hover:!shadow-3xl !transition-all !duration-500 !transform hover:!scale-105"
              styles={{ body: { padding: "24px" } }}
            >
              <Image
                src="/home-page-diagram.png"
                preview={false}
                className="!rounded-lg !border !border-gray-200"
                fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%23999' font-size='16'%3EDatabase Diagram%3C/text%3E%3C/svg%3E"
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Features Section */}
      <div className="bg-orange-400 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <Title level={2} className="!mb-4 !text-4xl !font-bold !text-white">
              Why Choose EDITDB?
            </Title>
            <Paragraph className="!text-lg !text-white !max-w-2xl !mx-auto">
              Powerful features designed to make database design simple
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  className="!h-full !border-none !shadow-lg hover:!shadow-xl !transition-all !duration-300 !transform hover:!translate-y-[-4px] !bg-white/80 !backdrop-blur-sm cursor-pointer"
                  styles={{ body: { padding: "32px", textAlign: "center" } }}
                >
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <Title level={4} className="!mb-3 !text-gray-800">
                      {feature.title}
                    </Title>
                    <Paragraph className="!text-gray-600 !mb-0">
                      {feature.description}
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
