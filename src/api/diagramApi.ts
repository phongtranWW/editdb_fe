import privateAxios from "./privateAxios";

export const getDiagrams = () => privateAxios.get("/diagrams");
export const deleteDiagram = (id: string) =>
  privateAxios.delete(`/diagrams/${id}`);
export const createDiagram = (payload: {
  name: string;
  description?: string;
}) => privateAxios.post("/diagrams", payload);
