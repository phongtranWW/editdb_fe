import { Flex, Typography } from "antd";
import { TemplatesContainer } from "../components/App/Templates/TemplatesContainer";
const { Paragraph, Text } = Typography;

export default function TemplatesPage() {
  return (
    <Flex vertical align="center" justify="center" className="!p-8 !w-full">
      <Text className="!font-bold !text-6xl !m-4">
        Use our{" "}
        <Text className="!text-orange-400 !font-bold !text-6xl">TEMPLATES</Text>
      </Text>
      <Paragraph className="!text-2xl">
        A compilation of database entity relationship diagrams to give you a
        quick start or inspire your application's architecture.
      </Paragraph>
      <TemplatesContainer />
    </Flex>
  );
}
