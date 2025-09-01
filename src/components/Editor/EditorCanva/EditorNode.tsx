import { Tag, Typography } from "antd";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { DiagramColumn } from "../../../models/diagram-column";
import { KeyOutlined } from "@ant-design/icons";

const { Text } = Typography;

type TableNode = Node<
  {
    name: string;
    columns: DiagramColumn[];
  },
  "table"
>;

export default function EditorNode({ data }: NodeProps<TableNode>) {
  const { name, columns } = data;

  return (
    <div className="w-80 flex flex-col rounded-lg overflow-hidden bg-white shadow-lg border border-gray-200">
      {/* Table Header */}
      <div className="py-3 px-4 text-center bg-orange-500">
        <Text className="!text-sm !font-bold !text-white">{name}</Text>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {columns.length > 0 ? (
          columns.map((column, index) => (
            <div
              key={column.id}
              className={`
              relative flex items-center px-4 py-3
              ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              `}
            >
              <Handle
                isConnectable={false}
                position={Position.Right}
                type="source"
                id={column.id}
                className="!absolute !w-full !h-full !top-0 !left-0 !rounded-none !transform-none !bg-transparent !border-none"
              />
              <div className="flex-1 flex items-center justify-between min-w-0 mx-2">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Text className="!text-sm !font-medium !text-gray-800 truncate flex-1">
                    {column.isPrimary && <KeyOutlined className="mr-1" />}
                    {column.name}
                  </Text>
                </div>
                <div className="flex-shrink-0 ml-3">
                  <Tag color="cyan" className="!text-xs">
                    {column.type}
                  </Tag>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="relative flex items-center px-4 py-3 border-b border-gray-100">
            <Text className="!text-sm !text-gray-500 italic">
              No columns defined
            </Text>
          </div>
        )}
      </div>
      <div className="px-4 py-2 bg-gray-200 border-t border-gray-200">
        <Text className="!text-xs text-center">
          {columns.length} column{columns.length !== 1 ? "s" : ""}
        </Text>
      </div>
    </div>
  );
}
