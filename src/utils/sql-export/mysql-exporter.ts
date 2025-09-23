import { Relationship } from "../../data/constants";
import type { DiagramRelationship } from "../../models/diagram-relationship";
import type { DiagramTable } from "../../models/diagram-table";
import type { RelationshipExporter } from "../../models/relationship-exporter";
import type { TableExporter } from "../../models/table-exporter";
import { Exporter } from "./exporter";

export class MySQLExporter extends Exporter {
  constructor(tables: DiagramTable[], relationships: DiagramRelationship[]) {
    super(tables, relationships);
  }

  formatDefaultValue(value: string, type: string) {
    if (
      /^(CURRENT_TIMESTAMP|CURRENT_DATE|NOW\(\)|LOCALTIME|LOCALTIMESTAMP)$/i.test(
        value
      )
    ) {
      return value;
    }

    if (
      [
        "TINYINT",
        "SMALLINT",
        "MEDIUMINT",
        "INT",
        "INTEGER",
        "BIGINT",
        "DECIMAL",
        "NUMERIC",
      ].includes(type)
    ) {
      return value;
    } else {
      return `'${value}'`;
    }
  }

  generateTable(table: TableExporter): string {
    const columns: string[] = [];

    for (const column of table.columns.values()) {
      let finalType = column.type;

      // ===== FORMAT TYPE ===== //
      switch (column.type) {
        case "INT":
        case "INTEGER":
        case "TINYINT":
        case "SMALLINT":
        case "MEDIUMINT":
        case "BIGINT":
          if (column.isAutoIncrement)
            finalType = `${column.type} AUTO_INCREMENT`;
          break;
        case "VARCHAR":
          finalType = "VARCHAR(255)";
          break;
        case "CHAR":
          finalType = "CHAR(1)";
          break;
        case "TEXT":
          finalType = "TEXT";
          break;
        default:
          break;
      }

      // ===== NULLABLE ===== //
      let finalNull = null;
      if (!column.isNullable && !column.isPrimary) finalNull = "NOT NULL";

      // ===== DEFAULT VALUE ===== //
      let finalDefault = null;
      if (column.defaultValue) {
        finalDefault = `DEFAULT ${this.formatDefaultValue(
          column.defaultValue,
          column.type
        )}`;
      }

      // ===== UNIQUE ===== //
      let finalUnique = null;
      if (!column.isPrimary && column.isUnique) finalUnique = "UNIQUE";

      let columnSQL = `${column.name} ${finalType}`;
      if (finalNull) columnSQL += ` ${finalNull}`;
      if (finalDefault) columnSQL += ` ${finalDefault}`;
      if (finalUnique) columnSQL += ` ${finalUnique}`;
      columns.push(columnSQL);
    }

    // ===== PRIMARY KEY ===== //
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
      ") ENGINE=InnoDB;\n",
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

    // MySQL FOREIGN KEY syntax
    switch (relationship.type) {
      case Relationship.ONE_TO_ONE:
      case Relationship.MANY_TO_ONE:
        return (
          `ALTER TABLE ${fromTable.name}\n` +
          `  ADD CONSTRAINT ${relationship.name}\n` +
          `  FOREIGN KEY (${fromCol.name})\n` +
          `  REFERENCES ${toTable.name} (${toCol.name});\n`
        );
      case Relationship.ONE_TO_MANY:
        return (
          `ALTER TABLE ${toTable.name}\n` +
          `  ADD CONSTRAINT ${relationship.name}\n` +
          `  FOREIGN KEY (${toCol.name})\n` +
          `  REFERENCES ${fromTable.name} (${fromCol.name});\n`
        );
      default:
        return "";
    }
  }
}
