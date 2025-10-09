import type { ApiResponse } from "../base/api-response";
import type { Template } from "../../models/template";
import { TEMPLATES } from "../../data/templates/templates";
import type { Params } from "../base/params";
import { Sort } from "../../data/constants";

export const getTemplates = (params: Params): ApiResponse<Template> => {
  let result = [...TEMPLATES];

  if (params.search && params.search.trim() !== "") {
    const keyword = params.search.toLowerCase();
    result = result.filter((t) => t.name.toLowerCase().includes(keyword));
  }

  if (params.sort === Sort.ASC) {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (params.sort === Sort.DESC) {
    result.sort((a, b) => b.name.localeCompare(a.name));
  }

  const total = result.length;

  const start = (params.page - 1) * params.limit;
  const end = start + params.limit;
  result = result.slice(start, end);

  return {
    data: result,
    total,
  };
};
