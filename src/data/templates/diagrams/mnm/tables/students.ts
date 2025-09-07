import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const STUDENTS: DiagramTable = {
  id: nanoid(6),
  name: "students",
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
      name: "name",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "email",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: true,
      isNullable: false,
    },
  ],
};
