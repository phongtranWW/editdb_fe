import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { EASY_THUMBNAILS_THUMBNAIL } from "../tables/easy_thumbnails_thumbnail";
import { EASY_THUMBNAILS_SOURCE } from "../tables/easy_thumbnails_sources";
import { Relationship } from "../../../../constants";

export const FK_THUMBNAIL_SOURCE: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_thumbnail_source",
  fromTable: EASY_THUMBNAILS_THUMBNAIL.id,
  fromColumn: EASY_THUMBNAILS_THUMBNAIL.columns[4].id,
  toTable: EASY_THUMBNAILS_SOURCE.id,
  toColumn: EASY_THUMBNAILS_SOURCE.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
