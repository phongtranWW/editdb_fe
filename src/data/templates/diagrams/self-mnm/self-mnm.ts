import { nanoid } from "nanoid";
import { Database } from "../../../constants";
import { PRODUCTS } from "./tables/products";
import { RELATED_PRODUCTS } from "./tables/related_products";
import { FK_RELATED_PRODUCT } from "./relationships/fk_related_product";
import { FK_RELATED_ID } from "./relationships/fk_related_id";

export const SELF_MNM = {
  id: nanoid(6),
  name: "Self Many To Many Schema",
  type: Database.POSTGRESQL,
  tables: [PRODUCTS, RELATED_PRODUCTS],
  relationships: [FK_RELATED_PRODUCT, FK_RELATED_ID],
};
