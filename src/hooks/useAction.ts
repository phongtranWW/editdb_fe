import { useCallback, useContext, useLayoutEffect } from "react";
import ActionContext from "../context/ActionContext";
import { useDiagram } from "./useDiagram";
import { deleteDiagram, updateDiagram } from "../api/diagrams/diagramApi";
import { useMessage } from "./useMessage";
import { handleApiError } from "../utils/handleApiError";

export const useAction = () => {
  const context = useContext(ActionContext);
  if (!context) throw new Error("useAction must be used within ActionProvider");

  const { error } = useMessage();
  const { saved, setLoading, setSaved } = context;

  const {
    state: { tables, relationships, type, name, id },
  } = useDiagram();

  useLayoutEffect(() => {
    setSaved(false);
  }, [tables, relationships, type, name, setSaved, id]);

  const saveAction = useCallback(async () => {
    if (saved) return;
    setLoading(true);
    try {
      await updateDiagram(id, {
        name,
        type,
        tables,
        relationships,
      });
      setSaved(true);
    } catch (err: unknown) {
      error(handleApiError(err, "Diagram"));
    } finally {
      setLoading(false);
    }
  }, [
    tables,
    relationships,
    type,
    name,
    id,
    error,
    setSaved,
    setLoading,
    saved,
  ]);

  const deleteAction = useCallback(async () => {
    setLoading(true);
    try {
      await deleteDiagram(id);
    } catch (err: unknown) {
      error(handleApiError(err, "Diagram"));
    } finally {
      setLoading(false);
    }
  }, [error, id, setLoading]);

  return {
    saved: context.saved,
    loading: context.loading,
    saveAction,
    deleteAction,
  };
};
