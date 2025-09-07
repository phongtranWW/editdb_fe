import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const ENROLLMENTS: DiagramTable = {
  id: nanoid(6),
  name: "enrollments",
  columns: [
    {
      id: nanoid(6),
      name: "student_id",
      type: "INTEGER",
      isPrimary: true,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "course_id",
      type: "INTEGER",
      isPrimary: true,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "enrolled_at",
      type: "TIMESTAMP",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
