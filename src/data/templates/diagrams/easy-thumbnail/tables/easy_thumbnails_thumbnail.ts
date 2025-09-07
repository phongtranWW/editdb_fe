import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const EASY_THUMBNAILS_THUMBNAIL: DiagramTable = {
  id: nanoid(6),
  name: "easy_thumbnails_thumbnail",
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
      name: "storage_hash",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "name",
      type: "VARCHAR(255)",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "modified",
      type: "TIMESTAMP",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "source_id",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
    },
  ],
};
