import { nanoid } from "nanoid";
import { INVESTMENTS } from "../tables/inverstments";
import { CUSTOMERS } from "../tables/customers";
import { Relationship } from "../../../../constants";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_INVESTMENTS_CUSTOMER: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_investments_customer",
  fromTable: INVESTMENTS.id,
  fromColumn: INVESTMENTS.columns[1].id,
  toTable: CUSTOMERS.id,
  toColumn: CUSTOMERS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
