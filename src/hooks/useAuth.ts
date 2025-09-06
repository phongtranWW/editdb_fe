import { useCallback, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { decodeJWT, isTokenValid } from "../utils/jwt";
import type { LoginDto } from "../api/auth/dtos/login-dto";
import { useMessage } from "./useMessage";
import { handleApiError } from "../utils/handleApiError";
import { localLogin, localRegister } from "../api/auth/authApi";
import type { RegisterDto } from "../api/auth/dtos/register-dto";

const useAuth = () => {
  const { loading, error, closeLoading } = useMessage();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { user, setUser } = context;

  const checkAuth = useCallback(() => {
    const savedToken = localStorage.getItem("access_token");
    return savedToken && isTokenValid(savedToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    setUser(null);
  }, [setUser]);

  const login = useCallback(
    async (dto: LoginDto): Promise<boolean> => {
      loading("Logging in...");
      try {
        const { accessToken } = await localLogin(dto);
        localStorage.setItem("access_token", accessToken);
        setUser(decodeJWT(accessToken));
        return true;
      } catch (err: unknown) {
        error(handleApiError(err, "Login"));
        return false;
      } finally {
        closeLoading();
      }
    },
    [loading, error, closeLoading, setUser]
  );

  const register = useCallback(
    async (dto: RegisterDto): Promise<boolean> => {
      loading("Registering...");
      try {
        await localRegister(dto);
        return true;
      } catch (err: unknown) {
        error(handleApiError(err, "Register"));
        return false;
      } finally {
        closeLoading();
      }
    },
    [loading, error, closeLoading]
  );

  return { checkAuth, logout, user, login, register };
};

export default useAuth;
