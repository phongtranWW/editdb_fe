import type { Profile } from "../../models/profile";
import privateAxios from "../privateAxios";

export const getProfile = async (): Promise<Profile> => {
  const response = await privateAxios.get("/users/me");
  return response.data;
};
