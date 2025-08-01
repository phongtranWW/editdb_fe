import React, { useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { decodeJWT, isTokenValid } from "../utils/jwt";
import type { User } from "../models/user";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<User | null>(null);
  // Initialize auth state
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken && isTokenValid(savedToken)) {
      setUser(decodeJWT(savedToken));
    } else {
      localStorage.removeItem("access_token");
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("access_token", newToken);
    setUser(decodeJWT(newToken));
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const checkAuth = (): boolean => {
    const currentToken = localStorage.getItem("access_token");
    if (!currentToken || !isTokenValid(currentToken)) {
      logout();
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, checkAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
