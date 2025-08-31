import type { DatabaseType } from "../data/constants";

export type DatabaseType = (typeof DatabaseType)[keyof typeof DatabaseType];
