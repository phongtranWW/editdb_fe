import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { STUDENTS } from "../tables/students";
import { MAJORS } from "../tables/majors";
import { Relationship } from "../../../../constants";

export const FK_STUDENTS_MAJOR: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_students_major",
  fromTable: STUDENTS.id,
  fromColumn: STUDENTS.columns[7].id,
  toTable: MAJORS.id,
  toColumn: MAJORS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
