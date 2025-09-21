import { Database, Relationship } from "../../data/constants";
import { SUPPORTED_COLUMN_TYPES } from "../../data/supported-column-types";
import type { DiagramRelationship } from "../../models/diagram-relationship";
import type { DiagramTable } from "../../models/diagram-table";
import { Exporter } from "./exporter";
import type { RelationshipExporter } from "./types/relationship-exporter";
import type { TableExporter } from "./types/table-exporter";

export class PSQLExporter extends Exporter {
  constructor(tables: DiagramTable[], relationships: DiagramRelationship[]) {
    super(tables, relationships);
  }

  generateTable(table: TableExporter): string {
    const columns: string[] = [];

    // ===== CREATE COLUMNS ===== //
    for (const column of table.columns.values()) {
      // ===== FORMAT TYPE ===== //
      let finalType = column.type;
      switch (column.type) {
        case "INT":
          if (!column.isAutoIncrement) break;
          finalType = "SERIAL";
          break;
        case "BIGINT":
          if (!column.isAutoIncrement) break;
          finalType = "BIGSERIAL";
          break;
        case "SMALLINT":
          if (!column.isAutoIncrement) break;
          finalType = "SMALLSERIAL";
          break;
        case "VARCHAR":
          finalType = "VARCHAR(255)";
          break;
        case "CHAR":
          finalType = "CHAR(1)";
          break;
        default:
          break;
      }

      // ===== FORMAT NULLABLE ===== //
      let finalNull = null;
      if (!column.isNullable && !column.isPrimary) finalNull = "NOT NULL";

      // ===== FORMAT DEFAULT VALUE ===== //
      let finalDefault = null;
      if (column.defaultValue) {
        const defaultValue = SUPPORTED_COLUMN_TYPES[Database.POSTGRESQL][
          column.type
        ].isQuoted
          ? `'${column.defaultValue}'`
          : column.defaultValue;
        finalDefault = `DEFAULT ${defaultValue}`;
      }

      // ===== FORMAT UNIQUE ===== //
      let finalUnique = null;
      if (!column.isPrimary && column.isUnique) finalUnique = "UNIQUE";

      let columnSQL = `${column.name} ${finalType}`;
      if (finalNull) columnSQL += ` ${finalNull}`;
      if (finalDefault) columnSQL += ` ${finalDefault}`;
      if (finalUnique) columnSQL += ` ${finalUnique}`;
      columns.push(columnSQL);
    }

    // ===== CREATE PRIMARY KEY ===== //
    const primaryCols = Array.from(table.columns.values())
      .filter((c) => c.isPrimary)
      .map((c) => c.name);

    if (primaryCols.length > 0) {
      columns.push(`PRIMARY KEY (${primaryCols.join(", ")})`);
    }

    // ===== CREATE TABLE ===== //
    const tableSQL = [
      `CREATE TABLE ${table.name} (`,
      ...columns.map((col, i) => {
        const isLast = i === columns.length - 1;
        return `  ${col}${isLast ? "" : ","}`;
      }),
      ");\n",
    ].join("\n");

    return tableSQL;
  }

  generateRelationship(relationship: RelationshipExporter): string {
    const fromTable = this.tables.get(relationship.fromTable);
    const fromCol = fromTable?.columns.get(relationship.fromColumn);
    const toTable = this.tables.get(relationship.toTable);
    const toCol = toTable?.columns.get(relationship.toColumn);

    if (!fromTable || !fromCol || !toTable || !toCol) {
      throw new Error(
        `Invalid relationship "${relationship.name}": fromTable, fromColumn, toTable, toColumn must be defined`
      );
    }

    switch (relationship.type) {
      case Relationship.ONE_TO_ONE:
      case Relationship.MANY_TO_ONE:
        return (
          `ALTER TABLE ${fromTable!.name}\n` +
          `  ADD CONSTRAINT ${relationship.name}\n` +
          `  FOREIGN KEY (${fromCol!.name})\n` +
          `  REFERENCES ${toTable!.name} (${toCol!.name});\n`
        );
      case Relationship.ONE_TO_MANY:
        return (
          `ALTER TABLE ${toTable!.name}\n` +
          `  ADD CONSTRAINT ${relationship.name}\n` +
          `  FOREIGN KEY (${toCol!.name})\n` +
          `  REFERENCES ${fromTable!.name} (${fromCol!.name});\n`
        );
      default:
        return "";
    }
  }
}
