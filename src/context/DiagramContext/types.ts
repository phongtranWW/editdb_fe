import type { Patch } from "immer";
import type { Diagram } from "../../models/diagram";
import type { DiagramColumn } from "../../models/diagram-column";
import type { DiagramRelationship } from "../../models/diagram-relationship";
import type { DiagramTable } from "../../models/diagram-table";
import type { DatabaseType } from "../../types/database-type";
import type { Issue } from "../../models/issue";

interface HisotyEntry {
  patches: Patch[];
  inversePatches: Patch[];
}

export interface DiagramState {
  data: Diagram;
  issues: Issue[];
  undo: HisotyEntry[];
  redo: HisotyEntry[];
  originalData?: Diagram;
}

export type DiagramAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_TYPE"; payload: DatabaseType }
  | { type: "SET_DIAGRAM"; payload: Diagram }
  | { type: "ADD_TABLE"; payload: DiagramTable }
  | { type: "DELETE_TABLE"; payload: string }
  | {
      type: "UPDATE_TABLE";
      payload: { id: string; partialTable: Partial<DiagramTable> };
    }
  | { type: "ADD_COLUMN"; payload: { id: string; column: DiagramColumn } }
  | { type: "DELETE_COLUMN"; payload: { id: string; columnId: string } }
  | {
      type: "UPDATE_COLUMN";
      payload: {
        id: string;
        columnId: string;
        partialColumn: Partial<DiagramColumn>;
      };
    }
  | { type: "ADD_RELATIONSHIP"; payload: DiagramRelationship }
  | { type: "DELETE_RELATIONSHIP"; payload: string }
  | {
      type: "UPDATE_RELATIONSHIP";
      payload: {
        id: string;
        partialRelationship: Partial<DiagramRelationship>;
      };
    }
  | {
      type: "DUPLICATE_SELECTION";
      payload: { tableIds: string[]; relationshipIds: string[] };
    }
  | {
      type: "DELETE_SELECTION";
      payload: { tableIds: string[]; relationshipIds: string[] };
    }
  | { type: "CLEAR" }
  | { type: "RESET" }
  | { type: "UNDO" }
  | { type: "REDO" };

export interface DiagramContextValue {
  state: DiagramState;
  dispatch: React.Dispatch<DiagramAction>;
}
