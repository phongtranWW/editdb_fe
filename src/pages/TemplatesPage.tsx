import { Flex, Typography } from "antd";
import { TemplatesContainer } from "../components/App/Templates/TemplatesContainer";

const { Paragraph, Title } = Typography;

export default function TemplatesPage() {
  return (
    <div className="min-h-full bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <Flex
          vertical
          align="center"
          justify="center"
          className="relative !p-8 !pt-16 !pb-12 !w-full"
        >
          <div className="text-center max-w-4xl">
            <Title
              level={1}
              className="!mb-6 !text-6xl !font-extrabold !leading-tight"
            >
              Use our{" "}
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                TEMPLATES
              </span>
            </Title>
            <div className="flex justify-center mb-6">
              <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"></div>
            </div>
            <Paragraph className="!text-xl !text-gray-600 !leading-relaxed !max-w-3xl !mx-auto">
              A compilation of database entity relationship diagrams to give you
              a quick start or inspire your application's architecture.
            </Paragraph>
          </div>
        </Flex>
      </div>

      {/* Templates Container Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
        <div className="relative">
          <TemplatesContainer />
        </div>
      </div>
    </div>
  );
}
