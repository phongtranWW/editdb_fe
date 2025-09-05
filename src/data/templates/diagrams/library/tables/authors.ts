import { nanoid } from "nanoid";

export const AUTHORS = {
  id: nanoid(6),
  name: "authors",
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
      name: "birthday",
      type: "DATE",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "nationality",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
