import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { CARDS } from "../tables/cards";
import { CUSTOMERS } from "../tables/customers";
import { Relationship } from "../../../../constants";

export const FK_CARDS_CUSTOMER: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_cards_customer",
  fromTable: CARDS.id,
  fromColumn: CARDS.columns[2].id,
  toTable: CUSTOMERS.id,
  toColumn: CUSTOMERS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
