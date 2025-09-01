import privateAxios from "../privateAxios";
import type { ApiResponse } from "../base/api-response";
import type { SummaryDiagramDto } from "./dtos/summary-diagram-dto";
import type { UpdateDiagramDto } from "./dtos/update-diagram-dto";
import type { DiagramDto } from "./dtos/diagram-dto";
import type { CreateDiagramDto } from "./dtos/create-diagram-dto";

export const getSummaryDiagrams = (): Promise<ApiResponse<SummaryDiagramDto>> =>
  privateAxios.get("/diagrams");
export const deleteDiagram = (id: string) =>
  privateAxios.delete(`/diagrams/${id}`);

export const updateDiagram = (
  id: string,
  dto: UpdateDiagramDto
): Promise<DiagramDto> => privateAxios.put(`/diagrams/${id}`, dto);

export const getDiagram = async (id: string): Promise<DiagramDto> => {
  const response = await privateAxios.get(`/diagrams/${id}`);
  return response.data;
};
export const createDiagram = (dto: CreateDiagramDto): Promise<DiagramDto> =>
  privateAxios.post("/diagrams", dto);
