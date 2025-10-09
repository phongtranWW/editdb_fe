import { useEffect, useState } from "react";
import type { Profile } from "../models/profile";
import { getProfile } from "../api/users/userApi";
import { handleApiError } from "../utils/handleApiError";

export const useProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profile = await getProfile();
        setProfile(profile);
      } catch (err: unknown) {
        setError(handleApiError(err, "Profile"));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [error]);

  return { loading, error, profile };
};
