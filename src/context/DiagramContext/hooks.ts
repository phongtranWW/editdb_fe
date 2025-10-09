import { useCallback, useContext } from "react";
import DiagramContext from ".";
import { IssueType } from "../../data/constants";

export function useDiagram() {
  const ctx = useContext(DiagramContext);
  if (!ctx) throw new Error("useDiagram must be used within DiagramProvider");

  const canExport = useCallback(() => {
    return ctx.state.issues.every((issue) => issue.type !== IssueType.ERROR);
  }, [ctx.state.issues]);

  return {
    ...ctx,
    canExport,
  };
}
