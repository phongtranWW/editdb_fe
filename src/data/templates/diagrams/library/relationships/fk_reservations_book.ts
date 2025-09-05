import { nanoid } from "nanoid";
import { RESERVATIONS } from "../tables/reservations";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { BOOKS } from "../tables/books";
import { Relationship } from "../../../../constants";

export const FK_RESERVATIONS_BOOK: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_reservations_book",
  fromTable: RESERVATIONS.id,
  fromColumn: RESERVATIONS.columns[1].id, // book_id
  toTable: BOOKS.id,
  toColumn: BOOKS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
