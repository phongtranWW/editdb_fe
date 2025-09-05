import {
  BaseEdge,
  getSmoothStepPath,
  useInternalNode,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";
import type { RelationshipType } from "../../types/relationship-type";
import { getEdgeParams } from "../../utils/getEdgeParams";

type RelationshipEdge = Edge<
  {
    type: RelationshipType;
  },
  "relationship"
>;

export function EditorEdge({
  id,
  source,
  target,
  sourceHandleId,
  targetHandleId,
  data,
}: EdgeProps<RelationshipEdge>) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode || !sourceHandleId || !targetHandleId) {
    return null;
  }

  const { sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition } =
    getEdgeParams(sourceNode, sourceHandleId, targetNode, targetHandleId);

  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <BaseEdge
      id={id}
      path={path}
      style={{
        strokeWidth: 2,
      }}
      markerEnd={data?.type === "ONE_TO_MANY" ? "url(#many-marker)" : undefined}
      markerStart={
        data?.type === "MANY_TO_ONE" ? "url(#many-marker)" : undefined
      }
    />
  );
}
