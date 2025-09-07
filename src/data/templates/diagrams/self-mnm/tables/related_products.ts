import { nanoid } from "nanoid";

export const RELATED_PRODUCTS = {
  id: nanoid(6),
  name: "related_products",
  columns: [
    {
      id: nanoid(6),
      name: "product_id",
      type: "INTEGER",
      isPrimary: true,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "related_id",
      type: "INTEGER",
      isPrimary: true,
      isUnique: false,
      isNullable: false,
    },
  ],
};
