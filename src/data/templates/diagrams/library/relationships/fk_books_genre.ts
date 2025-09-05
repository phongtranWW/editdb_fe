import { nanoid } from "nanoid";
import { BOOKS } from "../tables/books";
import { GENRES } from "../tables/genres";
import { Relationship } from "../../../../constants";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_BOOKS_GENRE: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_books_genre",
  fromTable: BOOKS.id,
  fromColumn: BOOKS.columns[4].id, // genre_id
  toTable: GENRES.id,
  toColumn: GENRES.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
