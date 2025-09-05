import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { PRODUCTS } from "../tables/products";
import { CATEGORIES } from "../tables/categories";
import { Relationship } from "../../../../constants";

export const FK_PRODUCTS_CATEGORY: DiagramRelationship = {
  id: nanoid(6),
  name: "fK_products_category",
  fromTable: PRODUCTS.id,
  fromColumn: PRODUCTS.columns[4].id,
  toTable: CATEGORIES.id,
  toColumn: CATEGORIES.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
