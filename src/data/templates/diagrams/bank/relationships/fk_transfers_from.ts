import { nanoid } from "nanoid";
import { TRANSFERS } from "../tables/transfers";
import { ACCOUNTS } from "../tables/accounts";
import { Relationship } from "../../../../constants";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_TRANSFERS_FROM: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_transfers_from",
  fromTable: TRANSFERS.id,
  fromColumn: TRANSFERS.columns[1].id,
  toTable: ACCOUNTS.id,
  toColumn: ACCOUNTS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
