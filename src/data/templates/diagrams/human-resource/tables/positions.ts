import { nanoid } from "nanoid";

export const POSITIONS = {
  id: nanoid(6),
  name: "positions",
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
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "salary",
      type: "DOUBLE PRECISION",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
