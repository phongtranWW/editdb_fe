import React, { createContext, useEffect, useState } from "react";
import type { User } from "../models/user";
import { decodeJWT, isTokenValid } from "../utils/jwt";

interface AuthContextValue {
  isLoading: boolean;
  error?: string;
  success?: string;
  user: User | null;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
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
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        error,
        setError,
        success,
        setSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
