import {
  Background,
  ConnectionMode,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
} from "@xyflow/react";
import { useEffect } from "react";
import TableNode from "./TableNode";
import { useDiagramDetail } from "../../../hooks/useDiagramDetail";
import { useView } from "../../../hooks/useView";
const nodeTypes = {
  tableNode: TableNode,
};

export function EditorCanva() {
  const { tables, relationships, updateTable } = useDiagramDetail();
  const { showMiniMap, showControls } = useView();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    const initialNodes = tables.map((table) => ({
      id: table.id,
      type: "tableNode",
      position: table.position,
      data: {
        name: table.name,
        columns: table.columns,
      },
    }));

    const initialEdges = relationships.map((relationship) => ({
      id: relationship.name,
      source: relationship.fromTable,
      sourceHandle: `source-${relationship.fromColumn}`,
      target: relationship.toTable,
      targetHandle: `target-${relationship.toColumn}`,
      type: "smoothstep",
      label: relationship.type,
    }));
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [tables, relationships, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodeDragStop={(_, node) => {
        updateTable(node.id, {
          position: {
            x: node.position.x,
            y: node.position.y,
          },
        });
      }}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      connectionMode={ConnectionMode.Loose}
      fitView
    >
      <Background />
      {showControls && <Controls />}
      {showMiniMap && <MiniMap />}
    </ReactFlow>
  );
}
