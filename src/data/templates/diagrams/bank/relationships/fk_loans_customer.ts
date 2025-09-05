import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { LOANS } from "../tables/loans";
import { CUSTOMERS } from "../tables/customers";
import { Relationship } from "../../../../constants";

export const FK_LOANS_CUSTOMER: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_loans_customer",
  fromTable: LOANS.id,
  fromColumn: LOANS.columns[1].id,
  toTable: CUSTOMERS.id,
  toColumn: CUSTOMERS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
