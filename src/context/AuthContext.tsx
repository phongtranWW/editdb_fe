import { createContext, useEffect, useState } from "react";
import type { User } from "../models/user";
import { decodeJWT, isTokenValid } from "../utils/jwt";

interface UserState {
  user: User | null;
  checkAuth: () => boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<UserState | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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
};

export default AuthContext;
