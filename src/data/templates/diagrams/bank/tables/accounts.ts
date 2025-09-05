import { nanoid } from "nanoid";

export const ACCOUNTS = {
  id: nanoid(6),
  name: "accounts",
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
      name: "number",
      type: "BIGINT",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "balance",
      type: "FLOAT",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
