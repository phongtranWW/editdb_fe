import { nanoid } from "nanoid";
import { POSTS } from "../tables/posts";
import { USERS } from "../tables/users";
import { Relationship } from "../../../../constants";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_USER_POSTS: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_user_posts",
  fromTable: POSTS.id,
  fromColumn: POSTS.columns[1].id,
  toTable: USERS.id,
  toColumn: USERS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
