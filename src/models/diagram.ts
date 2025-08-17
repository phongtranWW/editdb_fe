import type { Relationship } from "./relationship";
import type { Table } from "./table";

export interface Diagram {
  id: string;
  name: string;
  description?: string;
  tables: Table[];
  relationships: Relationship[];
  visibility: "PUBLIC" | "PRIVATE" | "SHARED";
  createdAt: string;
  updatedAt: string;
}
