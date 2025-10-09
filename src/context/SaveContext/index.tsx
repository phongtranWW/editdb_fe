import { createContext, useEffect, useState } from "react";
import type { SaveContextValue } from "./types";
import equal from "fast-deep-equal";
import { useDiagram } from "../DiagramContext/hooks";

const SaveContext = createContext<SaveContextValue | null>(null);

export const SaveProvider = ({ children }: { children: React.ReactNode }) => {
  const { state } = useDiagram();
  const [saving, setSaving] = useState<"loading" | "dirty" | "idle">("idle");

  useEffect(() => {
    const id = setTimeout(() => {
      if (!equal(state.data, state.originalData)) setSaving("dirty");
      else setSaving("idle");
    }, 300);
    return () => clearTimeout(id);
  }, [state.data, state.originalData, setSaving]);

  return (
    <SaveContext.Provider value={{ saving, setSaving }}>
      {children}
    </SaveContext.Provider>
  );
};

export default SaveContext;
