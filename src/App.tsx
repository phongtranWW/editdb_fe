import { RouterProvider } from "react-router";
import { ConfigProvider } from "antd";
import theme from "./theme/theme";
import "@xyflow/react/dist/style.css";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./router";
import { AppMessageProvider } from "./context/AppMessageContext";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AppMessageProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AppMessageProvider>
    </ConfigProvider>
  );
}

export default App;
