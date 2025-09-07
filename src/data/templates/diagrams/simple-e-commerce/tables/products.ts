import { nanoid } from "nanoid";

export const PRODUCTS = {
  id: nanoid(6),
  name: "products",
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
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "description",
      type: "TEXT",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "price",
      type: "NUMERIC",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "category_id",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
