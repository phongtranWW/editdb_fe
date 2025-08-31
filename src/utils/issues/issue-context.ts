import type { DiagramRelationship } from "../../models/diagram-relationship";
import type { DiagramTable } from "../../models/diagram-table";
import type { Issue } from "../../models/issue";
import type { DatabaseType } from "../../types/database-type";

export class IssueContext {
  issues: Issue[] = [];
  tables: Map<
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
  relationships: Map<
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
  type: DatabaseType;

  constructor(
    tables: DiagramTable[],
    relationships: DiagramRelationship[],
    type: DatabaseType
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
    this.type = type;
  }

  addIssue(issue: Issue) {
    this.issues.push(issue);
  }

  getIssues() {
    return this.issues;
  }
}
