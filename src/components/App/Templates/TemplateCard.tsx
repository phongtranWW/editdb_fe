import { Button, Card, Flex, Image, Typography } from "antd";
import type { SummaryDiagram } from "../../../models/summary-diagram";
import { CopyOutlined } from "@ant-design/icons";
const { Text, Paragraph } = Typography;

interface TemplateCardProps {
  diagram: SummaryDiagram;
}

export default function TemplateCard({ diagram }: TemplateCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <Card
      hoverable
      actions={[
        <Button color="primary" variant="text" icon={<CopyOutlined />}>
          Detail
        </Button>,
      ]}
      className=" !border-orange-500"
    >
      <Card.Meta
        avatar={
          <Image
            src={diagram.author?.avatar}
            width={32}
            height={32}
            referrerPolicy="no-referrer"
            className="rounded-full border-2 border-gray-200"
            preview={false}
            fallback="/default-avatar.png"
          />
        }
        title={
          <span className="text-gray-800 font-semibold text-lg">
            {diagram.name}
          </span>
        }
        description={
          <div className="w-full space-y-2 flex-1 flex flex-col">
            <Paragraph ellipsis={{ rows: 2 }} className="min-h-[3.0em]">
              {diagram.description || "No description"}
            </Paragraph>
            <div className="mt-auto space-y-2">
              <div className="flex items-center gap-2">
                <Text type="secondary" className="text-xs font-medium">
                  Author:
                </Text>
                <Text className="text-gray-700 font-medium">
                  {diagram.author?.name || "Unknown"}
                </Text>
              </div>
              <Flex justify="space-between" align="center" className="w-full">
                <Text type="secondary" className="text-xs text-gray-500">
                  Cre: {formatDate(diagram.createdAt)}
                </Text>
                <Text type="secondary" className="text-xs text-gray-500">
                  Upd: {formatDate(diagram.updatedAt)}
                </Text>
              </Flex>
            </div>
          </div>
        }
      />
    </Card>
  );
}
