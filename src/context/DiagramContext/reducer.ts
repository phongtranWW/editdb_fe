import { nanoid } from "nanoid";
import type { DiagramAction, DiagramState } from "./types";
import {
  applyPatches,
  enablePatches,
  produce,
  produceWithPatches,
} from "immer";
enablePatches();

export const initialDiagramState: DiagramState = {
  data: {
    id: "",
    type: "",
    name: "",
    tables: [],
    relationships: [],
  },
  undo: [],
  redo: [],
};

export const diagramReducer = (
  state: DiagramState,
  action: DiagramAction
): DiagramState => {
  const [nextState, patches, inversePatches] = produceWithPatches(
    state.data,
    (draft) => {
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

        case "DUPLICATE_SELECTION": {
          const { tableIds, relationshipIds } = action.payload;

          const tableIdMap = new Map<string, string>();
          for (const id of tableIds) {
            tableIdMap.set(id, nanoid(6));
          }

          const copiedTables = draft.tables
            .filter((t) => tableIds.includes(t.id))
            .map((t) => {
              const newId = tableIdMap.get(t.id)!;
              return { ...t, id: newId, name: `${t.name}_copy` };
            });

          const copiedRelationships = draft.relationships
            .filter((r) => relationshipIds.includes(r.id))
            .map((r) => ({
              ...r,
              id: nanoid(6),
              name: `${r.name}_copy`,
              fromTable: r.fromTable ? tableIdMap.get(r.fromTable)! : undefined,
              toTable: r.toTable ? tableIdMap.get(r.toTable)! : undefined,
            }));

          draft.tables.push(...copiedTables);
          draft.relationships.push(...copiedRelationships);
          break;
        }

        case "DELETE_SELECTION": {
          const { tableIds, relationshipIds } = action.payload;
          draft.tables = draft.tables.filter((t) => !tableIds.includes(t.id));
          draft.relationships = draft.relationships.filter(
            (r) => !relationshipIds.includes(r.id)
          );
          break;
        }
      }
    }
  );

  switch (action.type) {
    case "SET_DIAGRAM":
      state = produce(state, (draft) => {
        draft.data = nextState;
        draft.undo = [];
        draft.redo = [];
      });
      break;

    case "UNDO": {
      if (state.undo.length > 0) {
        state = produce(state, (draft) => {
          const enty = draft.undo.pop()!;
          draft.data = applyPatches(draft.data, enty.inversePatches);
          draft.redo.push(enty);
        });
      }
      break;
    }

    case "REDO": {
      if (state.redo.length > 0) {
        console.log("redo", state.redo);
        state = produce(state, (draft) => {
          const enty = draft.redo.pop()!;
          draft.data = applyPatches(draft.data, enty.patches);
          draft.undo.push(enty);
        });
      }
      break;
    }

    default:
      state = produce(state, (draft) => {
        draft.data = nextState;
        draft.undo.push({ patches, inversePatches });
        draft.redo = [];
      });
      break;
  }
  return state;
};
