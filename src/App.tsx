import { RouterProvider } from "react-router";
import { ConfigProvider } from "antd";
import theme from "./theme/theme";
import "@xyflow/react/dist/style.css";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./router";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
