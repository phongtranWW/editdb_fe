import { getProfile } from "../api/userApi";
import type { ProfileDto } from "../models/profile";

export const userService = {
  async getProfile(): Promise<ProfileDto> {
    const response = await getProfile();
    return response.data;
  },
};
