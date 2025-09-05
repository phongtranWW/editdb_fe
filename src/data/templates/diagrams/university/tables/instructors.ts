import { nanoid } from "nanoid";

export const INSTRUCTORS = {
  id: nanoid(6),
  name: "instructors",
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
      name: "first_name",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "last_name",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "email",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: true,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "dep_id",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
