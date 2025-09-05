import { nanoid } from "nanoid";

export const ORDERS = {
  id: nanoid(6),
  name: "orders",
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
      name: "date",
      type: "TIMESTAMP",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "customer_id",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "amount",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "status",
      type: "VARCHAR(50)",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "product_id",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
  ],
};
