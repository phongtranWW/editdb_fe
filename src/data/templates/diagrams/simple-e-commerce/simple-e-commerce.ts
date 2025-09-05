import { nanoid } from "nanoid";
import { Database } from "../../../constants";
import { PRODUCTS } from "./tables/products";
import { CATEGORIES } from "./tables/categories";
import { ORDERS } from "./tables/orders";
import { REVIEWS } from "./tables/reviews";
import { CUSTOMERS } from "./tables/customer";
import { FK_ORDER_PRODUCT } from "./relationships/fk_order_product";
import { FK_PRODUCTS_CATEGORY } from "./relationships/fk_products_category";
import { FK_REVIEWS_CUSTOMER } from "./relationships/fk_reviews_customer";
import { FK_REVIEWS_PRODUCT } from "./relationships/fk_reviews_product";
import { FK_ORDERS_CUSTOMER } from "./relationships/fk_orders_customer";
import type { Diagram } from "../../../../models/diagram";

export const SIMPLE_ECOMMERCE: Diagram = {
  id: nanoid(6),
  name: "Simple E-commerce Schema",
  type: Database.POSTGRESQL,
  tables: [PRODUCTS, CATEGORIES, ORDERS, REVIEWS, CUSTOMERS],
  relationships: [
    FK_ORDER_PRODUCT,
    FK_PRODUCTS_CATEGORY,
    FK_REVIEWS_CUSTOMER,
    FK_REVIEWS_PRODUCT,
    FK_ORDERS_CUSTOMER,
  ],
};
