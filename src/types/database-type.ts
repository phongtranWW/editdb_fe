import type { Database } from "../data/constants";

export type DatabaseType = (typeof Database)[keyof typeof Database];
