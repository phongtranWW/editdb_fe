import type { DatabaseType } from "../types/database-type";
import type { DiagramRelationship } from "./diagram-relationship";
import type { DiagramTable } from "./diagram-table";

export interface Diagram {
  id: string;
  name: string;
  type: DatabaseType;
  tables: DiagramTable[];
  relationships: DiagramRelationship[];
}
