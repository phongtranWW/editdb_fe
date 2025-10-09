import { useCallback, useContext } from "react";
import SaveContext from ".";
import { handleApiError } from "../../utils/handleApiError";
import { useDiagram } from "../DiagramContext/hooks";
import { updateDiagram } from "../../api/diagrams/diagramApi";
import { useAppMessage } from "../AppMessageContext/hooks";

export const useSave = () => {
  const { messageApi } = useAppMessage();
  const context = useContext(SaveContext);
  if (!context) throw new Error("useSave must be used within SaveProvider");

  const { saving, setSaving } = context;
  const { state } = useDiagram();

  const save = useCallback(async () => {
    if (saving !== "dirty") return;
    setSaving("loading");
    try {
      const { id, ...data } = state.data;
      await updateDiagram(id, data);
    } catch (err) {
      messageApi.error(handleApiError(err, "Diagram"));
    } finally {
      setSaving("idle");
    }
  }, [saving, setSaving, messageApi, state.data]);

  return {
    ...context,
    save,
  };
};
