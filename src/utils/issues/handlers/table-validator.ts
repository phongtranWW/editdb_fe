import { SUPPORTED_COLUMN_TYPES } from "../../../data/supported-column-types";
import type { IssueContext } from "../issue-context";
import { BaseIssueHandler } from "./base-issue-handler";

export class TableValidator extends BaseIssueHandler {
  handle(context: IssueContext): void {
    // ERROR
    // Rule 1: Name must be unique
    const usedTableNames = new Set<string>();
    for (const table of context.tables.values()) {
      if (usedTableNames.has(table.name.toLowerCase())) {
        context.addIssue({
          message: `Duplicate table '${table.name}'`,
          type: "ERROR",
        });
      } else {
        usedTableNames.add(table.name.toLowerCase());
      }
    }

    // Rule 2: Regex
    const regex = /^[A-Za-z][A-Za-z0-9_]{0,63}$/;
    for (const table of context.tables.values()) {
      if (!regex.test(table.name)) {
        context.addIssue({
          message: `Table name '${table.name}' is invalid`,
          type: "ERROR",
        });
      }
    }

    // Rule 3: Column name must be unique
    for (const table of context.tables.values()) {
      const usedColumnNames = new Set<string>();
      for (const column of table.columns.values()) {
        if (usedColumnNames.has(column.name.toLowerCase())) {
          context.addIssue({
            message: `Duplicate column '${column.name}' in table '${table.name}'`,
            type: "ERROR",
          });
        } else {
          usedColumnNames.add(column.name.toLowerCase());
        }
      }
    }

    // Rule 4: Each column must have correct type
    for (const table of context.tables.values()) {
      for (const column of table.columns.values()) {
        const uniqueTypes = new Set<string>(
          Object.keys(SUPPORTED_COLUMN_TYPES[context.type])
        );
        if (!uniqueTypes.has(column.type)) {
          context.addIssue({
            message: `Column '${column.name}' in table '${table.name}' has invalid type '${column.type}'`,
            type: "ERROR",
          });
        }
      }
    }

    // Rule 5: If default value exist, it must be valid
    for (const table of context.tables.values()) {
      for (const column of table.columns.values()) {
        if (
          column.defaultValue &&
          !SUPPORTED_COLUMN_TYPES[context.type][column.type].regexes.some(
            (regex) => regex.test(column.defaultValue!)
          )
        ) {
          context.addIssue({
            message: `Column '${column.name}' in table '${table.name}' has invalid default value '${column.defaultValue}'`,
            type: "ERROR",
          });
        }
      }
    }

    // WARNING
    // Rule 1: Each table must have at least one primary key
    for (const table of context.tables.values()) {
      let hasPrimaryKey = false;
      for (const column of table.columns.values()) {
        if (column.isPrimary) {
          hasPrimaryKey = true;
          break;
        }
      }
      if (!hasPrimaryKey) {
        context.addIssue({
          message: `Table '${table.name}' does not have a primary key`,
          type: "WARNING",
        });
      }
    }
    super.handle(context);
  }
}
