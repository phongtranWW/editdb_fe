import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const PROJECTS: DiagramTable = {
  id: nanoid(6),
  name: "projects",
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
      name: "description",
      type: "TEXT",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "start_date",
      type: "DATE",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "end_date",
      type: "DATE",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
      isAutoIncrement: false,
    },
  ],
};
