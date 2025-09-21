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
      name: "name",
      type: "VARCHAR",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "dep_id",
      type: "INT",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "credits",
      type: "INT",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
      isAutoIncrement: false,
    },
  ],
};
