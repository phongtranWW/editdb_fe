import { useCallback, useContext, useLayoutEffect } from "react";
import ActionContext from "../context/ActionContext";
import { useDiagram } from "./useDiagram";
import { deleteDiagram, updateDiagram } from "../api/diagrams/diagramApi";

export const useAction = () => {
  const context = useContext(ActionContext);
  if (!context) throw new Error("useAction must be used within ActionProvider");

  const { saved, setLoading, setSaved, messageApi } = context;

  const {
    state: { tables, relationships, type, name, id },
  } = useDiagram();

  useLayoutEffect(() => {
    if (!id) return;
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message || error?.message || String(error);
      messageApi.error(`Error saving diagram: ${errMsg}`);
    } finally {
      setLoading(false);
    }
  }, [
    tables,
    relationships,
    type,
    name,
    id,
    messageApi,
    setSaved,
    setLoading,
    saved,
  ]);

  const deleteAction = useCallback(async () => {
    setLoading(true);
    try {
      await deleteDiagram(id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message || error?.message || String(error);
      messageApi.error(`Error deleting diagram: ${errMsg}`);
    } finally {
      setLoading(false);
    }
  }, [messageApi, id, setLoading]);

  return {
    saved: context.saved,
    loading: context.loading,
    saveAction,
    deleteAction,
  };
};
