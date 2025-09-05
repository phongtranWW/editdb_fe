import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { REVIEWS } from "../tables/reviews";
import { PRODUCTS } from "../tables/products";
import { Relationship } from "../../../../constants";

export const FK_REVIEWS_PRODUCT: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_reviews_product",
  fromTable: REVIEWS.id,
  fromColumn: REVIEWS.columns[2].id,
  toTable: PRODUCTS.id,
  toColumn: PRODUCTS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
