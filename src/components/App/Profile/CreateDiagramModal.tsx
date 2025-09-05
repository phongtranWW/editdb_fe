import { useState } from "react";
import type { CreateDiagramDto } from "../../../api/diagrams/dtos/create-diagram-dto";
import { Database } from "../../../data/constants";
import { Flex, Input, Modal, Select, Space, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface CreateDiagramModalProps {
  loading: boolean;
  show: boolean;
  onClose: () => void;
  onOk: (dto: CreateDiagramDto) => void;
}

export default function CreateDiagramModal({
  loading,
  show,
  onClose,
  onOk,
}: CreateDiagramModalProps) {
  const [diagramDto, setDiagramDto] = useState<CreateDiagramDto>({
    name: "Schema",
    type: Database.MYSQL,
    tables: [],
    relationships: [],
  });

  return (
    <Modal
      title={
        <Space>
          <Text className="!font-semibold !text-lg">Create diagram </Text>
          {loading && <LoadingOutlined spin size={24} />}
        </Space>
      }
      open={show}
      onCancel={onClose}
      onOk={() => onOk(diagramDto)}
    >
      <Flex align="center" justify="space-between" gap={16}>
        <Input
          value={diagramDto.name}
          placeholder="Diagram name"
          onChange={(e) => {
            setDiagramDto({
              ...diagramDto,
              name: e.target.value,
            });
          }}
        />
        <Select
          value={diagramDto.type}
          options={[
            {
              value: Database.MYSQL,
              label: "MYSQL",
            },
            {
              value: Database.POSTGRESQL,
              label: "POSTGRESQL",
            },
          ]}
          onChange={(type) => {
            setDiagramDto({
              ...diagramDto,
              type,
            });
          }}
        />
      </Flex>
    </Modal>
  );
}
