import { nanoid } from "nanoid";

export const TRANSACTIONS = {
  id: nanoid(6),
  name: "transactions",
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
      name: "account_id",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "time",
      type: "TIMESTAMP",
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
      type: "NUMERIC",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
