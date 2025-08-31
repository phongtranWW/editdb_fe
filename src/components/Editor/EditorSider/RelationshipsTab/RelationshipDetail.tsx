import { Button, Flex, Popover, Space, Typography } from "antd";
import EditableSelection from "../../../ui/EditableSelection";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDiagram } from "../../../../hooks/useDiagram";
import type { DiagramRelationship } from "../../../../models/diagram-relationship";
import type { DiagramColumn } from "../../../../models/diagram-column";
import { RelationshipType } from "../../../../data/constants";
const { Text } = Typography;

interface RelationshipDetailProps {
  relationship: DiagramRelationship;
  children: React.ReactNode;
}

export default function RelationshipDetail({
  relationship,
  children,
}: RelationshipDetailProps) {
  const {
    state: { tables },
    dispatch,
  } = useDiagram();

  // State cục bộ cho columns để phản ứng ngay khi user đổi bảng
  const [fromColumns, setFromColumns] = useState<DiagramColumn[]>([]);
  const [toColumns, setToColumns] = useState<DiagramColumn[]>([]);

  useEffect(() => {
    setFromColumns(
      () => tables.find((t) => t.id === relationship.fromTable)?.columns || []
    );
  }, [tables, relationship.fromTable]);

  useEffect(() => {
    setToColumns(
      () => tables.find((t) => t.id === relationship.toTable)?.columns || []
    );
  }, [tables, relationship.toTable]);

  console.log("fromColumns", relationship.fromColumn);
  console.log("toColumns", relationship.toColumn);

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
                initialValue={relationship.fromTable || ""}
                options={tables.map((t) => ({
                  value: t.id,
                  label: t.name,
                }))}
                finishSelect={(value: string) => {
                  dispatch({
                    type: "UPDATE_RELATIONSHIP",
                    payload: {
                      id: relationship.id,
                      partialRelationship: {
                        fromTable: value,
                      },
                    },
                  });
                }}
              />
              <EditableSelection
                className="!flex-1"
                size="small"
                initialValue={relationship.fromColumn || ""}
                options={fromColumns.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                finishSelect={(value: string) => {
                  if (relationship.toColumn) {
                    const toColumnType = tables
                      .find((t) => t.id === relationship.toTable)
                      ?.columns.find((c) => c.id === relationship.toColumn);
                    const fromColumnType = tables
                      .find((t) => t.id === relationship.fromTable)
                      ?.columns.find((c) => c.id === value);
                    if (toColumnType?.type !== fromColumnType?.type) {
                      dispatch({
                        type: "SET_ERROR",
                        payload:
                          "Relationship to column must be same with relationship 'to column'",
                      });
                      return;
                    }
                  }
                  dispatch({
                    type: "UPDATE_RELATIONSHIP",
                    payload: {
                      id: relationship.id,
                      partialRelationship: {
                        fromColumn: value,
                      },
                    },
                  });
                }}
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
                initialValue={relationship.toTable || ""}
                options={tables.map((t) => ({
                  value: t.id,
                  label: t.name,
                }))}
                finishSelect={(value: string) => {
                  dispatch({
                    type: "UPDATE_RELATIONSHIP",
                    payload: {
                      id: relationship.id,
                      partialRelationship: {
                        toTable: value,
                      },
                    },
                  });
                }}
              />
              <EditableSelection
                className="!flex-1"
                size="small"
                initialValue={relationship.toColumn || ""}
                options={toColumns.map((c) => ({ value: c.id, label: c.name }))}
                finishSelect={(value: string) => {
                  if (relationship.fromColumn) {
                    const fromColumnType = tables
                      .find((t) => t.id === relationship.fromTable)
                      ?.columns.find(
                        (c) => c.id === relationship.fromColumn
                      )?.type;
                    const toColumnType = tables
                      .find((t) => t.id === relationship.toTable)
                      ?.columns.find((c) => c.id === value)?.type;
                    if (fromColumnType !== toColumnType) {
                      dispatch({
                        type: "SET_ERROR",
                        payload:
                          "Relationship to column must be same with relationship 'from column'",
                      });
                      return;
                    }
                  }
                  dispatch({
                    type: "UPDATE_RELATIONSHIP",
                    payload: {
                      id: relationship.id,
                      partialRelationship: {
                        toColumn: value,
                      },
                    },
                  });
                }}
              />
            </Flex>
          </Space>

          {/* Type */}
          <Space direction="vertical" size="small" className="w-full">
            <Text className="text-xs font-medium">Type:</Text>
            <EditableSelection
              className="!w-full"
              size="small"
              initialValue={relationship.type}
              options={Object.values(RelationshipType).map((t) => ({
                value: t,
                label: t,
              }))}
              finishSelect={(value) => {
                dispatch({
                  type: "UPDATE_RELATIONSHIP",
                  payload: {
                    id: relationship.id,
                    partialRelationship: {
                      type: value,
                    },
                  },
                });
              }}
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
              onClick={() => {
                dispatch({
                  type: "DELETE_RELATIONSHIP",
                  payload: relationship.id,
                });
              }}
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
