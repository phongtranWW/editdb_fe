import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { ENROLLMENTS } from "../tables/enrollments";
import { STUDENTS } from "../tables/students";
import { Relationship } from "../../../../constants";

export const FK_ENROLLMENTS_STUDENT: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_enrollments_student",
  fromTable: ENROLLMENTS.id,
  fromColumn: ENROLLMENTS.columns[0].id,
  toTable: STUDENTS.id,
  toColumn: STUDENTS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
