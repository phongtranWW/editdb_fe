import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const EASY_THUMBNAILS_DIMENSIONS: DiagramTable = {
  id: nanoid(6),
  name: "easy_thumbnails_dimensions",
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
      name: "thumbnail_id",
      type: "INT",
      isPrimary: false,
      isUnique: true,
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "width",
      type: "INT",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "height",
      type: "INT",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
      isAutoIncrement: false,
    },
  ],
};
