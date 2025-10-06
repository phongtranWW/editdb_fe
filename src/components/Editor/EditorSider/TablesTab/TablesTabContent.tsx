import { Button, Flex, List } from "antd";
import TabContainer from "../TabContainer";
import CollapsableTabItem from "../CollapsableTabItem";
import { PlusOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import type { DiagramColumn } from "../../../../models/diagram-column";
import ColumnItem from "./ColumnItem";
import { SUPPORTED_COLUMN_TYPES } from "../../../../data/supported-column-types";
import { Database } from "../../../../data/constants";
import { useDiagram } from "../../../../context/DiagramContext/hooks";
export default function TablesTabContent() {
  const { state, dispatch } = useDiagram();

  console.log(state.undo);

  return (
    <TabContainer
      dataSource={state.data.tables}
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
                          SUPPORTED_COLUMN_TYPES[Database.MYSQL]
                        )[0],
                        isPrimary: false,
                        isUnique: false,
                        isNullable: true,
                        isAutoIncrement: false,
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
            name: `table_${state.data.tables.length + 1}`,
            columns: [],
          },
        });
      }}
    />
  );
}
