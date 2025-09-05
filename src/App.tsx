import { RouterProvider } from "react-router";
import { ConfigProvider } from "antd";
import theme from "./theme/theme";
import "@xyflow/react/dist/style.css";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./router";
import { MessageProvider } from "./context/MessageContext";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <MessageProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </MessageProvider>
    </ConfigProvider>
  );
}

export default App;
