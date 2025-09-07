import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { ENROLLMENTS } from "../tables/enrollments";
import { COURSES } from "../tables/course";
import { Relationship } from "../../../../constants";

export const FK_ENROLLMENTS_COURSE: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_enrollments_course",
  fromTable: ENROLLMENTS.id,
  fromColumn: ENROLLMENTS.columns[1].id,
  toTable: COURSES.id,
  toColumn: COURSES.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
