import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { API_LOGS } from "../tables/api_logs";
import { USERS } from "../tables/users";
import { Relationship } from "../../../../constants";

export const FK_API_LOGS_USER: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_api_log_user",
  fromTable: API_LOGS.id,
  fromColumn: API_LOGS.columns[1].id,
  toTable: USERS.id,
  toColumn: USERS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
