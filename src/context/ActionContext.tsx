import React, { createContext, useState } from "react";

interface ActionContextValue {
  loading: boolean;
  saved: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionContext = createContext<ActionContextValue | null>(null);

export const ActionProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(true);

  return (
    <ActionContext.Provider
      value={{
        loading,
        saved,
        setLoading,
        setSaved,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export default ActionContext;
