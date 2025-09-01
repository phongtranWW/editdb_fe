import type { DiagramAction, DiagramState } from "./types";

export const initialDiagramState: DiagramState = {
  id: "",
  type: "",
  loading: false,
  name: "",
  tables: [],
  relationships: [],
};

export function diagramReducer(
  state: DiagramState,
  action: DiagramAction
): DiagramState {
  switch (action.type) {
    case "SET_ID":
      return { ...state, id: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_TABLES":
      return { ...state, tables: action.payload };
    case "SET_RELATIONSHIPS":
      return { ...state, relationships: action.payload };
    case "ADD_TABLE":
      return {
        ...state,
        tables: [...state.tables, action.payload],
      };
    case "UPDATE_TABLE":
      return {
        ...state,
        tables: state.tables.map((t) =>
          t.id === action.payload.id
            ? { ...t, ...action.payload.partialTable }
            : t
        ),
      };
    case "DELETE_TABLE":
      return {
        ...state,
        tables: state.tables.filter((t) => t.id !== action.payload),
      };
    case "ADD_COLUMN":
      return {
        ...state,
        tables: state.tables.map((t) =>
          t.id === action.payload.id
            ? { ...t, columns: [...t.columns, action.payload.column] }
            : t
        ),
      };
    case "UPDATE_COLUMN":
      return {
        ...state,
        tables: state.tables.map((t) =>
          t.id === action.payload.id
            ? {
                ...t,
                columns: t.columns.map((c) =>
                  c.id === action.payload.columnId
                    ? { ...c, ...action.payload.partialColumn }
                    : c
                ),
              }
            : t
        ),
      };
    case "DELETE_COLUMN":
      return {
        ...state,
        tables: state.tables.map((t) =>
          t.id === action.payload.id
            ? {
                ...t,
                columns: t.columns.filter(
                  (c) => c.id !== action.payload.columnId
                ),
              }
            : t
        ),
      };
    case "ADD_RELATIONSHIP":
      return {
        ...state,
        relationships: [...state.relationships, action.payload],
      };
    case "UPDATE_RELATIONSHIP":
      return {
        ...state,
        relationships: state.relationships.map((r) =>
          r.id === action.payload.id
            ? { ...r, ...action.payload.partialRelationship }
            : r
        ),
      };
    case "DELETE_RELATIONSHIP":
      return {
        ...state,
        relationships: state.relationships.filter(
          (r) => r.id !== action.payload
        ),
      };
    case "SET_TYPE":
      return { ...state, type: action.payload };
    default:
      return state;
  }
}
