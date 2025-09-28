import React, { createContext, useState } from "react";

interface DesignContextValue {
  selections: {
    id: string;
    type: "table" | "relationship";
  }[];
  setSelections: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        type: "table" | "relationship";
      }[]
    >
  >;
}

const DesignContext = createContext<DesignContextValue | null>(null);

export const DesignProvider = ({ children }: { children: React.ReactNode }) => {
  const [selections, setSelections] = useState<
    {
      id: string;
      type: "table" | "relationship";
    }[]
  >([]);

  return (
    <DesignContext.Provider value={{ selections, setSelections }}>
      {children}
    </DesignContext.Provider>
  );
};

export default DesignContext;
