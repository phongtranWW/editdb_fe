import { useCallback, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { decodeJWT, isTokenValid } from "../utils/jwt";
import type { LoginDto } from "../api/auth/dtos/login-dto";
import { handleApiError } from "../utils/handleApiError";
import { localLogin, localRegister } from "../api/auth/authApi";
import type { RegisterDto } from "../api/auth/dtos/register-dto";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { setUser, setIsLoading, setError, setSuccess } = context;

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
      setIsLoading(true);
      try {
        const { accessToken } = await localLogin(dto);
        localStorage.setItem("access_token", accessToken);
        setUser(decodeJWT(accessToken));
        return true;
      } catch (err: unknown) {
        setError(handleApiError(err, "Login"));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setUser]
  );

  const register = useCallback(
    async (dto: RegisterDto): Promise<boolean> => {
      setIsLoading(true);
      try {
        await localRegister(dto);
        setSuccess("Registered successfully");
        return true;
      } catch (err: unknown) {
        setError(handleApiError(err, "Register"));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setSuccess]
  );

  return { ...context, checkAuth, logout, login, register };
};

export default useAuth;
