import { nanoid } from "nanoid";
import { EMPLOYEES } from "../tables/employees";
import { POSITIONS } from "../tables/positions";
import { Relationship } from "../../../../constants";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";

export const FK_EMPLOYEES_POSITION: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_employee_position",
  fromTable: EMPLOYEES.id,
  fromColumn: EMPLOYEES.columns[5].id, // pos_id
  toTable: POSITIONS.id,
  toColumn: POSITIONS.columns[0].id, // id
  type: Relationship.ONE_TO_ONE,
};
