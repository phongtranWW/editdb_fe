import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { TRANSFERS } from "../tables/transfers";
import { ACCOUNTS } from "../tables/accounts";
import { Relationship } from "../../../../constants";

export const FK_TRANSFERS_TO: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_transfers_to",
  fromTable: TRANSFERS.id,
  fromColumn: TRANSFERS.columns[2].id,
  toTable: ACCOUNTS.id,
  toColumn: ACCOUNTS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
