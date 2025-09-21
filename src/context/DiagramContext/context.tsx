import { createContext, useCallback, useEffect, useReducer } from "react";
import { diagramReducer, initialDiagramState } from "./reducer";
import type { DiagramAction, DiagramContextValue } from "./types";
import { getDiagram } from "../../api/diagrams/diagramApi";
import { validateAction } from "./validateAction";
import { useMessage } from "../../hooks/useMessage";
import { handleApiError } from "../../utils/handleApiError";

const DiagramContext = createContext<DiagramContextValue | null>(null);

export function DiagramProvider({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { error } = useMessage();
  const [state, dispatch] = useReducer(diagramReducer, initialDiagramState);

  const validatedDispatch = useCallback(
    (action: DiagramAction) => {
      const err = validateAction(action);
      if (err) {
        error(err);
        return;
      }
      dispatch(action);
    },
    [error]
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
      } catch (err: unknown) {
        error(handleApiError(err, "Diagram"));
      } finally {
        if (mounted) dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchDiagram();
    return () => {
      mounted = false;
    };
  }, [id, error]);

  return (
    <DiagramContext.Provider
      value={{
        state,
        dispatch: validatedDispatch,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
}

export default DiagramContext;
