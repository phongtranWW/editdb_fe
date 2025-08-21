import type { Relationship } from "../models/relationship";
import type { Table } from "../models/table";
import privateAxios from "./privateAxios";
import publicAxios from "./publicAxios";

// Public
export const getPublicSummaryDiagrams = (params: {
  page?: number;
  limit?: number;
  search?: string;
  sort?: "asc" | "desc";
}) => publicAxios.get("/public/diagrams", { params });

export const getPublicDiagram = (id: string) =>
  publicAxios.get(`/public/diagrams/${id}`);

// Private
export const getSummaryDiagrams = () => privateAxios.get("/diagrams");
export const deleteDiagram = (id: string) =>
  privateAxios.delete(`/diagrams/${id}`);
export const createDiagram = (payload: {
  name: string;
  description?: string;
  visibility?: "PUBLIC" | "PRIVATE" | "SHARED";
}) => privateAxios.post("/diagrams", payload);

export const updateDiagram = (
  id: string,
  payload: {
    name: string;
    description?: string;
    tables: Table[];
    relationships: Relationship[];
  }
) => privateAxios.put(`/diagrams/${id}`, payload);

export const updateShareStatus = (
  id: string,
  payload: { visibility: "PUBLIC" | "PRIVATE" | "SHARED" }
) => privateAxios.patch(`/diagrams/${id}/share`, payload);

export const getDiagram = (id: string) => privateAxios.get(`/diagrams/${id}`);
