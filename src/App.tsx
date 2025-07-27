import { Route } from "react-router";
import { Routes } from "react-router";
import HomePage from "./pages/HomePage";
import AppLayout from "./components/layouts/AppLayout";
import TemplatesPage from "./pages/TemplatesPage";
import AuthProvider from "./auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import { ConfigProvider } from "antd";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import theme from "./theme/theme";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import DiagramsPage from "./pages/DiagramsPage";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/about" element={<AboutPage />} />
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
        </Routes>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
