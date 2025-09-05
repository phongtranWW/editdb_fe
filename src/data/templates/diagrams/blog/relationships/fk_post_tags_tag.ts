import { nanoid } from "nanoid";
import { POST_TAGS } from "../tables/post_tags";
import { TAGS } from "../tables/tags";
import { Relationship } from "../../../../constants";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_POST_TAGS_TAG: DiagramRelationship = {
  id: nanoid(6),
  name: "fK_post_tags_tag",
  fromTable: POST_TAGS.id,
  fromColumn: POST_TAGS.columns[2].id,
  toTable: TAGS.id,
  toColumn: TAGS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
