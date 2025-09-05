import { Button, Flex, List, Space, Tag, Typography } from "antd";
import TabContainer from "../TabContainer";
import CollapsableTabItem from "../CollapsableTabItem";
import EditableInput from "../../../UI/EditableInput";
import ColumnDetail from "./ColumnDetail";
import {
  BorderOutlined,
  KeyOutlined,
  PlusOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { useDiagram } from "../../../../hooks/useDiagram";
import { nanoid } from "nanoid";
import { DATABASE } from "../../../../data/database";
import type { DiagramColumn } from "../../../../models/diagram-column";
const { Text } = Typography;

export default function TablesTabContent() {
  const { state, dispatch } = useDiagram();

  return (
    <TabContainer
      dataSource={state.tables}
      renderItem={(table) => (
        <CollapsableTabItem
          label={table.name}
          key={table.id}
          deleteItem={() => {
            dispatch({
              type: "DELETE_TABLE",
              payload: table.id,
            });
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
                  dispatch({
                    type: "UPDATE_TABLE",
                    payload: { id: table.id, partialTable: { name } },
                  });
                }}
              />
            </Flex>
            <List
              dataSource={table.columns}
              renderItem={(column: DiagramColumn) => (
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
                  dispatch({
                    type: "ADD_COLUMN",
                    payload: {
                      id: table.id,
                      column: {
                        id: nanoid(6),
                        name: `column_${table.columns.length + 1}`,
                        type: DATABASE[state.type]?.columnType[0],
                        isPrimary: false,
                        isUnique: false,
                        isNullable: true,
                      },
                    },
                  })
                }
              >
                Add Column
              </Button>
            </Flex>
          </Space>
        </CollapsableTabItem>
      )}
      addItem={() => {
        dispatch({
          type: "ADD_TABLE",
          payload: {
            id: nanoid(6),
            name: `table_${state.tables.length + 1}`,
            columns: [],
          },
        });
      }}
    />
  );
}
