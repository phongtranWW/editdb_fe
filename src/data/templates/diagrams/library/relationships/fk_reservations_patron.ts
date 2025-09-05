import { nanoid } from "nanoid";
import { RESERVATIONS } from "../tables/reservations";
import { PATRONS } from "../tables/patrons";
import { Relationship } from "../../../../constants";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_RESERVATIONS_PATRON: DiagramRelationship = {
  id: nanoid(6),
  name: "fK_reservations_patron",
  fromTable: RESERVATIONS.id,
  fromColumn: RESERVATIONS.columns[2].id, // patron_id
  toTable: PATRONS.id,
  toColumn: PATRONS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
