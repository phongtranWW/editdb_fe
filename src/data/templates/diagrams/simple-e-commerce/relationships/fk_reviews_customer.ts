import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { REVIEWS } from "../tables/reviews";
import { CUSTOMERS } from "../tables/customer";
import { Relationship } from "../../../../constants";

export const FK_REVIEWS_CUSTOMER: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_reviews_customer",
  fromTable: REVIEWS.id,
  fromColumn: REVIEWS.columns[1].id,
  toTable: CUSTOMERS.id,
  toColumn: CUSTOMERS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
