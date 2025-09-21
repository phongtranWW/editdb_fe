import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const PASSWORD_RESETS: DiagramTable = {
  id: nanoid(6),
  name: "password_resets",
  columns: [
    {
      id: nanoid(6),
      name: "email",
      type: "VARCHAR",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "token",
      type: "VARCHAR",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "created_at",
      type: "TIMESTAMP",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
      isAutoIncrement: false,
    },
  ],
};
