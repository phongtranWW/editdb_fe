import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const EASY_THUMBNAILS_DIMENSIONS: DiagramTable = {
  id: nanoid(6),
  name: "easy_thumbnails_dimensions",
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
      name: "thumbnail_id",
      type: "INTEGER",
      isPrimary: false,
      isUnique: true,
      isNullable: false,
    },
    {
      id: nanoid(6),
      name: "width",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
    {
      id: nanoid(6),
      name: "height",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
    },
  ],
};
