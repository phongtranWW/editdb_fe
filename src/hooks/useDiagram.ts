import { useContext } from "react";
import DiagramContext from "../context/DiagramContext/context";

export const useDiagram = () => {
  const context = useContext(DiagramContext);
  if (!context)
    throw new Error("useDiagram must be used within DiagramProvider");
  return context;
};
