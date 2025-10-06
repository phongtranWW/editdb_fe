import { Button, Flex, Select } from "antd";
import type { DiagramColumn } from "../../../../models/diagram-column";
import { KeyOutlined, MoreOutlined } from "@ant-design/icons";
import DoubleClickInput from "../../../UI/DoubleClickInput";
import ColumnDetail from "./ColumnDetail";
import clsx from "clsx";
import { SUPPORTED_COLUMN_TYPES } from "../../../../data/supported-column-types";
import { useDiagram } from "../../../../context/DiagramContext/hooks";

interface ColumnItemProps {
  index: number;
  tableId: string;
  column: DiagramColumn;
}

export default function ColumnItem({
  index,
  tableId,
  column,
}: ColumnItemProps) {
  const { dispatch, state } = useDiagram();
  return (
    <Flex
      justify="space-between"
      align="center"
      className={clsx("w-full !py-2 !px-4 hover:bg-gray-300 cursor-pointer", {
        "bg-gray-100": index % 2 === 0,
      })}
      gap={4}
    >
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
      <Select
        className="flex-1"
        suffixIcon={null}
        size="small"
        value={column.type}
        options={Object.keys(SUPPORTED_COLUMN_TYPES[state.type]).map((key) => ({
          value: key,
          label: key,
        }))}
        onChange={(value) => {
          dispatch({
            type: "UPDATE_COLUMN",
            payload: {
              id: tableId,
              columnId: column.id,
              partialColumn: { type: value },
            },
          });
        }}
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
