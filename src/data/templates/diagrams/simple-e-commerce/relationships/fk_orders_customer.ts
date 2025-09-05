import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { ORDERS } from "../tables/orders";
import { CUSTOMERS } from "../tables/customer";
import { Relationship } from "../../../../constants";

export const FK_ORDERS_CUSTOMER: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_orders_customer",
  fromTable: ORDERS.id,
  fromColumn: ORDERS.columns[2].id,
  toTable: CUSTOMERS.id,
  toColumn: CUSTOMERS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
