import { useCallback, useEffect, useState } from "react";
import type { Template } from "../models/template";
import type { ApiResponse } from "../api/base/api-response";
import type { Params } from "../api/base/params";
import { Sort } from "../data/constants";
import { getTemplates } from "../api/templates/templateApi";

export const useTemplates = () => {
  const [data, setData] = useState<ApiResponse<Template>>({
    data: [],
    total: 0,
  });
  const [params, setParams] = useState<Params>({
    page: 1,
    limit: 8,
    sort: Sort.ASC,
  });

  const fetchTemplates = useCallback(() => {
    const response = getTemplates(params);
    setData(response);
  }, [params]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return {
    data,
    params,
    setParams,
  };
};
