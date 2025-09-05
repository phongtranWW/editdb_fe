import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { Relationship } from "../../../../constants";
import { COURSES } from "../tables/courses";
import { DEPARTMENTS } from "../tables/departments";

export const FK_COURSES_DEPARTMENT: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_courses_dep",
  fromTable: COURSES.id,
  fromColumn: COURSES.columns[2].id,
  toTable: DEPARTMENTS.id,
  toColumn: DEPARTMENTS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
