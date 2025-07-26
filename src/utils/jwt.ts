import type { User } from "../models/user";

export function decodeJWT(token: string): User | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}

export function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch {
    return false;
  }
}
