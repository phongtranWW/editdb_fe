import { useCallback, useEffect, useState } from "react";
import type { Params } from "../api/base/params";
import type { SummaryDiagramDto } from "../api/diagrams/dtos/summary-diagram-dto";
import {
  getSummaryDiagrams,
  deleteDiagram as deleteDiagramApi,
  createDiagram,
} from "../api/diagrams/diagramApi";
import type { ApiResponse } from "../api/base/api-response";
import type { DatabaseType } from "../types/database-type";

export const useSummaryDiagrams = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Error loading summary diagrams");
    } finally {
      setLoading(false);
    }
  }, [params]);

  const createSDiagram = useCallback(
    async (payload: { name: string; type: DatabaseType }) => {
      setLoading(true);
      try {
        await createDiagram({ ...payload, tables: [], relationships: [] });
        await fetchSummaryDiagrams();
        setError(null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Error creating diagram");
      } finally {
        setLoading(false);
      }
    },
    [fetchSummaryDiagrams]
  );

  const deleteSDiagram = useCallback(
    async (id: string): Promise<void> => {
      setLoading(true);
      try {
        await deleteDiagramApi(id);
        await fetchSummaryDiagrams();
        setError(null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Error deleting diagram");
      } finally {
        setLoading(false);
      }
    },
    [fetchSummaryDiagrams]
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
