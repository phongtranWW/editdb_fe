import type { DiagramColumn } from "./diagram-column";

export interface DiagramTable {
  id: string;
  name: string;
  columns: DiagramColumn[];
}
