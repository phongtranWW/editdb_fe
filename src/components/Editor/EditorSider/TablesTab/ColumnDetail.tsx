import { Button, Checkbox, Flex, Popover, Select } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import EditableInput from "../../../UI/EditableInput";
import { useDiagram } from "../../../../hooks/useDiagram";
import type { DiagramColumn } from "../../../../models/diagram-column";
import { nanoid } from "nanoid";
import { SUPPORTED_COLUMN_TYPES } from "../../../../data/supported-column-types";

interface ColumnDetailProps {
  tableId: string;
  column: DiagramColumn;
  children: React.ReactNode;
}

export default function ColumnDetail({
  tableId,
  column,
  children,
}: ColumnDetailProps) {
  const {
    id: columnId,
    name,
    isPrimary,
    isUnique,
    isNullable,
    isAutoIncrement,
    type,
    defaultValue,
  } = column;
  const { dispatch, state } = useDiagram();

  return (
    <Popover
      placement="right"
      content={
        <Flex vertical className="w-full" gap={16}>
          <Flex vertical className="w-full" gap={8}>
            <p className="text-center text-sm font-semibold text-green-950 bg-green-100 rounded-md border border-green-200 px-2 py-1">
              Attributes:
            </p>
            <Flex vertical className="w-full" gap={8} justify="center">
              {/* Primary */}
              <Flex
                className="w-full"
                gap={4}
                align="center"
                justify="space-between"
              >
                <p className="text-sm font-medium text-start">Primary Key:</p>
                <Checkbox
                  checked={isPrimary}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_COLUMN",
                      payload: {
                        id: tableId,
                        columnId,
                        partialColumn: { isPrimary: e.target.checked },
                      },
                    });
                  }}
                />
              </Flex>

              {/* Auto Increment */}
              <Flex
                className="w-full"
                gap={4}
                align="center"
                justify="space-between"
              >
                <p className="text-sm font-medium text-start">
                  Auto Increment:
                </p>
                <Checkbox
                  disabled={
                    !SUPPORTED_COLUMN_TYPES[state.type][type]
                      ?.allowAutoIncrement
                  }
                  checked={isAutoIncrement || false}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_COLUMN",
                      payload: {
                        id: tableId,
                        columnId,
                        partialColumn: { isAutoIncrement: e.target.checked },
                      },
                    });
                  }}
                />
              </Flex>

              {/* Name */}
              <Flex
                className="w-full"
                gap={4}
                align="center"
                justify="space-between"
              >
                <p className="text-sm font-medium text-start">Name:</p>
                <EditableInput
                  className="!w-2/3"
                  initialValue={name}
                  onFinish={(name) => {
                    dispatch({
                      type: "UPDATE_COLUMN",
                      payload: {
                        id: tableId,
                        columnId,
                        partialColumn: { name },
                      },
                    });
                  }}
                  placeholder="Column Name"
                />
              </Flex>

              {/* Type */}
              <Flex
                className="w-full"
                gap={4}
                align="center"
                justify="space-between"
              >
                <p className="text-sm font-medium text-start">Type:</p>
                <Select
                  size="small"
                  className="!w-2/3"
                  options={Object.keys(SUPPORTED_COLUMN_TYPES[state.type]).map(
                    (key) => ({ label: key, value: key })
                  )}
                  value={type}
                  onChange={(type) => {
                    dispatch({
                      type: "UPDATE_COLUMN",
                      payload: {
                        id: tableId,
                        columnId,
                        partialColumn: { type },
                      },
                    });
                  }}
                />
              </Flex>

              {/* Unique */}
              <Flex
                className="w-full"
                gap={4}
                align="center"
                justify="space-between"
              >
                <p className="text-sm font-medium text-start">Unique:</p>
                <Checkbox
                  checked={isUnique}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_COLUMN",
                      payload: {
                        id: tableId,
                        columnId,
                        partialColumn: { isUnique: e.target.checked },
                      },
                    });
                  }}
                />
              </Flex>

              {/* Nullable */}
              <Flex
                className="w-full"
                gap={4}
                align="center"
                justify="space-between"
              >
                <p className="text-sm font-medium text-start">Nullable:</p>
                <Checkbox
                  checked={isNullable}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_COLUMN",
                      payload: {
                        id: tableId,
                        columnId,
                        partialColumn: { isNullable: e.target.checked },
                      },
                    });
                  }}
                />
              </Flex>

              {/* Default */}
              <Flex
                className="w-full"
                gap={4}
                align="center"
                justify="space-between"
              >
                <p className="text-sm font-medium text-start">Default:</p>
                <EditableInput
                  className="!w-2/3"
                  initialValue={defaultValue || ""}
                  onFinish={(defaultValue) => {
                    const value =
                      defaultValue === "" || defaultValue == null
                        ? undefined
                        : defaultValue;

                    dispatch({
                      type: "UPDATE_COLUMN",
                      payload: {
                        id: tableId,
                        columnId,
                        partialColumn: { defaultValue: value },
                      },
                    });
                  }}
                  placeholder="Default Value"
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex vertical className="w-full" gap={8}>
            <p className="text-center text-sm font-semibold text-amber-950 bg-amber-100 rounded-md border border-amber-200 px-2 py-1">
              Actions:
            </p>
            <Flex className="w-full" gap={8} justify="end" align="center">
              <Button
                color="cyan"
                icon={<PlusCircleOutlined />}
                size="small"
                variant="solid"
                onClick={() =>
                  dispatch({
                    type: "ADD_COLUMN",
                    payload: {
                      id: tableId,
                      column: {
                        ...column,
                        id: nanoid(6),
                      },
                    },
                  })
                }
              >
                Duplicate
              </Button>
              <Button
                color="danger"
                icon={<DeleteOutlined />}
                size="small"
                variant="solid"
                onClick={() =>
                  dispatch({
                    type: "DELETE_COLUMN",
                    payload: { id: tableId, columnId },
                  })
                }
              >
                Delete
              </Button>
            </Flex>
          </Flex>
        </Flex>
      }
      trigger="click"
    >
      {children}
    </Popover>
  );
}
