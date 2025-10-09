import { createContext } from "react";
import type { MessageContextValue } from "./types";
import { message } from "antd";

const AppMessageContext = createContext<MessageContextValue | null>(null);

export const AppMessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <AppMessageContext.Provider value={{ messageApi }}>
      {contextHolder}
      {children}
    </AppMessageContext.Provider>
  );
};

export default AppMessageContext;
