import type { DiagramRelationship } from "../../models/diagram-relationship";
import type { DiagramTable } from "../../models/diagram-table";
import type { RelationshipExporter } from "../../models/relationship-exporter";
import type { TableExporter } from "../../models/table-exporter";

export abstract class Exporter {
  protected tables: Map<string, TableExporter>;
  protected relationships: Map<string, RelationshipExporter>;

  constructor(tables: DiagramTable[], relationships: DiagramRelationship[]) {
    this.tables = new Map(
      tables.map((t) => [
        t.id,
        {
          name: t.name,
          columns: new Map(
            t.columns.map((c) => [
              c.id,
              {
                name: c.name,
                type: c.type,
                isPrimary: c.isPrimary,
                isUnique: c.isUnique,
                isNullable: c.isNullable,
                isAutoIncrement: c.isAutoIncrement,
                defaultValue: c.defaultValue,
              },
            ])
          ),
        },
      ])
    );

    this.relationships = new Map(
      relationships.map((r) => {
        if (!r.fromTable || !r.fromColumn || !r.toTable || !r.toColumn) {
          throw new Error(
            `Invalid relationship "${r.name}": fromTable, fromColumn, toTable, toColumn must be defined`
          );
        }

        return [
          r.id,
          {
            name: r.name,
            fromTable: r.fromTable,
            fromColumn: r.fromColumn,
            toTable: r.toTable,
            toColumn: r.toColumn,
            type: r.type,
          },
        ];
      })
    );
  }

  abstract generateTable(table: TableExporter): string;
  abstract generateRelationship(relationship: RelationshipExporter): string;

  export(): string {
    const ddl: string[] = [];
    // ==========================
    // CREATE TABLES
    // ==========================
    ddl.push("-- Create tables");
    for (const table of this.tables.values()) {
      const tableSQL = this.generateTable(table);
      ddl.push(tableSQL);
    }

    // ==========================
    // CREATE RELATIONSHIPS
    // ==========================
    ddl.push("-- Create relationships");
    for (const relationship of this.relationships.values()) {
      const relationshipSQL = this.generateRelationship(relationship);
      ddl.push(relationshipSQL);
    }

    return ddl.join("\n");
  }
}
