import privateAxios from "../privateAxios";
import type { ApiResponse } from "../base/api-response";
import type { SummaryDiagramDto } from "./dtos/summary-diagram-dto";
import type { UpdateDiagramDto } from "./dtos/update-diagram-dto";
import type { DiagramDto } from "./dtos/diagram-dto";
import type { CreateDiagramDto } from "./dtos/create-diagram-dto";
import type { Params } from "../base/params";

export const getSummaryDiagrams = async (
  params: Params
): Promise<ApiResponse<SummaryDiagramDto>> => {
  const response = await privateAxios.get("/diagrams", { params });
  return response.data;
};
export const deleteDiagram = async (id: string): Promise<void> =>
  await privateAxios.delete(`/diagrams/${id}`);

export const updateDiagram = (
  id: string,
  dto: UpdateDiagramDto
): Promise<DiagramDto> => privateAxios.put(`/diagrams/${id}`, dto);

export const getDiagram = async (id: string): Promise<DiagramDto> => {
  const response = await privateAxios.get(`/diagrams/${id}`);
  return response.data;
};
export const createDiagram = async (
  dto: CreateDiagramDto
): Promise<DiagramDto> => {
  const response = await privateAxios.post("/diagrams", dto);
  return response.data;
};
