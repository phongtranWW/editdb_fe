import { createContext } from "react";
import type { AuthContextType } from "./AuthenticationContextType";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
