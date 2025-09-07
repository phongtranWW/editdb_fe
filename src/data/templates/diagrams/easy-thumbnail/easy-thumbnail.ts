import { nanoid } from "nanoid";
import type { Diagram } from "../../../../models/diagram";
import { Database } from "../../../constants";
import { EASY_THUMBNAILS_SOURCE } from "./tables/easy_thumbnails_sources";
import { EASY_THUMBNAILS_THUMBNAIL } from "./tables/easy_thumbnails_thumbnail";
import { EASY_THUMBNAILS_DIMENSIONS } from "./tables/easy_thumbnails_dimensions";
import { FK_THUMBNAIL_SOURCE } from "./relationships/fk_thumbnail_source";
import { FK_DIMENSIONS_THUMBNAIL } from "./relationships/fk_dimensions_thumbnail";

export const EASY_THUMBNAIL: Diagram = {
  id: nanoid(6),
  name: "Easy Thumbnail Schema",
  type: Database.POSTGRESQL,
  tables: [
    EASY_THUMBNAILS_SOURCE,
    EASY_THUMBNAILS_THUMBNAIL,
    EASY_THUMBNAILS_DIMENSIONS,
  ],
  relationships: [FK_THUMBNAIL_SOURCE, FK_DIMENSIONS_THUMBNAIL],
};
