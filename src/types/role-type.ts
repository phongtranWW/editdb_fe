import type { Role } from "../data/constants";

export type RoleType = (typeof Role)[keyof typeof Role];
