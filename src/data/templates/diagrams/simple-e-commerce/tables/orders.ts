import { nanoid } from "nanoid";
import type { DiagramTable } from "../../../../../models/diagram-table";

export const ORDERS: DiagramTable = {
  id: nanoid(6),
  name: "orders",
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
      name: "date",
      type: "TIMESTAMP",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
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
      name: "amount",
      type: "INT",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "status",
      type: "VARCHAR",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
    {
      id: nanoid(6),
      name: "product_id",
      type: "INTEGER",
      isPrimary: false,
      isUnique: false,
      isNullable: false,
      isAutoIncrement: false,
    },
  ],
};
