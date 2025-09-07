import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const API_KEYS: DiagramTable = {
  id: nanoid(6),
  name: "api_keys",
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
      name: "name",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "key",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: true,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "user_id",
      type: "INT",
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
