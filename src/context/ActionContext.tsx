import React, { createContext, useState } from "react";
import { message } from "antd";
import type { MessageInstance } from "antd/es/message/interface";

interface ActionContextValue {
  loading: boolean;
  saved: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSaved: React.Dispatch<React.SetStateAction<boolean>>;
  messageApi: MessageInstance;
}

const ActionContext = createContext<ActionContextValue | null>(null);

export const ActionProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <ActionContext.Provider
      value={{
        loading,
        saved,
        setLoading,
        setSaved,
        messageApi,
      }}
    >
      <>
        {contextHolder}
        {children}
      </>
    </ActionContext.Provider>
  );
};

export default ActionContext;
