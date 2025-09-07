import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { API_KEYS } from "../tables/api_keys";
import { USERS } from "../tables/users";
import { Relationship } from "../../../../constants";

export const FK_API_KEYS_USER: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_api_keys_user",
  fromTable: API_KEYS.id,
  fromColumn: API_KEYS.columns[3].id,
  toTable: USERS.id,
  toColumn: USERS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
