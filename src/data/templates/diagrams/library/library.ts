import { nanoid } from "nanoid";
import type { Diagram } from "../../../../models/diagram";
import { Database } from "../../../constants";
import { BOOKS } from "./tables/books";
import { GENRES } from "./tables/genres";
import { AUTHORS } from "./tables/authors";
import { RESERVATIONS } from "./tables/reservations";
import { PATRONS } from "./tables/patrons";
import { FK_BOOKS_AUTHOR } from "./relationships/fk_books_author";
import { FK_RESERVATIONS_BOOK } from "./relationships/fk_reservations_book";
import { FK_RESERVATIONS_PATRON } from "./relationships/fk_reservations_patron";
import { FK_BOOKS_GENRE } from "./relationships/fk_books_genre";

export const LIBRARY: Diagram = {
  id: nanoid(6),
  name: "Library Schema",
  type: Database.POSTGRESQL,
  tables: [BOOKS, GENRES, AUTHORS, RESERVATIONS, PATRONS],
  relationships: [
    FK_BOOKS_AUTHOR,
    FK_RESERVATIONS_BOOK,
    FK_RESERVATIONS_PATRON,
    FK_BOOKS_GENRE,
  ],
};
