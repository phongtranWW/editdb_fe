import { Button, Input, Popover, Select, Space, Typography } from "antd";
import type { ColumnDto } from "../../models/dtos/column-dto";
import { useDiagramDetail } from "../../hooks/useDiagramDetail";
const { Text } = Typography;

interface ColumnPopoverProps {
  tableId: string;
  column: ColumnDto;
  children: React.ReactNode;
}

export default function ColumnPopover({
  tableId,
  column,
  children,
}: ColumnPopoverProps) {
  const { updateColumn } = useDiagramDetail();

  return (
    <Popover
      key={column.id}
      placement="right"
      content={
        <Space size="small" className="w-full" direction="vertical">
          <Space direction="vertical" size="small" className="w-full">
            <Text>Type</Text>
            <Select
              className="w-full"
              size="small"
              value={column.type}
              options={[
                { value: "INT", label: "INT" },
                { value: "VARCHAR", label: "VARCHAR" },
                { value: "TEXT", label: "TEXT" },
                { value: "FLOAT", label: "FLOAT" },
                { value: "DATE", label: "DATE" },
                { value: "BOOLEAN", label: "BOOLEAN" },
              ]}
            ></Select>
          </Space>
          <Space direction="vertical" size="small" className="w-full">
            <Text className="text-xs font-medium">Default</Text>
            <Input placeholder="Null" size="small" />
          </Space>
          <Space direction="vertical" size="small" className="w-full">
            <Text className="text-xs font-medium">Name</Text>
            <Input
              placeholder="Column Name"
              size="small"
              value={column.name}
              onChange={(e) => {
                updateColumn(tableId, column.id, {
                  ...column,
                  name: e.target.value,
                });
              }}
            />
          </Space>
          <Space direction="vertical" size="small" className="w-full">
            <Text className="text-xs font-medium">Action</Text>
            <Button
              size="small"
              color="danger"
              variant="filled"
              className="w-full"
            >
              Delete
            </Button>
          </Space>
        </Space>
      }
      trigger="click"
    >
      {children}
    </Popover>
  );
}
