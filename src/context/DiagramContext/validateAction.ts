import type { DiagramAction } from "./types";

export function validateAction(action: DiagramAction): string | null {
  let message: string | null = null;

  switch (action.type) {
    case "UPDATE_TABLE":
      if (action.payload.partialTable.name?.trim() === "") {
        message = "Table name cannot be empty";
      }
      break;
    case "UPDATE_COLUMN":
      if (action.payload.partialColumn.name?.trim() === "") {
        message = "Column name cannot be empty";
      }
      break;
    case "UPDATE_RELATIONSHIP":
      if (action.payload.partialRelationship.name?.trim() === "") {
        message = "Relationship name cannot be empty";
      }
      break;
    default:
      break;
  }

  return message;
}
