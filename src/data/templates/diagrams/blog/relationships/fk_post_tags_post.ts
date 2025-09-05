import { nanoid } from "nanoid";
import { POST_TAGS } from "../tables/post_tags";
import { POSTS } from "../tables/posts";
import { Relationship } from "../../../../constants";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_POST_TAGS_POST: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_post_tags_post",
  fromTable: POST_TAGS.id,
  fromColumn: POST_TAGS.columns[1].id,
  toTable: POSTS.id,
  toColumn: POSTS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
