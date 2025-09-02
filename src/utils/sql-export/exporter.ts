import { RelationshipType } from "../../data/constants";
import type { DiagramRelationship } from "../../models/diagram-relationship";
import type { DiagramTable } from "../../models/diagram-table";

export abstract class Exporter {
  protected tables: Map<
    string,
    {
      name: string;
      columns: Map<
        string,
        {
          name: string;
          type: string;
          isPrimary: boolean;
          isUnique: boolean;
          isNullable: boolean;
        }
      >;
    }
  >;
  protected relationships: Map<
    string,
    {
      name: string;
      fromTable?: string;
      fromColumn?: string;
      toTable?: string;
      toColumn?: string;
      type: string;
    }
  >;
  protected name?: string;

  constructor(
    tables: DiagramTable[],
    relationships: DiagramRelationship[],
    name?: string
  ) {
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
              },
            ])
          ),
        },
      ])
    );
    this.relationships = new Map(
      relationships.map((r) => [
        r.id,
        {
          name: r.name,
          fromTable: r.fromTable,
          fromColumn: r.fromColumn,
          toTable: r.toTable,
          toColumn: r.toColumn,
          type: r.type,
        },
      ])
    );
    this.name = name
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase();
  }

  export(): string {
    const ddl: string[] = [];

    // ==========================
    // CREATE DATABASE
    // ==========================
    ddl.push("-- Create database");
    if (this.name) {
      ddl.push(`CREATE DATABASE IF NOT EXISTS ${this.name};\n`);
    }

    // ==========================
    // CREATE TABLES
    // ==========================
    ddl.push("-- Create tables");
    for (const table of this.tables.values()) {
      const columns: string[] = [];

      for (const column of table.columns.values()) {
        let line = `${column.name} ${column.type}`;
        if (!column.isNullable) line += " NOT NULL";
        if (column.isUnique && !column.isPrimary) line += " UNIQUE";
        columns.push(line);
      }

      const primaryCols = Array.from(table.columns.values())
        .filter((c) => c.isPrimary)
        .map((c) => c.name);

      if (primaryCols.length > 0) {
        columns.push(`PRIMARY KEY (${primaryCols.join(", ")})`);
      }

      // format SQL block
      const tableSQL = [
        `CREATE TABLE ${table.name} (`,
        ...columns.map((col, i) => {
          const isLast = i === columns.length - 1;
          return `  ${col}${isLast ? "" : ","}`;
        }),
        ");\n",
      ].join("\n");

      ddl.push(tableSQL);
    }

    // ==========================
    // CREATE RELATIONSHIPS
    // ==========================
    ddl.push("-- Create relationships");
    for (const relationship of this.relationships.values()) {
      const fromTable = this.tables.get(relationship.fromTable || "");
      const fromCol = fromTable?.columns.get(relationship.fromColumn || "");
      const toTable = this.tables.get(relationship.toTable || "");
      const toCol = toTable?.columns.get(relationship.toColumn || "");

      if (!fromTable || !fromCol || !toTable || !toCol) continue;

      switch (relationship.type) {
        case RelationshipType.ONE_TO_ONE:
          ddl.push(
            `ALTER TABLE ${fromTable.name}\n` +
              `  ADD CONSTRAINT ${relationship.name}\n` +
              `  FOREIGN KEY (${fromCol.name})\n` +
              `  REFERENCES ${toTable.name} (${toCol.name});\n`
          );
          break;
        case RelationshipType.ONE_TO_MANY:
          ddl.push(
            `ALTER TABLE ${toTable.name}\n` +
              `  ADD CONSTRAINT ${relationship.name}\n` +
              `  FOREIGN KEY (${toCol.name})\n` +
              `  REFERENCES ${fromTable.name} (${fromCol.name});\n`
          );
          break;
        case RelationshipType.MANY_TO_ONE:
          ddl.push(
            `ALTER TABLE ${fromTable.name}\n` +
              `  ADD CONSTRAINT ${relationship.name}\n` +
              `  FOREIGN KEY (${fromCol.name})\n` +
              `  REFERENCES ${toTable.name} (${toCol.name});\n`
          );
          break;
      }
    }

    return ddl.join("\n");
  }
}
