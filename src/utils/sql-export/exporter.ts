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
          default?: string;
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
                default: c.default,
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
      ddl.push(`CREATE DATABASE ${this.name};`);
    }

    // ==========================
    // CREATE TABLES
    // ==========================
    ddl.push("-- Create tables");
    for (const table of this.tables.values()) {
      // ==========================
      // CREATE COLUMNS
      // ==========================
      const columns: string[] = [];
      for (const column of table.columns.values()) {
        let draf = `${column.name} ${column.type}`;
        if (!column.isNullable) draf = draf.concat(" NOT NULL");
        if (column.isUnique && !column.isPrimary) draf = draf.concat(" UNIQUE");
        columns.push(draf);
      }

      const primaryColumns: string[] = [];
      for (const column of table.columns.values()) {
        if (column.isPrimary) primaryColumns.push(column.name);
      }

      if (primaryColumns.length > 0) {
        columns.push(`PRIMARY KEY (${primaryColumns.join(",")})`);
      }

      ddl.push(
        `CREATE TABLE ${table.name} (\n` + `${columns.join(",\n")},\n` + ");"
      );
    }

    // ==========================
    // CREATE RELATIONSHIPS
    // ==========================
    ddl.push("-- Create relationships");
    for (const relationship of this.relationships.values()) {
      const fromTableName = this.tables.get(relationship.fromTable || "");
      const fromColumnName = fromTableName?.columns.get(
        relationship.fromColumn || ""
      );
      const toTableName = this.tables.get(relationship.toTable || "");
      const toColumnName = toTableName?.columns.get(
        relationship.toColumn || ""
      );
      ddl.push(
        `ALTER TABLE ${fromTableName?.name} 
           ADD CONSTRAINT ${relationship.name} 
           FOREIGN KEY (${fromColumnName?.name}) REFERENCES ${toTableName?.name} (${toColumnName?.name});`
      );
    }

    return ddl.join("\n");
  }
}
