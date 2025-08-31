import { useCallback, useEffect, useState } from "react";
import type { SummaryDiagram } from "../services/diagrams/dtos/summary-diagram-dto";
import { diagramService } from "../services/diagrams/diagramService";

export function useTemplates() {
  const [diagrams, setDiagrams] = useState<SummaryDiagram[]>([]);
  const [params, setParams] = useState<{
    page: number;
    limit: number;
    search: string;
    sort: "asc" | "desc";
  }>({
    page: 1,
    limit: 10,
    search: "",
    sort: "asc",
  });
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const updateParams = useCallback(
    (newParams: {
      page?: number;
      limit?: number;
      search?: string;
      sort?: "asc" | "desc";
    }) => {
      setParams((prev) => ({
        ...prev,
        ...newParams,
      }));
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const pagination = await diagramService.getPublicSummaryDiagrams(
          params
        );
        setDiagrams(pagination.data);
        setTotal(pagination.total);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  return {
    total,
    diagrams,
    params,
    loading,
    updateParams,
  };
}
