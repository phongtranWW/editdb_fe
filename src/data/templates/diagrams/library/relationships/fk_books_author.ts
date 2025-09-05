import { nanoid } from "nanoid";
import { BOOKS } from "../tables/books";
import { AUTHORS } from "../tables/authors";
import { Relationship } from "../../../../constants";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_BOOKS_AUTHOR: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_books_author",
  fromTable: BOOKS.id,
  fromColumn: BOOKS.columns[3].id, // author_id
  toTable: AUTHORS.id,
  toColumn: AUTHORS.columns[0].id, // id
  type: Relationship.MANY_TO_ONE,
};
