import { Flex, List, Tag, Typography } from "antd";
import type { ColumnDto } from "../../models/dtos/column-dto";
import ColumnPopover from "./ColumnPopover";

const { Text } = Typography;

interface ColumnListProps {
  tableId: string;
  columns: ColumnDto[];
}

export default function ColumnList({ tableId, columns }: ColumnListProps) {
  return (
    <List
      className="w-full"
      dataSource={columns}
      renderItem={(column) => (
        <ColumnPopover tableId={tableId} column={column}>
          <List.Item key={column.name}>
            <Flex justify="space-between" className="w-full p-0">
              <Text className="!text-sm">{column.name}</Text>
              <Tag>{column.type}</Tag>
            </Flex>
          </List.Item>
        </ColumnPopover>
      )}
    />
  );
}
