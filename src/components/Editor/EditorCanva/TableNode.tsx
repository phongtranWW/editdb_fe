import { Card, List, Typography, Flex, Tag } from "antd";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { Column } from "../../../models/column";

const { Text } = Typography;

type TableNode = Node<
  {
    name: string;
    columns: Column[];
  },
  "table"
>;

export default function EditorNode({ data }: NodeProps<TableNode>) {
  const { name, columns } = data;

  return (
    <Card
      size="small"
      className="w-70 shadow-lg"
      styles={{
        header: {
          backgroundColor: "#ff6b35",
          color: "white",
          fontWeight: "bold",
          padding: "10px 16px",
          textAlign: "center",
        },
      }}
      title={name}
    >
      <List
        size="small"
        dataSource={columns}
        renderItem={(column) => (
          <List.Item className="relative hover:bg-[#fff1e8] px-2 py-1 rounded-md transition-all duration-200">
            {/* Handle trái */}
            <Handle
              type="target"
              position={Position.Left}
              id={`target-${column.id}`}
              className="invisible"
            />

            <Flex justify="space-between" align="center" className="w-full">
              <Text strong className="text-sm text-gray-800">
                {column.name}
              </Text>
              <Tag color="blue">{column.type}</Tag>
            </Flex>

            {/* Handle phải */}
            <Handle
              type="source"
              position={Position.Right}
              id={`source-${column.id}`}
              className="invisible"
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
