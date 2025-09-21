import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const USERS: DiagramTable = {
  id: nanoid(6),
  name: "users",
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
      name: "username",
      type: "VARCHAR",
      isPrimary: false,
      isUnique: true,
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
    {
      id: nanoid(6),
      name: "password",
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
      isNullable: false,
      isAutoIncrement: false,
    },
  ],
};
