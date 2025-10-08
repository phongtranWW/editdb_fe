import { useContext } from "react";
import ViewContext from ".";

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) throw new Error("useView must be used within ViewProvider");
  return context;
};
