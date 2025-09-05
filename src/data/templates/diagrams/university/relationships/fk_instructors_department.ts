import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { INSTRUCTORS } from "../tables/instructors";
import { DEPARTMENTS } from "../tables/departments";
import { Relationship } from "../../../../constants";

export const FK_INSTRUCTORS_DEPARTMENT: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_instructors_dep",
  fromTable: INSTRUCTORS.id,
  fromColumn: INSTRUCTORS.columns[4].id,
  toTable: DEPARTMENTS.id,
  toColumn: DEPARTMENTS.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
