import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { EASY_THUMBNAILS_DIMENSIONS } from "../tables/easy_thumbnails_dimensions";
import { EASY_THUMBNAILS_THUMBNAIL } from "../tables/easy_thumbnails_thumbnail";
import { Relationship } from "../../../../constants";

export const FK_DIMENSIONS_THUMBNAIL: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_dimensions_thumbnail",
  fromTable: EASY_THUMBNAILS_DIMENSIONS.id,
  fromColumn: EASY_THUMBNAILS_DIMENSIONS.columns[1].id,
  toTable: EASY_THUMBNAILS_THUMBNAIL.id,
  toColumn: EASY_THUMBNAILS_THUMBNAIL.columns[0].id,
  type: Relationship.ONE_TO_ONE,
};
