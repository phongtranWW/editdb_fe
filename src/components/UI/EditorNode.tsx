import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { KeyOutlined } from "@ant-design/icons";
import clsx from "clsx";
import type { DiagramTable } from "../../models/diagram-table";

type TableNode = Node<
  {
    table: DiagramTable;
  },
  "table"
>;

export default function EditorNode({ data, selected }: NodeProps<TableNode>) {
  const { table } = data;

  return (
    <div
      className={clsx(
        "w-60 flex flex-col rounded-lg shadow-lg overflow-hidden",
        selected && "border-dashed border-3 border-blue-500"
      )}
    >
      {/* Table Header */}
      <div className="flex items-center justify-center py-3 px-4 bg-blue-500">
        <p className="w-2/3 text-sm text-center font-bold text-white truncate">
          {table.name}
        </p>
      </div>

      {/* Table Body */}
      <div className="w-full flex flex-col">
        {table.columns.length > 0 ? (
          table.columns.map((column, index) => (
            <div
              key={column.id}
              className={`
              w-full relative flex items-center px-3 py-2
              ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              `}
            >
              <Handle
                position={Position.Right}
                type="source"
                id={column.id}
                className="!absolute !w-full !h-full !top-0 !left-0 !rounded-none !transform-none !bg-transparent !border-none"
              />
              <div className="w-full flex items-center justify-between">
                <p className="w-1/2 text-sm font-medium text-gray-800 truncate">
                  {column.isPrimary && (
                    <KeyOutlined className="mr-1 !text-yellow-400" />
                  )}
                  {column.name}
                </p>
                <p className="text-xs font-semibold">{column.type}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="relative flex items-center px-4 py-3 border-b border-gray-100">
            <p className="!text-sm !text-gray-500 italic">No columns defined</p>
          </div>
        )}
      </div>
      <div className="px-3 py-2 bg-gray-200">
        <p className="text-xs">{table.columns.length} column(s)</p>
      </div>
    </div>
  );
}
