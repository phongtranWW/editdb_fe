import { nanoid } from "nanoid";

export const COURSES = {
  id: nanoid(6),
  name: "courses",
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
    {
      id: nanoid(6),
      name: "credits",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
