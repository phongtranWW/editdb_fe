import { useContext } from "react";
import DiagramDetailContext from "../context/DiagramDetailContext";

export const useDiagramDetail = () => {
  const context = useContext(DiagramDetailContext);
  if (!context)
    throw new Error(
      "useDiagramDetail must be used inside DiagramDetailProvider"
    );
  return context;
};
