import { Button, Flex, Select } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { DiagramRelationship } from "../../../../models/diagram-relationship";
import type { DiagramColumn } from "../../../../models/diagram-column";
import { Relationship } from "../../../../data/constants";
import { useDiagram } from "../../../../context/DiagramContext/hooks";

interface RelationshipDetailProps {
  relationship: DiagramRelationship;
}

export default function RelationshipContent({
  relationship,
}: RelationshipDetailProps) {
  const {
    state: { tables },
    dispatch,
  } = useDiagram();

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
    <Flex vertical className="w-full !p-3" gap={16}>
      <Flex vertical className="w-full" gap={8}>
        <p className="text-center text-sm font-semibold text-green-950 bg-green-100 rounded-md border border-green-200 px-2 py-1">
          Attributes:
        </p>
        <Flex vertical className="w-full" gap={8} justify="center">
          <Flex className="w-full" vertical gap={4}>
            <p className="text-sm font-medium text-start">From:</p>
            <Flex className="w-full" gap={4} align="center" justify="center">
              <Select
                className="w-1/2"
                size="small"
                value={relationship.fromTable}
                options={tables.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                onChange={(value) => {
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
                className="w-1/2"
                size="small"
                value={relationship.fromColumn}
                options={fromColumns.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                onChange={(value) => {
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
          </Flex>
          <Flex className="w-full" vertical gap={4}>
            <p className="text-sm font-medium text-start">To:</p>
            <Flex className="w-full" gap={4} align="center" justify="center">
              <Select
                className="w-1/2"
                size="small"
                value={relationship.toTable}
                options={tables.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                onChange={(value) => {
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
                className="w-1/2"
                size="small"
                value={relationship.toColumn}
                options={toColumns.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                onChange={(value) => {
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
          </Flex>
          <Flex className="w-full" vertical gap={4}>
            <p className="text-sm font-medium text-start">Type:</p>
            <Select
              className="w-full"
              size="small"
              value={relationship.type}
              options={Object.values(Relationship).map((c) => ({
                value: c,
                label: c,
              }))}
              onChange={(value) => {
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
          </Flex>
        </Flex>
      </Flex>
      <Flex vertical className="w-full" gap={8}>
        <p className="text-center text-sm font-semibold text-amber-950 bg-amber-100 rounded-md border border-amber-200 px-2 py-1">
          Actions:
        </p>
        <Flex className="w-full" gap={8} justify="center" align="center">
          <Button
            className="w-full"
            color="cyan"
            icon={<SyncOutlined />}
            size="small"
            variant="solid"
            onClick={() => {
              dispatch({
                type: "UPDATE_RELATIONSHIP",
                payload: {
                  id: relationship.id,
                  partialRelationship: {
                    fromTable: relationship.toTable,
                    fromColumn: relationship.toColumn,
                    toTable: relationship.fromTable,
                    toColumn: relationship.fromColumn,
                  },
                },
              });
            }}
          >
            Swap
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
