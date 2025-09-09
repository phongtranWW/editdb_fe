import { Button, Flex, List, Space } from "antd";
import TabContainer from "../TabContainer";
import CollapsableTabItem from "../CollapsableTabItem";
import { PlusOutlined } from "@ant-design/icons";
import { useDiagram } from "../../../../hooks/useDiagram";
import { nanoid } from "nanoid";
import { DATABASE } from "../../../../data/database";
import type { DiagramColumn } from "../../../../models/diagram-column";
import ColumnItem from "./ColumnItem";
export default function TablesTabContent() {
  const { state, dispatch } = useDiagram();

  return (
    <TabContainer
      dataSource={state.tables}
      renderItem={(table) => (
        <CollapsableTabItem
          label={table.name}
          key={table.id}
          changeLabel={(name) => {
            dispatch({
              type: "UPDATE_TABLE",
              payload: { id: table.id, partialTable: { name } },
            });
          }}
          deleteItem={() => {
            dispatch({
              type: "DELETE_TABLE",
              payload: table.id,
            });
          }}
        >
          <Space size="small" className="w-full" direction="vertical">
            <List
              dataSource={table.columns}
              renderItem={(column: DiagramColumn) => (
                <List.Item className="cursor-pointer">
                  <ColumnItem tableId={table.id} column={column} />
                </List.Item>
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
