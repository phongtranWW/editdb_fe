import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const COURSES: DiagramTable = {
  id: nanoid(6),
  name: "courses",
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
      name: "title",
      type: "VARCHAR",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "description",
      type: "TEXT",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
      isAutoIncrement: false,
    },
  ],
};
