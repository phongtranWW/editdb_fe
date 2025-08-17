import type { Column } from "./column";
import type { Position } from "./position";

export interface Table {
  id: string;
  name: string;
  position: Position;
  columns: Column[];
}
