import { useCallback, useEffect, useState } from "react";
import type { Params } from "../api/base/params";
import type { SummaryDiagramDto } from "../api/diagrams/dtos/summary-diagram-dto";
import {
  getSummaryDiagrams,
  deleteDiagram as deleteDiagramApi,
  createDiagram,
} from "../api/diagrams/diagramApi";
import type { ApiResponse } from "../api/base/api-response";
import { handleApiError } from "../utils/handleApiError";
import { useMessage } from "./useMessage";
import type { CreateDiagramDto } from "../api/diagrams/dtos/create-diagram-dto";

export const useSummaryDiagrams = () => {
  const { error } = useMessage();
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<Params>({
    page: 1,
    limit: 5,
  });
  const [data, setData] = useState<ApiResponse<SummaryDiagramDto>>({
    data: [],
    total: 0,
  });

  const fetchSummaryDiagrams = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getSummaryDiagrams(params);
      setData(response);
    } catch (err: unknown) {
      error(handleApiError(err, "Diagrams"));
    } finally {
      setLoading(false);
    }
  }, [params, error]);

  const createSDiagram = useCallback(
    async (dto: CreateDiagramDto) => {
      setLoading(true);
      try {
        await createDiagram(dto);
        await fetchSummaryDiagrams();
      } catch (err: unknown) {
        error(handleApiError(err, "Diagrams"));
      } finally {
        setLoading(false);
      }
    },
    [fetchSummaryDiagrams, error]
  );

  const deleteSDiagram = useCallback(
    async (id: string): Promise<void> => {
      setLoading(true);
      try {
        await deleteDiagramApi(id);
        await fetchSummaryDiagrams();
      } catch (err: unknown) {
        error(handleApiError(err, "Diagrams"));
      } finally {
        setLoading(false);
      }
    },
    [fetchSummaryDiagrams, error]
  );

  useEffect(() => {
    fetchSummaryDiagrams();
  }, [fetchSummaryDiagrams]);

  return {
    loading,
    error,
    params,
    setParams,
    data,
    deleteSDiagram,
    createSDiagram,
  };
};
