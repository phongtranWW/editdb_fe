import { nanoid } from "nanoid";

export const INVESTMENTS = {
  id: nanoid(6),
  name: "investments",
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
      name: "customer_id",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "type",
      type: "VARCHAR(50)",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "amount",
      type: "DOUBLE PRECISION",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "date",
      type: "DATE",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "current_val",
      type: "DOUBLE PRECISION",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
