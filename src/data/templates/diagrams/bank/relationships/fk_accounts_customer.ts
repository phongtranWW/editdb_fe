import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { ACCOUNTS } from "../tables/accounts";
import { CUSTOMERS } from "../tables/customers";
import { Relationship } from "../../../../constants";

export const FK_ACCOUNTS_CUSTOMER: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_accounts_customer",
  fromTable: ACCOUNTS.id,
  fromColumn: ACCOUNTS.columns[1].id,
  toTable: CUSTOMERS.id,
  toColumn: CUSTOMERS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
