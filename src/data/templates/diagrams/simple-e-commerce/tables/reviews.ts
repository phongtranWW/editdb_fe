import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const REVIEWS: DiagramTable = {
  id: nanoid(6),
  name: "reviews",
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
      name: "customer_id",
      type: "INT",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "product_id",
      type: "INT",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "rating",
      type: "INT",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "content",
      type: "VARCHAR",
      isPrimary: false,
      isUnique: false,
      isNullable: true,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "date",
      type: "TIMESTAMP",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
  ],
};
