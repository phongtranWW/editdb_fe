import { Empty, Modal, Space, Typography } from "antd";
import type { Diagram } from "../../../models/diagram";
import { PreviewDiagram } from "../../UI/PreviewDiagram";
import { DATABASE } from "../../../data/database";
import { LoadingOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface PreviewDiagramModalProps {
  loading: boolean;
  show: boolean;
  diagram?: Diagram;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PreviewDiagramModal({
  loading,
  show,
  diagram,
  onClose,
  onConfirm,
}: PreviewDiagramModalProps) {
  return (
    <Modal
      title={
        <Space>
          <Text className="!font-semibold !text-lg">
            {diagram?.name || "No diagram selected"}
          </Text>
          {diagram?.type && (
            <img src={DATABASE[diagram?.type].image} width={24} />
          )}
          {loading && <LoadingOutlined spin className="!text-[24px]" />}
        </Space>
      }
      open={show}
      onCancel={onClose}
      onOk={onConfirm}
      width="80vw"
      styles={{ body: { height: "65vh" } }}
    >
      <div className="w-full h-full border-1 border-gray-300">
        {diagram ? (
          <PreviewDiagram
            tables={diagram?.tables}
            relationships={diagram?.relationships}
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </Modal>
  );
}
