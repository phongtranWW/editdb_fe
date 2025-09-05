import { nanoid } from "nanoid";

export const POST_TAGS = {
  id: nanoid(6),
  name: "post_tags",
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
      name: "post_id",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "tag_id",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
  ],
};
