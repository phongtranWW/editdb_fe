import { nanoid } from "nanoid";
import { TRANSACTIONS } from "../tables/transactions";
import { ACCOUNTS } from "../tables/accounts";
import { Relationship } from "../../../../constants";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_TRANSACTIONS_ACCOUNT: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_transactions_account",
  fromTable: TRANSACTIONS.id,
  fromColumn: TRANSACTIONS.columns[1].id,
  toTable: ACCOUNTS.id,
  toColumn: ACCOUNTS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
