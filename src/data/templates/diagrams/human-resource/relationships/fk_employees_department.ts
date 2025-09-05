import { nanoid } from "nanoid";
import { EMPLOYEES } from "../tables/employees";
import { DEPARTMENTS } from "../tables/departments";
import { Relationship } from "../../../../constants";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_EMPLOYEES_DEPARTMENT: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_employees_department",
  fromTable: EMPLOYEES.id,
  fromColumn: EMPLOYEES.columns[4].id, // dep_id
  toTable: DEPARTMENTS.id,
  toColumn: DEPARTMENTS.columns[0].id, // id
  type: Relationship.MANY_TO_ONE,
};
