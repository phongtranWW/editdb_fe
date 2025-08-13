import type { RelationshipDto } from "./relationship-dto";
import type { TableDto } from "./table-dto";

export interface DiagramDetailDto {
  name: string;
  description?: string;
  tables: TableDto[];
  relationships: RelationshipDto[];
}
