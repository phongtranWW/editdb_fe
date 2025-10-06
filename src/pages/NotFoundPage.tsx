import { Result, Button, Typography } from "antd";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Title, Paragraph } = Typography;

export default function NotFoundPage() {
  const navigator = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-2xl w-full px-4">
        <Result
          status="404"
          title={
            <Title level={1} className="!mb-0">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                404
              </span>
            </Title>
          }
          subTitle={
            <div className="space-y-4">
              <Title level={3} className="!mb-2 !text-gray-700">
                Oops! Your page not found
              </Title>
              <Paragraph className="text-base text-gray-500">
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </Paragraph>
            </div>
          }
          extra={
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
              <Button
                type="primary"
                size="large"
                icon={<HomeOutlined />}
                onClick={() => navigator("/")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Home
              </Button>
              <Button
                size="large"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigator(-1)}
                className="hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
              >
                Back
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
}
