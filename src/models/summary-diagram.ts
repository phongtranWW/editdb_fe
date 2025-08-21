export interface SummaryDiagram {
  id: string;
  name: string;
  description?: string;
  visibility: "PUBLIC" | "PRIVATE" | "SHARED";
  author?: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}
