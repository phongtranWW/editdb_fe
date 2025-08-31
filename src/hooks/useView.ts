import { useContext } from "react";
import ViewContext from "../context/ViewContext/context";

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) throw new Error("useView must be used within ViewProvider");
  return context;
};
