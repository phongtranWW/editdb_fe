import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const POST_TAGS: DiagramTable = {
  id: nanoid(6),
  name: "post_tags",
  columns: [
    {
      id: nanoid(6),
      name: "id",
      type: "INT",
      isPrimary: true,
      isUnique: true,
      isNullable: false,
      isAutoIncrement: true,
    },
    {
      id: nanoid(6),
      name: "post_id",
      type: "INT",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "tag_id",
      type: "INT",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
  ],
};
