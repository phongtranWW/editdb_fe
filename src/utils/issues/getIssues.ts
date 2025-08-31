import type { Issue } from "../../models/issue";
import type { Relationship } from "../../services/diagrams/dtos/relationship-dto";
import type { Table } from "../../services/diagrams/dtos/table-dto";
import type { DatabaseType } from "../../types/database-type";
import { RelationshipValidator } from "./handlers/relationship-validator";
import { TableValidator } from "./handlers/table-validator";
import { IssueContext } from "./issue-context";

export function getIssues(
  tables: Table[],
  relationships: Relationship[],
  type: DatabaseType
): Issue[] {
  const context = new IssueContext(tables, relationships, type);

  const validator = new TableValidator();
  validator.setNext(new RelationshipValidator());
  validator.handle(context);
  return context.getIssues();
}
