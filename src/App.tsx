import { Route } from "react-router";
import { Routes } from "react-router";
import HomePage from "./pages/HomePage";
import AppLayout from "./components/App/AppLayout";
import LoginPage from "./pages/LoginPage";
import { ConfigProvider } from "antd";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import theme from "./theme/theme";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import DiagramsPage from "./pages/DiagramsPage";
import "@xyflow/react/dist/style.css";
import { AuthProvider } from "./context/AuthContext";
import EditorPage from "./pages/EditorPage";
import TemplatesPage from "./pages/TemplatesPage";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          {/* Form Layout */}
          <Route path="/login" element={<LoginPage />} />

          {/* App Layout */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/templates" element={<TemplatesPage />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/diagrams"
              element={
                <ProtectedRoute>
                  <DiagramsPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Editor Layout */}
          <Route
            path="/diagrams/:id"
            element={
              <ProtectedRoute>
                <EditorPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
