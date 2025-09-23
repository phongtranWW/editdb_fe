import { EditorEdge } from "../components/UI/EditorEdge";
import EditorNode from "../components/UI/EditorNode";

export const Database = {
  POSTGRESQL: "POSTGRESQL",
  MYSQL: "MYSQL",
};

export const Relationship = {
  ONE_TO_ONE: "ONE_TO_ONE",
  ONE_TO_MANY: "ONE_TO_MANY",
  MANY_TO_ONE: "MANY_TO_ONE",
};

export const IssueType = {
  ERROR: "ERROR",
  WARNING: "WARNING",
};

export const Sort = {
  ASC: "asc",
  DESC: "desc",
};

export const Role = {
  USER: "user",
  ADMIN: "admin",
};

export const nodeTypes = {
  tableNode: EditorNode,
};

export const edgeTypes = {
  relationshipEdge: EditorEdge,
};

export const FUNCTION_REGEX = /^[a-zA-Z_][a-zA-Z0-9_]*(\s*\(.*\))$/;
