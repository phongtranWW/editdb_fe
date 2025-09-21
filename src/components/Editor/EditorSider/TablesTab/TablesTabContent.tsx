import { Button, Flex, List } from "antd";
import TabContainer from "../TabContainer";
import CollapsableTabItem from "../CollapsableTabItem";
import { PlusOutlined } from "@ant-design/icons";
import { useDiagram } from "../../../../hooks/useDiagram";
import { nanoid } from "nanoid";
import type { DiagramColumn } from "../../../../models/diagram-column";
import ColumnItem from "./ColumnItem";
import { SUPPORTED_COLUMN_TYPES } from "../../../../data/supported-column-types";
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
          <Flex vertical justify="center" align="center" className="w-full">
            <List
              size="small"
              className="w-full"
              dataSource={table.columns}
              renderItem={(column: DiagramColumn, index) => (
                <ColumnItem tableId={table.id} column={column} index={index} />
              )}
            />
            <Flex justify="end" align="center" className="w-full !px-4 !py-3">
              <Button
                size="small"
                color="cyan"
                icon={<PlusOutlined />}
                variant="filled"
                onClick={() =>
                  dispatch({
                    type: "ADD_COLUMN",
                    payload: {
                      id: table.id,
                      column: {
                        id: nanoid(6),
                        name: `column_${table.columns.length + 1}`,
                        type: Object.keys(
                          SUPPORTED_COLUMN_TYPES[state.type]
                        )[0],
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
          </Flex>
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
