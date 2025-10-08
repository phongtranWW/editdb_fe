import { useContext } from "react";
import DesignContext from ".";

export const useSelection = () => {
  const context = useContext(DesignContext);
  if (!context) throw new Error("useDesign must be used within DesignProvider");

  return context;
};
