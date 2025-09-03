import type { SortType } from "../../types/sort-type";

export interface Params {
  page: number;
  limit: number;
  search?: string;
  sort?: SortType;
}
