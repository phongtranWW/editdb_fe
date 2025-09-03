import { useEffect, useState } from "react";
import type { Profile } from "../models/profile";
import { getProfile } from "../api/users/userApi";

export const useProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile>({
    id: "",
    name: "",
    email: "",
    isActive: false,
    avatar: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profile = await getProfile();
        setProfile(profile);
        setError(null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Error loading profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return { loading, error, profile };
};
