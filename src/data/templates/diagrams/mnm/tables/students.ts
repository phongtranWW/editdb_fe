import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const STUDENTS: DiagramTable = {
  id: nanoid(6),
  name: "students",
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
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "email",
      type: "VARCHAR",
      isPrimary: false,
      isUnique: true,
      isNullable: false,
      isAutoIncrement: false,
    },
  ],
};
