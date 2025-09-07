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

    // Rule 5: Detect Cycles (stack-based DFS)
    const adjacency = new Map<string, string[]>();
    for (const r of context.relationships.values()) {
      if (!r.fromTable || !r.toTable) continue;
      if (!adjacency.has(r.fromTable)) adjacency.set(r.fromTable, []);
      adjacency.get(r.fromTable)!.push(r.toTable);
    }

    const visited = new Set<string>();
    const inStack = new Set<string>();

    for (const node of adjacency.keys()) {
      if (visited.has(node)) continue;

      const stack: { table: string; index: number }[] = [];
      stack.push({ table: node, index: 0 });

      while (stack.length > 0) {
        const top = stack[stack.length - 1];
        const { table, index } = top;

        if (!visited.has(table)) {
          visited.add(table);
          inStack.add(table);
        }

        const neighbors = adjacency.get(table) || [];
        if (index < neighbors.length) {
          // update current index
          top.index++;
          const next = neighbors[index];
          if (!visited.has(next)) {
            stack.push({ table: next, index: 0 });
          } else if (inStack.has(next)) {
            context.addIssue({
              message: `Cycle detected involving table '${next}'`,
              type: "ERROR",
            });
          }
        } else {
          // backtrack
          inStack.delete(table);
          stack.pop();
        }
      }
    }

    // Rule 6: Duplicate relationships
    const seen = new Map<string, string>();
    for (const r of context.relationships.values()) {
      if (!r.fromTable || !r.toTable) continue;

      const key = `${r.fromTable}:${r.fromColumn}->${r.toTable}:${r.toColumn}(${r.type})`;
      if (seen.has(key)) {
        context.addIssue({
          message: `Duplicate relationship '${r.name}' (same as '${seen.get(
            key
          )}')`,
          type: "ERROR",
        });
      } else {
        seen.set(key, r.name);
      }
    }
    super.handle(context);
  }
}
