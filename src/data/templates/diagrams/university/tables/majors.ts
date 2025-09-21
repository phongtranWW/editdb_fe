import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const MAJORS: DiagramTable = {
  id: nanoid(6),
  name: "major",
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
  ],
};
