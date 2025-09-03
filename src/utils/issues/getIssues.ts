import type { DiagramRelationship } from "../../models/diagram-relationship";
import type { DiagramTable } from "../../models/diagram-table";
import type { Issue } from "../../models/issue";
import type { DatabaseType } from "../../types/database-type";
import { RelationshipValidator } from "./handlers/relationship-validator";
import { TableValidator } from "./handlers/table-validator";
import { IssueContext } from "./issue-context";

export function getIssues(
  tables: DiagramTable[],
  relationships: DiagramRelationship[],
  type: DatabaseType
): Issue[] {
  const context = new IssueContext(tables, relationships, type);

  const validator = new TableValidator();
  validator.setNext(new RelationshipValidator());
  validator.handle(context);
  return context.getIssues();
}
