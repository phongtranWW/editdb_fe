import {
  Background,
  ConnectionLineType,
  ConnectionMode,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
} from "@xyflow/react";
import type { DiagramRelationship } from "../../models/diagram-relationship";
import type { DiagramTable } from "../../models/diagram-table";
import { useEffect } from "react";
import { edgeTypes, nodeTypes } from "../../data/constants";
import { generateNodePosition } from "../../utils/generateNodePosition";

interface PrviewDiagramProps {
  tables: DiagramTable[];
  relationships: DiagramRelationship[];
}

export function PreviewDiagram({ tables, relationships }: PrviewDiagramProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    const newNodes = tables.map((table, index) => ({
      id: table.id,
      type: "tableNode",
      position: generateNodePosition(index, []),
      data: {
        name: table.name,
        columns: table.columns,
      },
      selected: false,
      dragging: false,
    }));

    setNodes(newNodes);
  }, [tables, setNodes]);

  useEffect(() => {
    const newEdges = relationships.map(
      (relationship) =>
        ({
          id: relationship.id,
          source: relationship.fromTable,
          sourceHandle: relationship.fromColumn,
          target: relationship.toTable,
          targetHandle: relationship.toColumn,
          type: "relationshipEdge",
          label: relationship.name,
          data: {
            type: relationship.type,
          },
        } as Edge)
    );
    setEdges(newEdges);
  }, [relationships, setEdges]);

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0, zIndex: -1 }}>
        <defs>
          <marker
            id="many-marker"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="6"
            markerUnits="strokeWidth"
            orient="auto-start-reverse"
          >
            <line x1="0" y1="6" x2="8" y2="2" stroke="#b1b1b7" />
            <line x1="0" y1="6" x2="8" y2="6" stroke="#b1b1b7" />
            <line x1="0" y1="6" x2="8" y2="10" stroke="#b1b1b7" />
          </marker>
        </defs>
      </svg>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        connectionLineType={ConnectionLineType.Straight}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </>
  );
}
