import { nanoid } from "nanoid";

export const POSTS = {
  id: nanoid(6),
  name: "posts",
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
      name: "user_id",
      type: "INTEGER",
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
    {
      id: nanoid(6),
      name: "title",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "content",
      type: "TEXT",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "created_at",
      type: "TIMESTAMP",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
  ],
};
