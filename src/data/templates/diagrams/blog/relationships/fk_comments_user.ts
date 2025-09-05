import { nanoid } from "nanoid";
import { COMMENTS } from "../tables/comments";
import { USERS } from "../tables/users";
import { Relationship } from "../../../../constants";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_COMMENTS_USER: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_comments_user",
  fromTable: COMMENTS.id,
  fromColumn: COMMENTS.columns[2].id,
  toTable: USERS.id,
  toColumn: USERS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
