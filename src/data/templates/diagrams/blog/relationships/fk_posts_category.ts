import { nanoid } from "nanoid";
import { Relationship } from "../../../../constants";
import { POSTS } from "../tables/posts";
import { CATEGORIES } from "../tables/categories";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_POSTS_CATEGORY: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_posts_category",
  fromTable: POSTS.id,
  fromColumn: POSTS.columns[2].id,
  toTable: CATEGORIES.id,
  toColumn: CATEGORIES.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
