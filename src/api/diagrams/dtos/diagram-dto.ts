import type { DatabaseType } from "../../../types/database-type";
import { BaseDiagramDto } from "./base/base-diagram-dto";
import type { RelationshipDto } from "./base/relationship-dto";
import type { TableDto } from "./base/table-dto";

export class DiagramDto extends BaseDiagramDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  constructor(
    id: string,
    name: string,
    tables: TableDto[],
    relationships: RelationshipDto[],
    type: DatabaseType,
    createdAt: string,
    updatedAt: string
  ) {
    super(name, tables, relationships, type);
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
