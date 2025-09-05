import { nanoid } from "nanoid";

export const RESERVATIONS = {
  id: nanoid(6),
  name: "reservations",
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
      name: "book_id",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "patron_id",
      type: "INTEGER",
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
      name: "email",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
