import { Empty, Modal, Space, Typography, Button } from "antd";
import type { Diagram } from "../../../models/diagram";
import { PreviewDiagram } from "../../UI/PreviewDiagram";
import { DATABASE_INFO } from "../../../data/database-info";
import { PlayCircleOutlined, EyeOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

interface PreviewDiagramModalProps {
  show: boolean;
  diagram?: Diagram;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PreviewDiagramModal({
  show,
  diagram,
  onClose,
  onConfirm,
}: PreviewDiagramModalProps) {
  return (
    <Modal
      centered
      title={
        <div className="flex items-center justify-between w-full pr-8">
          <Space align="center" size="middle">
            <EyeOutlined className="text-blue-500 text-xl" />
            <div>
              <Title level={4} className="!mb-0 !text-gray-800">
                {diagram?.name || "No diagram selected"}
              </Title>
              {diagram?.type && (
                <div className="flex items-center gap-2 mt-1">
                  <img
                    src={DATABASE_INFO[diagram?.type].image}
                    width={20}
                    height={20}
                    alt={diagram?.type}
                    className="rounded-sm"
                  />
                  <Text className="!text-sm !text-gray-600 !capitalize">
                    {diagram?.type}
                  </Text>
                </div>
              )}
            </div>
          </Space>
        </div>
      }
      open={show}
      onCancel={onClose}
      width="85vw"
      styles={{
        body: {
          height: "65vh",
          padding: "0",
          borderRadius: "12px",
        },
        content: {
          borderRadius: "12px",
          overflow: "hidden",
        },
      }}
      footer={
        <Space>
          <Button
            size="large"
            onClick={onClose}
            className="!px-6 !border-gray-300 !text-gray-700 hover:!border-gray-400 hover:!text-gray-800 !transition-all !duration-200"
          >
            Close Preview
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<PlayCircleOutlined />}
            onClick={onConfirm}
            className="!px-6 !bg-gradient-to-r !from-blue-500 !to-blue-600 !border-none hover:!from-blue-600 hover:!to-blue-700 !shadow-md hover:!shadow-lg !transition-all !duration-200"
          >
            Use This Template
          </Button>
        </Space>
      }
      closable={false}
    >
      <div className="w-full h-full overflow-hidden rounded-2xl border border-gray-200">
        {diagram ? (
          <PreviewDiagram
            tables={diagram?.tables}
            relationships={diagram?.relationships}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="text-center">
                  <Text className="!text-gray-500 !text-lg">
                    No diagram selected
                  </Text>
                  <br />
                  <Text className="!text-gray-400 !text-sm">
                    Please select a template to preview
                  </Text>
                </div>
              }
            />
          </div>
        )}
      </div>
    </Modal>
  );
}
