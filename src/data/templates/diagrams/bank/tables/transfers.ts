import { nanoid } from "nanoid";

export const TRANSFERS = {
  id: nanoid(6),
  name: "transfers",
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
      name: "from",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "to",
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
      name: "amount",
      type: "NUMERIC",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
