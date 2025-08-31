import type { DiagramRelationship } from "../../models/diagram-relationship";
import type { DiagramTable } from "../../models/diagram-table";
import { Exporter } from "./exporter";

export class PSQLExporter extends Exporter {
  constructor(
    tables: DiagramTable[],
    relationships: DiagramRelationship[],
    name?: string
  ) {
    super(tables, relationships, name);
  }
}
