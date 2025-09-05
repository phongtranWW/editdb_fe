import { message } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import { createContext } from "react";

const MessageContext = createContext<MessageInstance | null>(null);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
