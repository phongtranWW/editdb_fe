export interface SummaryDiagram {
  id: string;
  name: string;
  description?: string;
  visibility: "PUBLIC" | "PRIVATE" | "SHARED";
  createdAt: string;
  updatedAt: string;
}
