import type { User } from "../models/user";

export interface AuthContextType {
  user: User | null;
  checkAuth: () => boolean;
  login: (token: string) => void;
  logout: () => void;
}
