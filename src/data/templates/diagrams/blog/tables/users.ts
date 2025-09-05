import { nanoid } from "nanoid";

export const USERS = {
  id: nanoid(6),
  name: "users",
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
      name: "username",
      type: "VARCHAR(50)",
      isPrimary: false,
      isUnique: true,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "email",
      type: "VARCHAR(100)",
      isPrimary: false,
      isUnique: true,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "password",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "created_at",
      type: "TIMESTAMP",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
  ],
};
