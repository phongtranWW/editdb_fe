import { useContext } from "react";
import ViewContext from "../context/ViewContext";

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) throw new Error("useView must be used inside ViewProvider");
  return context;
};
