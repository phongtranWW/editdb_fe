import { nanoid } from "nanoid";
import { RELATED_PRODUCTS } from "../tables/related_products";
import { PRODUCTS } from "../tables/products";
import { Relationship } from "../../../../constants";

export const FK_RELATED_PRODUCT = {
  id: nanoid(6),
  name: "fk_related_product",
  fromTable: RELATED_PRODUCTS.id,
  fromColumn: RELATED_PRODUCTS.columns[0].id,
  toTable: PRODUCTS.id,
  toColumn: PRODUCTS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
