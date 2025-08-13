import { Card, List, Typography, Flex } from "antd";
import type { ColumnDto } from "../../models/dtos/column-dto";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import DataTypeTag from "./DataTypeTag";

const { Text } = Typography;

export type TableNodeProps = Node<{
  name: string;
  columns: ColumnDto[];
}>;

export default function TableNode(props: NodeProps<TableNodeProps>) {
  const { name, columns } = props.data;

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
            <Handle
              type="target"
              position={Position.Left}
              className="invisible"
              id={`target-${column.name}`}
            />
            <Flex justify="space-between" align="center" className="w-full">
              <Text strong className="text-sm text-gray-800">
                {column.name}
              </Text>
              <DataTypeTag type={column.type} />
            </Flex>
            <Handle
              type="source"
              position={Position.Right}
              className="invisible"
              id={`source-${column.name}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
