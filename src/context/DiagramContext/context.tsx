import { createContext, useEffect, useReducer } from "react";
import { diagramReducer, initialDiagramState } from "./reducer";
import type { DiagramContextValue } from "./types";
import { message } from "antd";

const DiagramContext = createContext<DiagramContextValue | null>(null);

export function DiagramProvider({ children }: { children: React.ReactNode }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [state, dispatch] = useReducer(diagramReducer, initialDiagramState);

  useEffect(() => {
    if (state.error) {
      messageApi.error(state.error);
      dispatch({ type: "SET_ERROR", payload: null });
    }
  }, [state.error, messageApi, dispatch]);

  return (
    <DiagramContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <>
        {contextHolder}
        {children}
      </>
    </DiagramContext.Provider>
  );
}

export default DiagramContext;
