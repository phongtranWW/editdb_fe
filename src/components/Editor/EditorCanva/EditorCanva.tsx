import {
  Background,
  ConnectionLineType,
  ConnectionMode,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
} from "@xyflow/react";
import { useEffect, useRef } from "react";
import { generateNodePosition } from "../../../utils/generateNodePosition";
import { edgeTypes, nodeTypes } from "../../../data/constants";
import { useDiagram } from "../../../context/DiagramContext/hooks";
import { useView } from "../../../context/ViewContext/hooks";
import { useHotkeys } from "react-hotkeys-hook";

export function EditorCanva() {
  const { state: viewState } = useView();
  const { state: diagramState, dispatch } = useDiagram();
  const selectedNodeIdsRef = useRef<string[]>([]);
  const selectedEdgeIdsRef = useRef<string[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useHotkeys(
    ["delete", "backspace"],
    () => {
      const nodeIds = selectedNodeIdsRef.current;
      const edgeIds = selectedEdgeIdsRef.current;

      if (nodeIds.length === 0 && edgeIds.length === 0) return;

      dispatch({
        type: "DELETE_SELECTION",
        payload: {
          tableIds: nodeIds,
          relationshipIds: edgeIds,
        },
      });
    },
    { preventDefault: true }
  );

  useHotkeys(
    "ctrl+d",
    () => {
      const nodeIds = selectedNodeIdsRef.current;
      const edgeIds = selectedEdgeIdsRef.current;

      if (nodeIds.length === 0 && edgeIds.length === 0) return;

      dispatch({
        type: "DUPLICATE_SELECTION",
        payload: {
          tableIds: nodeIds,
          relationshipIds: edgeIds,
        },
      });
    },
    { preventDefault: true }
  );

  useEffect(() => {
    setNodes((currentNodes) => {
      const nodeMap = new Map(currentNodes.map((node) => [node.id, node]));
      return diagramState.data.tables.map((table, index) => {
        const existingNode = nodeMap.get(table.id);

        return {
          id: table.id,
          type: "tableNode",
          position:
            existingNode?.position || generateNodePosition(index, currentNodes),
          data: {
            table,
          },
          ...(existingNode && {
            selected: existingNode.selected,
            dragging: existingNode.dragging,
          }),
        };
      });
    });
  }, [diagramState.data.tables, setNodes]);

  useEffect(() => {
    const newEdges = diagramState.data.relationships.map(
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
  }, [diagramState.data.relationships, setEdges]);

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
        selectionOnDrag={true}
        panOnDrag={[1, 2]}
        onSelectionChange={({ nodes, edges }) => {
          selectedNodeIdsRef.current = nodes.map((node) => node.id);
          selectedEdgeIdsRef.current = edges.map((edge) => edge.id);
        }}
      >
        <Background />
        {viewState.showControls && <Controls />}
        {viewState.showMiniMap && <MiniMap />}
      </ReactFlow>
    </>
  );
}
