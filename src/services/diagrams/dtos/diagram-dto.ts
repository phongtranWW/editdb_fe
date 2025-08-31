import type { RelationshipDto } from "./relationship-dto";
import type { TableDto } from "./table-dto";

export interface DiagramDto {
  id: string;
  name: string;
  tables: TableDto[];
  relationships: RelationshipDto[];
  createdAt: string;
  updatedAt: string;
}
