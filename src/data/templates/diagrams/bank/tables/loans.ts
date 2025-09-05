import { nanoid } from "nanoid";

export const LOANS = {
  id: nanoid(6),
  name: "loans",
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
      name: "amount",
      type: "DOUBLE PRECISION",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "rate",
      type: "DOUBLE PRECISION",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "term",
      type: "DATE",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "status",
      type: "VARCHAR(50)",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
