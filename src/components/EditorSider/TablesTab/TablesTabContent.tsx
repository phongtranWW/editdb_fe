import { Button, Flex, List, Space, Tag, Typography } from "antd";
import { useDiagramDetail } from "../../../hooks/useDiagramDetail";
import TabContainer from "../TabContainer";
import CollapsableTabItem from "../CollapsableTabItem";
import EditableInput from "../../ui/EditableInput";
import ColumnDetail from "./ColumnDetail";
import {
  BorderOutlined,
  KeyOutlined,
  PlusOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import type { ColumnDto } from "../../../models/dtos/column-dto";
const { Text } = Typography;

export default function TablesTabContent() {
  const { tables, addTable, updateTable, deleteTable, addColumn } =
    useDiagramDetail();

  return (
    <TabContainer
      dataSource={tables}
      renderItem={(table) => (
        <CollapsableTabItem
          label={table.name}
          key={table.id}
          deleteItem={() => {
            deleteTable(table.id);
          }}
        >
          <Space size="small" className="w-full" direction="vertical">
            <Flex
              align="center"
              className="w-full"
              justify="space-between"
              gap={16}
            >
              <Text className="!text-xs">Name: </Text>
              <EditableInput
                className="!flex-1"
                initialValue={table.name}
                placeholder="Table name"
                onFinish={(name) => {
                  updateTable(table.id, { name });
                }}
              />
            </Flex>
            <List
              dataSource={table.columns}
              renderItem={(column: ColumnDto) => (
                <ColumnDetail tableId={table.id} column={column}>
                  <List.Item className="cursor-pointer">
                    <Flex
                      justify="space-between"
                      align="center"
                      className="w-full p-0"
                    >
                      <Space size="small">
                        <Text className="!text-sm !font-semibold">
                          {column.name}
                        </Text>
                        <Tag color="orange" className="!text-[10px]">
                          {column.type}
                        </Tag>
                      </Space>
                      <Space size="small">
                        <Button
                          disabled
                          size="small"
                          color="primary"
                          variant={column.isPrimary ? "solid" : "text"}
                          icon={<KeyOutlined />}
                          className="!cursor-pointer"
                        ></Button>
                        <Button
                          disabled
                          size="small"
                          color="primary"
                          variant={column.isUnique ? "solid" : "text"}
                          icon={<QuestionOutlined />}
                        ></Button>
                        <Button
                          disabled
                          size="small"
                          color="primary"
                          variant={column.isNullable ? "solid" : "text"}
                          icon={<BorderOutlined />}
                        ></Button>
                      </Space>
                    </Flex>
                  </List.Item>
                </ColumnDetail>
              )}
            />
            <Flex justify="end" align="center" className="w-full">
              <Button
                size="small"
                color="cyan"
                icon={<PlusOutlined />}
                variant="text"
                onClick={() =>
                  addColumn(table.id, `column_${table.columns.length + 1}`)
                }
              >
                Add
              </Button>
            </Flex>
          </Space>
        </CollapsableTabItem>
      )}
      addItem={() => {
        addTable(`table_${tables.length + 1}`);
      }}
    />
  );
}
