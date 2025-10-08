import React, { createContext, useState } from "react";
import type { SelectionContextValue } from "./types";

const SelectionContext = createContext<SelectionContextValue | null>(null);

export const SelectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<{
    tableIds: string[];
    relationshipIds: string[];
  }>({
    tableIds: [],
    relationshipIds: [],
  });

  return (
    <SelectionContext.Provider value={{ data, setData }}>
      {children}
    </SelectionContext.Provider>
  );
};

export default SelectionContext;
