import { useContext } from "react";
import AppMessageContext from ".";

export const useAppMessage = () => {
  const context = useContext(AppMessageContext);
  if (!context)
    throw new Error("useAppMessage must be used within MessageProvider");
  return context;
};
