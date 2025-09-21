import { Button, Flex, Popover, Select, Space, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDiagram } from "../../../../hooks/useDiagram";
import type { DiagramRelationship } from "../../../../models/diagram-relationship";
import type { DiagramColumn } from "../../../../models/diagram-column";
import { Relationship } from "../../../../data/constants";
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
              <Select
                className="!flex-2"
                size="small"
                value={relationship.fromTable || ""}
                options={tables.map((t) => ({
                  value: t.id,
                  label: t.name,
                }))}
                onChange={(value: string) => {
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
              <Select
                className="!flex-1"
                size="small"
                value={relationship.fromColumn || ""}
                options={fromColumns.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                onChange={(value: string) => {
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
              <Select
                className="!flex-2"
                size="small"
                value={relationship.toTable || ""}
                options={tables.map((t) => ({
                  value: t.id,
                  label: t.name,
                }))}
                onChange={(value: string) => {
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
              <Select
                className="!flex-1"
                size="small"
                value={relationship.toColumn || ""}
                options={toColumns.map((c) => ({ value: c.id, label: c.name }))}
                onChange={(value: string) => {
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
            <Select
              className="!w-full"
              size="small"
              value={relationship.type}
              options={Object.values(Relationship).map((t) => ({
                value: t,
                label: t,
              }))}
              onChange={(value: string) => {
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
