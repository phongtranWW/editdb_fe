import React, { createContext, useEffect, useState } from "react";
import type { User } from "../models/user";
import { decodeJWT, isTokenValid } from "../utils/jwt";

interface AuthContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken && isTokenValid(savedToken)) {
      setUser(decodeJWT(savedToken));
    } else {
      localStorage.removeItem("access_token");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
