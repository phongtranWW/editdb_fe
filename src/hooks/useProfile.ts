import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import type { Profile } from "../models/profile";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDiagrams = async () => {
    try {
      setIsLoading(true);
      const data = await userService.getProfile();
      setProfile(data);
      setError(null);
    } catch (err: unknown) {
      console.error("Failed to fetch diagrams:", err);
      setError("Failed to load diagrams.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagrams();
  }, []);

  return { profile, isLoading, error };
};
