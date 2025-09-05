import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { Relationship } from "../../../../constants";
import { EMPLOYEES } from "../tables/employees";
import { PROJECT_ASSIGNMENTS } from "../tables/project_assignments";

export const FK_PROJECT_ASSIGNMENTS_EMPLOYEE: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_project_assignments_employee",
  fromTable: PROJECT_ASSIGNMENTS.id,
  fromColumn: PROJECT_ASSIGNMENTS.columns[2].id,
  toTable: EMPLOYEES.id,
  toColumn: EMPLOYEES.columns[0].id,
  type: Relationship.MANY_TO_ONE,
};
