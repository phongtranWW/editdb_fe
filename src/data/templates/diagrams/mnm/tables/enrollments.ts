import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const ENROLLMENTS: DiagramTable = {
  id: nanoid(6),
  name: "enrollments",
  columns: [
    {
      id: nanoid(6),
      name: "student_id",
      type: "INT",
      isPrimary: true,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "course_id",
      type: "INT",
      isPrimary: true,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "enrolled_at",
      type: "TIMESTAMP",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
      isAutoIncrement: false,
    },
  ],
};
