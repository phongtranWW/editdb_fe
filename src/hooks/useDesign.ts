import { useCallback, useContext } from "react";
import DesignContext from "../context/DesignContext";
import { useAction } from "./useAction";
import { useMessage } from "./useMessage";
import { useDiagram } from "../context/DiagramContext/hooks";

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) throw new Error("useDesign must be used within DesignProvider");

  const { selections, setSelections } = context;
  const { warning } = useMessage();
  const { saveAction } = useAction();
  const { dispatch } = useDiagram();

  const save = useCallback(() => {
    saveAction();
  }, [saveAction]);

  const duplicate = useCallback(() => {
    if (selections.length === 0) {
      warning("No items selected to duplicate");
      return;
    }

    for (const selection of selections) {
      switch (selection.type) {
        case "table":
          dispatch({ type: "DUPLICATE_TABLE", payload: selection.id });
          break;
        default:
          break;
      }
    }
  }, [selections, warning, dispatch]);

  const remove = useCallback(() => {
    if (selections.length === 0) {
      warning("No items selected to delete");
      return;
    }

    for (const selection of selections) {
      switch (selection.type) {
        case "table":
          dispatch({ type: "DELETE_TABLE", payload: selection.id });
          break;
        case "relationship":
          dispatch({ type: "DELETE_RELATIONSHIP", payload: selection.id });
          break;
        default:
          break;
      }
    }
  }, [selections, dispatch, warning]);

  return {
    save,
    duplicate,
    remove,
    selections,
    setSelections,
  };
};
