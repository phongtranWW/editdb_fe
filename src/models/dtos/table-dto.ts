import type { ColumnDto } from "./column-dto";
import type { PositionDto } from "./position-dto";

export interface TableDto {
  id: string;
  name: string;
  position: PositionDto;
  columns: ColumnDto[];
}
