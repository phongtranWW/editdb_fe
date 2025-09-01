import type { DatabaseType } from "../../../../types/database-type";
import type { RelationshipDto } from "./relationship-dto";
import type { TableDto } from "./table-dto";

export class BaseDiagramDto {
  name: string;
  tables: TableDto[];
  relationships: RelationshipDto[];
  type: DatabaseType;

  constructor(
    name: string,
    tables: TableDto[],
    relationships: RelationshipDto[],
    type: DatabaseType
  ) {
    this.name = name;
    this.tables = tables;
    this.relationships = relationships;
    this.type = type;
  }
}
