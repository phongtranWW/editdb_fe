import { getProfile } from "../api/userApi";
import type { ProfileDto } from "../models/dtos/profile-dto";

export const userService = {
  async getProfile(): Promise<ProfileDto> {
    const response = await getProfile();
    return response.data;
  },
};
