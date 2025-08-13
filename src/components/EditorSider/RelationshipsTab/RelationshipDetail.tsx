import { Button, Flex, Popover, Space, Typography } from "antd";
import EditableSelection from "../../ui/EditableSelection";
import { DeleteOutlined } from "@ant-design/icons";
import { useDiagramDetail } from "../../../hooks/useDiagramDetail";
import { useEffect, useState } from "react";
const { Text } = Typography;

interface RelationshipDetailProps {
  id: string;
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  type: "ONE-TO-ONE" | "ONE-TO-MANY" | "MANY-TO-ONE";
  children: React.ReactNode;
}

export default function RelationshipDetail({
  id,
  fromTable,
  fromColumn,
  toTable,
  toColumn,
  type,
  children,
}: RelationshipDetailProps) {
  const {
    getTableNames,
    getColumnNames,
    updateRelationship,
    deleteRelationship,
  } = useDiagramDetail();

  // Bảng không cần state
  const tables = getTableNames();

  // State cục bộ cho columns để phản ứng ngay khi user đổi bảng
  const [fromColumns, setFromColumns] = useState(() =>
    getColumnNames(fromTable)
  );
  const [toColumns, setToColumns] = useState(() => getColumnNames(toTable));

  // Nếu props đổi từ bên ngoài (vd: action ngoài component), sync lại
  useEffect(() => {
    setFromColumns(getColumnNames(fromTable));
  }, [fromTable, getColumnNames]);

  useEffect(() => {
    setToColumns(getColumnNames(toTable));
  }, [toTable, getColumnNames]);

  return (
    <Popover
      placement="right"
      trigger="click"
      content={
        <Space size="small" className="w-[300px]" direction="vertical">
          {/* From */}
          <Space direction="vertical" size="small" className="w-full">
            <Text className="text-xs font-medium">From:</Text>
            <Flex
              align="center"
              justify="space-between"
              className="w-full"
              gap={8}
            >
              <EditableSelection
                className="!flex-2"
                size="small"
                initialValue={fromTable}
                options={tables.map((t) => ({ value: t.id, label: t.name }))}
                finishSelect={(value: string) => {
                  updateRelationship(id, {
                    fromTable: value,
                    fromColumn: undefined,
                  });
                  setFromColumns(getColumnNames(value));
                }}
              />
              <EditableSelection
                className="!flex-1"
                size="small"
                initialValue={fromColumn}
                options={fromColumns.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                finishSelect={(value: string) =>
                  updateRelationship(id, { fromColumn: value })
                }
              />
            </Flex>
          </Space>

          {/* To */}
          <Space direction="vertical" size="small" className="w-full">
            <Text className="text-xs font-medium">To:</Text>
            <Flex
              align="center"
              justify="space-between"
              className="w-full"
              gap={8}
            >
              <EditableSelection
                className="!flex-2"
                size="small"
                initialValue={toTable}
                options={tables.map((t) => ({ value: t.id, label: t.name }))}
                finishSelect={(value: string) => {
                  updateRelationship(id, {
                    toTable: value,
                    toColumn: undefined,
                  });
                  setToColumns(getColumnNames(value));
                }}
              />
              <EditableSelection
                className="!flex-1"
                size="small"
                initialValue={toColumn}
                options={toColumns.map((c) => ({ value: c.id, label: c.name }))}
                finishSelect={(value: string) =>
                  updateRelationship(id, { toColumn: value })
                }
              />
            </Flex>
          </Space>

          {/* Type */}
          <Space direction="vertical" size="small" className="w-full">
            <Text className="text-xs font-medium">Type:</Text>
            <EditableSelection
              className="!w-full"
              size="small"
              initialValue={type}
              options={[
                { value: "ONE-TO-ONE", label: "ONE-TO-ONE" },
                { value: "ONE-TO-MANY", label: "ONE-TO-MANY" },
                { value: "MANY-TO-ONE", label: "MANY-TO-ONE" },
              ]}
              finishSelect={(
                value: "ONE-TO-ONE" | "ONE-TO-MANY" | "MANY-TO-ONE"
              ) => updateRelationship(id, { type: value })}
            />
          </Space>

          {/* Action */}
          <Space direction="vertical" size="small" className="w-full">
            <Text className="text-xs font-medium">Action</Text>
            <Button
              color="danger"
              icon={<DeleteOutlined />}
              size="small"
              variant="solid"
              onClick={() => deleteRelationship(id)}
            >
              Delete
            </Button>
          </Space>
        </Space>
      }
    >
      {children}
    </Popover>
  );
}
