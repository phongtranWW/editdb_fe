import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const MIGRATIONS: DiagramTable = {
  id: nanoid(6),
  name: "migrations",
  columns: [
    {
      id: nanoid(6),
      name: "id",
      type: "INT",
      isPrimary: true,
      isUnique: true,
      isNullable: false,
      isAutoIncrement: true,
    },
    {
      id: nanoid(6),
      name: "migration",
      type: "VARCHAR",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "batch",
      type: "INT",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
  ],
};
