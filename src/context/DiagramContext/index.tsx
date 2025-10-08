import { createContext, useReducer } from "react";
import { diagramReducer, initialDiagramState } from "./reducer";
import type { DiagramContextValue } from "./types";

const DiagramContext = createContext<DiagramContextValue | null>(null);

export function DiagramProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(diagramReducer, initialDiagramState);

  return (
    <DiagramContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
}

export default DiagramContext;
