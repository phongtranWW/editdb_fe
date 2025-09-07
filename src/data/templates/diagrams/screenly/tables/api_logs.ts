import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const API_LOGS: DiagramTable = {
  id: nanoid(6),
  name: "api_log",
  columns: [
    {
      id: nanoid(6),
      name: "id",
      type: "INT",
      isPrimary: true,
      isUnique: true,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "user_id",
      type: "INT",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "api_key_id",
      type: "INT",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "images",
      type: "TEXT",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "created_at",
      type: "TIMESTAMP",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "updated_at",
      type: "TIMESTAMP",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
