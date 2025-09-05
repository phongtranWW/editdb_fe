import { nanoid } from "nanoid";
import { Relationship } from "../../../../constants";
import { COMMENTS } from "../tables/comments";
import { POSTS } from "../tables/posts";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_COMMENTS_POST: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_comments_post",
  fromTable: COMMENTS.id,
  fromColumn: COMMENTS.columns[1].id,
  toTable: POSTS.id,
  toColumn: POSTS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
