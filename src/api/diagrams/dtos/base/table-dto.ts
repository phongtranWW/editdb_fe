import type { ColumnDto } from "./column-dto";

export interface TableDto {
  id: string;
  name: string;
  columns: ColumnDto[];
}
