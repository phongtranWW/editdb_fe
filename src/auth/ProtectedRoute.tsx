import { useEffect } from "react";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAuth()) {
      navigate("/login");
    }
  }, [checkAuth, navigate]);

  return <>{children}</>;
}
