import { nanoid } from "nanoid";

export const TAGS = {
  id: nanoid(6),
  name: "tags",
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
