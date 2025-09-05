import { nanoid } from "nanoid";

export const CATEGORIES = {
  id: nanoid(6),
  name: "categories",
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
      type: "VARCHAR(100)",
      isPrimary: false,
      isUnique: true,
      isNullable: false,
    },
  ],
};
