import { Button, Popover, Space, Typography } from "antd";
import {
  BorderOutlined,
  DeleteOutlined,
  KeyOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { useDiagramDetail } from "../../../../hooks/useDiagramDetail";
import EditableInput from "../../../ui/EditableInput";
import EditableSelection from "../../../ui/EditableSelection";
import EditableSwitch from "../../../ui/EditableSwitch";
import type { ColumnDto } from "../../../../models/column";

const { Text } = Typography;

interface ColumnDetailProps {
  tableId: string;
  column: ColumnDto;
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
  const { deleteColumn, updateColumn } = useDiagramDetail();

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
                onFinish={(name) => updateColumn(tableId, columnId, { name })}
                placeholder="Column Name"
              />
              <EditableSwitch
                initialValue={isPrimary}
                finish={(isPrimary) =>
                  updateColumn(tableId, columnId, { isPrimary })
                }
                icon={<KeyOutlined size={8} />}
              />
              <EditableSwitch
                initialValue={isUnique}
                finish={(isUnique) =>
                  updateColumn(tableId, columnId, { isUnique })
                }
                icon={<QuestionOutlined size={8} />}
              />
              <EditableSwitch
                initialValue={isNullable}
                finish={(isNullable) =>
                  updateColumn(tableId, columnId, { isNullable })
                }
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
              options={[
                { value: "INT", label: "INT" },
                { value: "VARCHAR", label: "VARCHAR" },
                { value: "TEXT", label: "TEXT" },
                { value: "FLOAT", label: "FLOAT" },
                { value: "DATE", label: "DATE" },
                { value: "BOOLEAN", label: "BOOLEAN" },
              ]}
              finishSelect={(type) => updateColumn(tableId, columnId, { type })}
            />
          </Space>
          <Space direction="vertical" size="small" className="w-full">
            <Text className="text-xs font-medium">Default value:</Text>
            <EditableInput
              initialValue={defaultValue || ""}
              onFinish={(defaultValue) =>
                updateColumn(tableId, columnId, { default: defaultValue })
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
              onClick={() => deleteColumn(tableId, columnId)}
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
