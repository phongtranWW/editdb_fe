import { useCallback, useContext } from "react";
import MessageContext from "../context/MessageContext";

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context)
    throw new Error("useMessage must be used within MessageProvider");

  const success = useCallback(
    (message: string) => {
      context.success({
        content: message,
      });
    },
    [context]
  );

  const error = useCallback(
    (message: string) => {
      context.error({
        content: message,
      });
    },
    [context]
  );

  const warning = useCallback(
    (message: string) => {
      context.warning({
        content: message,
      });
    },
    [context]
  );

  const loading = useCallback(
    (msg: string, key = "loading") =>
      context.open({ type: "loading", content: msg, duration: 0, key }),
    [context]
  );

  const closeLoading = useCallback(
    (key = "loading") => context.destroy(key),
    [context]
  );

  return {
    success,
    error,
    warning,
    loading,
    closeLoading,
  };
};
