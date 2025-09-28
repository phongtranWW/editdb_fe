import type { DiagramColumn } from "../../models/diagram-column";
import type { DiagramRelationship } from "../../models/diagram-relationship";
import type { DiagramTable } from "../../models/diagram-table";
import type { DatabaseType } from "../../types/database-type";

export interface DiagramState {
  id: string;
  type: DatabaseType;
  loading: boolean;
  name: string;
  tables: DiagramTable[];
  relationships: DiagramRelationship[];
}

export type DiagramAction =
  | { type: "SET_ID"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_TABLES"; payload: DiagramTable[] }
  | { type: "SET_RELATIONSHIPS"; payload: DiagramRelationship[] }
  | { type: "ADD_TABLE"; payload: DiagramTable }
  | {
      type: "UPDATE_TABLE";
      payload: { id: string; partialTable: Partial<DiagramTable> };
    }
  | { type: "DELETE_TABLE"; payload: string }
  | { type: "ADD_COLUMN"; payload: { id: string; column: DiagramColumn } }
  | {
      type: "UPDATE_COLUMN";
      payload: {
        id: string;
        columnId: string;
        partialColumn: Partial<DiagramColumn>;
      };
    }
  | { type: "DELETE_COLUMN"; payload: { id: string; columnId: string } }
  | { type: "ADD_RELATIONSHIP"; payload: DiagramRelationship }
  | {
      type: "UPDATE_RELATIONSHIP";
      payload: {
        id: string;
        partialRelationship: Partial<DiagramRelationship>;
      };
    }
  | { type: "DELETE_RELATIONSHIP"; payload: string }
  | { type: "SET_TYPE"; payload: DatabaseType }
  | { type: "DUPLICATE_TABLE"; payload: string };

export interface DiagramContextValue {
  state: DiagramState;
  dispatch: React.Dispatch<DiagramAction>;
}
