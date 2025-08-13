import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  ConnectionMode,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import TableNode from "./EditorNode";
import { useDiagramDetail } from "../../../hooks/useDiagramDetail";
import { useView } from "../../../hooks/useView";

const nodeTypes = {
  tableNode: TableNode,
};

export function EditorCanva() {
  const { tables, relationships } = useDiagramDetail();
  const { showMiniMap, showControls } = useView();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const initialNodes = tables.map((table) => ({
      id: table.name,
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
      type: "step",
      label: relationship.type,
    }));
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [tables, relationships]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
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
