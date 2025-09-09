import { Button, Flex } from "antd";
import type { DiagramColumn } from "../../../../models/diagram-column";
import { KeyOutlined, MoreOutlined } from "@ant-design/icons";
import EditableSelection from "../../../UI/EditableSelection";
import { useDiagram } from "../../../../hooks/useDiagram";
import { DATABASE } from "../../../../data/database";
import DoubleClickInput from "../../../UI/DoubleClickInput";
import ColumnDetail from "./ColumnDetail";

interface ColumnItemProps {
  tableId: string;
  column: DiagramColumn;
}

export default function ColumnItem({ tableId, column }: ColumnItemProps) {
  const { dispatch, state } = useDiagram();
  return (
    <Flex justify="space-between" align="center" className="w-full p-0" gap={4}>
      <Flex className="w-1/2" gap={4}>
        {column.isPrimary && <KeyOutlined className="!text-yellow-400" />}
        <DoubleClickInput
          initialValue={column.name}
          placeholder="Column Name"
          classes={{
            root: "text-sm font-semibold w-full",
          }}
          onFinish={(name) => {
            dispatch({
              type: "UPDATE_COLUMN",
              payload: {
                id: tableId,
                columnId: column.id,
                partialColumn: { name },
              },
            });
          }}
        />
      </Flex>
      <EditableSelection
        className="flex-1"
        suffixIcon={null}
        size="small"
        initialValue={column.type}
        options={DATABASE[state.type].columnType.map((t) => ({
          label: t,
          value: t,
        }))}
        finishSelect={(type) =>
          dispatch({
            type: "UPDATE_COLUMN",
            payload: {
              id: tableId,
              columnId: column.id,
              partialColumn: { type },
            },
          })
        }
      />
      <ColumnDetail tableId={tableId} column={column}>
        <Button
          size="small"
          color="geekblue"
          variant="text"
          icon={<MoreOutlined />}
        />
      </ColumnDetail>
    </Flex>
  );
}
