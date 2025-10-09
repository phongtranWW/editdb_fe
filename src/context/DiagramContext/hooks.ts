import { useCallback, useContext } from "react";
import DiagramContext from ".";

export function useDiagram() {
  const ctx = useContext(DiagramContext);
  if (!ctx) throw new Error("useDiagram must be used within DiagramProvider");

  const canExport = useCallback(() => {
    return ctx.state.issuses.length === 0;
  }, [ctx.state.issuses]);

  return {
    ...ctx,

    canExport,
  };
}
