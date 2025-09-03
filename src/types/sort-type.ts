import type { Sort } from "../data/constants";

export type SortType = (typeof Sort)[keyof typeof Sort];
