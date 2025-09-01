import { createContext, useCallback, useEffect, useReducer } from "react";
import { diagramReducer, initialDiagramState } from "./reducer";
import type { DiagramAction, DiagramContextValue } from "./types";
import { message } from "antd";
import { getDiagram } from "../../api/diagrams/diagramApi";
import { validateAction } from "./validateAction";

const DiagramContext = createContext<DiagramContextValue | null>(null);

export function DiagramProvider({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const [state, dispatch] = useReducer(diagramReducer, initialDiagramState);

  const validatedDispatch = useCallback(
    (action: DiagramAction) => {
      const error = validateAction(action);
      if (error) {
        messageApi.error(error);
        return;
      }
      dispatch(action);
    },
    [messageApi]
  );

  useEffect(() => {
    let mounted = true;

    const fetchDiagram = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const diagram = await getDiagram(id);
        if (!mounted) return;

        dispatch({
          type: "SET_TABLES",
          payload: diagram.tables,
        });
        dispatch({
          type: "SET_RELATIONSHIPS",
          payload: diagram.relationships,
        });
        dispatch({ type: "SET_ID", payload: diagram.id });
        dispatch({ type: "SET_NAME", payload: diagram.name });
        dispatch({ type: "SET_TYPE", payload: diagram.type });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errMsg =
          error?.response?.data?.message || error?.message || String(error);
        messageApi.error(`Error loading diagram: ${errMsg}`);
      } finally {
        if (mounted) dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchDiagram();
    return () => {
      mounted = false;
    };
  }, [id, messageApi]);

  return (
    <DiagramContext.Provider
      value={{
        state,
        dispatch: validatedDispatch,
      }}
    >
      {contextHolder}
      {children}
    </DiagramContext.Provider>
  );
}

export default DiagramContext;
