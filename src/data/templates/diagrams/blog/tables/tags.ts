import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const TAGS: DiagramTable = {
  id: nanoid(6),
  name: "tags",
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
      name: "name",
      type: "VARCHAR",
      isPrimary: false,
      isUnique: true,
      isNullable: false,
      isAutoIncrement: false,
    },
  ],
};
