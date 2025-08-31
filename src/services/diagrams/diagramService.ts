import {
  createDiagram,
  deleteDiagram,
  getDiagram,
  getPublicDiagram,
  getPublicSummaryDiagrams,
  getSummaryDiagrams,
  updateDiagram,
  updateShareStatus,
} from "../../api/diagramApi";
import type { ApiResponse } from "./base/api-response";
import type { DiagramDto } from "./dtos/diagram-dto";
import type { RelationshipDto } from "./dtos/relationship-dto";
import type { SummaryDiagramDto } from "./dtos/summary-diagram-dto";
import type { TableDto } from "./dtos/table-dto";

export const diagramService = {
  // Public
  async getPublicSummaryDiagrams(params: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: "asc" | "desc";
  }): Promise<ApiResponse<SummaryDiagramDto>> {
    const response = await getPublicSummaryDiagrams(params);
    return response.data;
  },

  async getPublicDiagram(id: string): Promise<DiagramDto> {
    const response = await getPublicDiagram(id);
    return response.data;
  },

  // Private
  async getDiagrams(): Promise<ApiResponse<SummaryDiagramDto>> {
    const response = await getSummaryDiagrams();
    return response.data;
  },
  async deleteDiagram(id: string) {
    await deleteDiagram(id);
  },

  async createDiagram(payload: {
    name: string;
    description?: string;
    visibility?: "PUBLIC" | "PRIVATE" | "SHARED";
  }) {
    const response = await createDiagram(payload);
    return response.data;
  },

  async updateDiagram(
    id: string,
    payload: {
      name: string;
      description?: string;
      tables: TableDto[];
      relationships: RelationshipDto[];
    }
  ) {
    const response = await updateDiagram(id, payload);
    return response.data;
  },

  async updateShareStatus(
    id: string,
    payload: { visibility: "PUBLIC" | "PRIVATE" | "SHARED" }
  ) {
    const response = await updateShareStatus(id, payload);
    return response.data;
  },

  async getDiagram(id: string): Promise<DiagramDto> {
    const response = await getDiagram(id);
    return response.data;
  },
};
