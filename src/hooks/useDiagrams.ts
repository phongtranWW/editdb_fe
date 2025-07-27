import { useEffect, useState } from "react";
import type { DiagramDto } from "../models/dtos/diagram-dto";
import { diagramService } from "../services/diagramService";

export const useUserDiagrams = () => {
  const [diagrams, setDiagrams] = useState<DiagramDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDiagrams = async () => {
    try {
      setIsLoading(true);
      const data = await diagramService.getDiagrams();
      setDiagrams(data);
      setError(null);
    } catch (err: unknown) {
      console.error("Failed to fetch diagrams:", err);
      setError("Failed to load diagrams.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDiagram = async (id: string) => {
    try {
      await diagramService.deleteDiagram(id);
      setDiagrams((prev) => prev.filter((d) => d.id !== id));
      setError(null);
    } catch (err: unknown) {
      console.error("Failed to delete diagram:", err);
      setError("Failed to delete diagram.");
    }
  };

  const createDiagram = async (payload: {
    name: string;
    description?: string;
  }) => {
    try {
      const newDiagram = await diagramService.createDiagram(payload);
      setDiagrams((prev) => [...prev, newDiagram]);
      setError(null);
    } catch (err: unknown) {
      console.error("Failed to create diagram:", err);
      setError("Failed to create diagram.");
    }
  };

  useEffect(() => {
    fetchDiagrams();
  }, []);

  return {
    diagrams,
    isLoading,
    error,
    fetchDiagrams,
    deleteDiagram,
    createDiagram,
  };
};
