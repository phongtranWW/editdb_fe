import { nanoid } from "nanoid";
import type { DiagramAction, DiagramState } from "./types";
import { produce } from "immer";

export const initialDiagramState: DiagramState = {
  id: "",
  type: "",
  name: "",
  tables: [],
  relationships: [],
};

export const diagramReducer = produce(
  (draft: DiagramState, action: DiagramAction) => {
    switch (action.type) {
      case "SET_DIAGRAM": {
        draft.id = action.payload.id;
        draft.type = action.payload.type;
        draft.name = action.payload.name;
        draft.tables = action.payload.tables;
        draft.relationships = action.payload.relationships;
        break;
      }

      case "SET_NAME": {
        draft.name = action.payload;
        break;
      }

      case "SET_TYPE": {
        draft.type = action.payload;
        break;
      }

      case "ADD_TABLE": {
        draft.tables.push(action.payload);
        break;
      }

      case "DELETE_TABLE": {
        const index = draft.tables.findIndex(
          (table) => table.id === action.payload
        );
        if (index !== -1) draft.tables.splice(index, 1);
        break;
      }

      case "UPDATE_TABLE": {
        const { id, partialTable } = action.payload;
        const table = draft.tables.find((t) => t.id === id);
        if (table) Object.assign(table, partialTable);
        break;
      }

      case "DUPLICATE_TABLE": {
        const table = draft.tables.find((t) => t.id === action.payload);
        if (table) draft.tables.push({ ...table, id: nanoid(6) });
        break;
      }

      case "ADD_RELATIONSHIP": {
        draft.relationships.push(action.payload);
        break;
      }

      case "DELETE_RELATIONSHIP": {
        const index = draft.relationships.findIndex(
          (r) => r.id === action.payload
        );
        if (index !== -1) draft.relationships.splice(index, 1);
        break;
      }

      case "UPDATE_RELATIONSHIP": {
        const { id, partialRelationship } = action.payload;
        const relationship = draft.relationships.find((r) => r.id === id);
        if (relationship) Object.assign(relationship, partialRelationship);
        break;
      }

      case "DUPLICATE_RELATIONSHIP": {
        const relationship = draft.relationships.find(
          (r) => r.id === action.payload
        );
        if (relationship)
          draft.relationships.push({ ...relationship, id: nanoid(6) });
        break;
      }

      case "ADD_COLUMN": {
        const { id, column } = action.payload;
        const table = draft.tables.find((t) => t.id === id);
        if (table) table.columns.push(column);
        break;
      }

      case "DELETE_COLUMN": {
        const { id, columnId } = action.payload;
        const table = draft.tables.find((t) => t.id === id);
        if (table) {
          const index = table.columns.findIndex((c) => c.id === columnId);
          if (index !== -1) table.columns.splice(index, 1);
        }
        break;
      }

      case "UPDATE_COLUMN": {
        const { id, columnId, partialColumn } = action.payload;
        const table = draft.tables.find((t) => t.id === id);
        if (table) {
          const column = table.columns.find((c) => c.id === columnId);
          if (column) Object.assign(column, partialColumn);
        }
        break;
      }
    }
  }
);
