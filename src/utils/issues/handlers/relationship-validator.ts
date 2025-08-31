import type { IssueContext } from "../issue-context";
import { BaseIssueHandler } from "./base-issue-handler";

export class RelationshipValidator extends BaseIssueHandler {
  handle(context: IssueContext): void {
    // Rule 1: Name must be unique
    const usedRelationshipNames = new Set<string>();
    for (const relationship of context.relationships.values()) {
      if (usedRelationshipNames.has(relationship.name.toLowerCase())) {
        context.addIssue({
          message: `Relationship name '${relationship.name}' is already used`,
          type: "ERROR",
        });
      } else {
        usedRelationshipNames.add(relationship.name.toLowerCase());
      }
    }

    // Rule 2: Regex
    const regex = /^[A-Za-z][A-Za-z0-9_]{0,63}$/;
    for (const relationship of context.relationships.values()) {
      if (!regex.test(relationship.name)) {
        context.addIssue({
          message: `Relationship name '${relationship.name}' is invalid`,
          type: "ERROR",
        });
      }
    }

    // Rule 3: Tables must exist
    for (const relationship of context.relationships.values()) {
      const fromTable = context.tables.get(relationship.fromTable || "");
      const toTable = context.tables.get(relationship.toTable || "");
      if (!fromTable || !toTable) {
        context.addIssue({
          message: `Table(s) does not exist in relationship '${relationship.name}'`,
          type: "ERROR",
        });
      }

      const fromColumn = fromTable?.columns.get(relationship.fromColumn || "");
      const toColumn = toTable?.columns.get(relationship.toColumn || "");
      if (!fromColumn || !toColumn) {
        context.addIssue({
          message: `Column(s) does not exist in relationship '${relationship.name}'`,
          type: "ERROR",
        });
      }
    }

    // Rule 4: Each pair of columns must have same type
    for (const relationship of context.relationships.values()) {
      const fromColumn = context.tables
        .get(relationship.fromTable || "")
        ?.columns.get(relationship.fromColumn || "");
      const toColumn = context.tables
        .get(relationship.toTable || "")
        ?.columns.get(relationship.toColumn || "");
      if (fromColumn?.type !== toColumn?.type) {
        context.addIssue({
          message: `Column types do not match in relationship '${relationship.name}'`,
          type: "ERROR",
        });
      }
    }
    super.handle(context);
  }
}
