import { createDiagram, deleteDiagram, getDiagrams } from "../api/diagramApi";
import type { DiagramDto } from "../models/dtos/diagram-dto";

export const diagramService = {
  async getDiagrams(): Promise<DiagramDto[]> {
    const response = await getDiagrams();
    return response.data;
  },
  async deleteDiagram(id: string) {
    await deleteDiagram(id);
  },

  async createDiagram(payload: { name: string; description?: string }) {
    const response = await createDiagram(payload);
    return response.data;
  },
};
