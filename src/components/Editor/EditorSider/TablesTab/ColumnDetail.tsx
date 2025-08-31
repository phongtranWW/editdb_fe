import { Button, Popover, Space, Typography } from "antd";
import {
  BorderOutlined,
  DeleteOutlined,
  KeyOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import EditableInput from "../../../ui/EditableInput";
import EditableSelection from "../../../ui/EditableSelection";
import EditableSwitch from "../../../ui/EditableSwitch";
import { useDiagram } from "../../../../hooks/useDiagram";
import { DATABASE } from "../../../../data/database";
import type { DiagramColumn } from "../../../../models/diagram-column";

const { Text } = Typography;

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
    type,
    default: defaultValue,
  } = column;
  const { dispatch, state } = useDiagram();

  return (
    <Popover
      placement="right"
      content={
        <Space size="small" className="w-full" direction="vertical">
          <Space direction="vertical" size="small" className="w-full">
            <Text className="text-xs font-medium">Name:</Text>
            <Space size="small" className="w-full">
              <EditableInput
                initialValue={name}
                onFinish={(name) => {
                  if (!name) {
                    dispatch({
                      type: "SET_ERROR",
                      payload: "Column name cannot be empty",
                    });
                    return;
                  }
                  dispatch({
                    type: "UPDATE_COLUMN",
                    payload: { id: tableId, columnId, partialColumn: { name } },
                  });
                }}
                placeholder="Column Name"
              />
              <EditableSwitch
                initialValue={isPrimary}
                finish={(isPrimary) =>
                  dispatch({
                    type: "UPDATE_COLUMN",
                    payload: {
                      id: tableId,
                      columnId,
                      partialColumn: {
                        isPrimary,
                        isUnique: isPrimary ? false : undefined,
                        isNullable: isPrimary ? false : undefined,
                      },
                    },
                  })
                }
                icon={<KeyOutlined size={8} />}
              />
              <EditableSwitch
                initialValue={isUnique}
                finish={(isUnique) => {
                  if (isPrimary) return;
                  dispatch({
                    type: "UPDATE_COLUMN",
                    payload: {
                      id: tableId,
                      columnId,
                      partialColumn: { isUnique },
                    },
                  });
                }}
                icon={<QuestionOutlined size={8} />}
              />
              <EditableSwitch
                initialValue={isNullable}
                finish={(isNullable) => {
                  if (isPrimary) return;
                  dispatch({
                    type: "UPDATE_COLUMN",
                    payload: {
                      id: tableId,
                      columnId,
                      partialColumn: { isNullable },
                    },
                  });
                }}
                icon={<BorderOutlined size={8} />}
              />
            </Space>
          </Space>
          <Space direction="vertical" size="small" className="w-full">
            <Text className="text-xs font-medium">Type:</Text>
            <EditableSelection
              className="!w-full"
              size="small"
              initialValue={type}
              options={DATABASE[state.type].columnType.map((t) => ({
                label: t,
                value: t,
              }))}
              finishSelect={(type) =>
                dispatch({
                  type: "UPDATE_COLUMN",
                  payload: { id: tableId, columnId, partialColumn: { type } },
                })
              }
            />
          </Space>
          <Space direction="vertical" size="small" className="w-full">
            <Text className="text-xs font-medium">Default value:</Text>
            <EditableInput
              initialValue={defaultValue || ""}
              onFinish={(defaultValue) =>
                dispatch({
                  type: "UPDATE_COLUMN",
                  payload: {
                    id: tableId,
                    columnId,
                    partialColumn: { default: defaultValue },
                  },
                })
              }
              placeholder="Default value"
            />
          </Space>
          <Space direction="vertical" size="small" className="w-full">
            <Text className="text-xs font-medium">Action</Text>
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
          </Space>
        </Space>
      }
      trigger="click"
    >
      {children}
    </Popover>
  );
}
