import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { ORDERS } from "../tables/orders";
import { PRODUCTS } from "../tables/products";
import { Relationship } from "../../../../constants";

export const FK_ORDER_PRODUCT: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_order_product",
  fromTable: ORDERS.id,
  fromColumn: ORDERS.columns[5].id,
  toTable: PRODUCTS.id,
  toColumn: PRODUCTS.columns[0].id,
  type: Relationship.ONE_TO_ONE,
};
