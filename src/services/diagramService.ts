import {
  createDiagram,
  deleteDiagram,
  getDiagram,
  getPublicDiagram,
  getPublicSummaryDiagrams,
  getSummaryDiagrams,
  updateDiagram,
  updateShareStatus,
} from "../api/diagramApi";
import type { Diagram } from "../models/diagram";
import type { Relationship } from "../models/relationship";
import type { SummaryDiagram } from "../models/summary-diagram";
import type { Table } from "../models/table";

export const diagramService = {
  // Public
  async getPublicSummaryDiagrams(): Promise<SummaryDiagram[]> {
    const response = await getPublicSummaryDiagrams();
    return response.data;
  },

  async getPublicDiagram(id: string): Promise<Diagram> {
    const response = await getPublicDiagram(id);
    return response.data;
  },

  // Private
  async getDiagrams(): Promise<SummaryDiagram[]> {
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
      tables: Table[];
      relationships: Relationship[];
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

  async getDiagramDetail(id: string) {
    const response = await getDiagram(id);
    return response.data;
  },
};
