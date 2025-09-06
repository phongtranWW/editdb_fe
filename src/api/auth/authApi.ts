import publicAxios from "../publicAxios";
import type { LoginDto } from "./dtos/login-dto";
import type { RegisterDto } from "./dtos/register-dto";

export const localLogin = async (
  dto: LoginDto
): Promise<{ accessToken: string }> => {
  const response = await publicAxios.post("/auth/login", dto);
  return response.data;
};

export const localRegister = async (dto: RegisterDto): Promise<void> => {
  await publicAxios.post("/auth/register", dto);
};
