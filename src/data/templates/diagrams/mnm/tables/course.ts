import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const COURSES: DiagramTable = {
  id: nanoid(6),
  name: "courses",
  columns: [
    {
      id: nanoid(6),
      name: "id",
      type: "INTEGER",
      isPrimary: true,
      isUnique: true,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "title",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "description",
      type: "TEXT",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
