import { nanoid } from "nanoid";
import type { Diagram } from "../../../../models/diagram";
import { Database } from "../../../constants";
import { EMPLOYEES } from "./tables/employees";
import { DEPARTMENTS } from "./tables/departments";
import { POSITIONS } from "./tables/positions";
import { PROJECTS } from "./tables/projects";
import { PROJECT_ASSIGNMENTS } from "./tables/project_assignments";
import { FK_EMPLOYEES_DEPARTMENT } from "./relationships/fk_employees_department";
import { FK_EMPLOYEES_POSITION } from "./relationships/fk_employee_position";
import { FK_PROJECT_ASSIGNMENT_PROJECT } from "./relationships/fk_project_assignment_project";
import { FK_PROJECT_ASSIGNMENTS_EMPLOYEE } from "./relationships/fk_project_assignments_employees";

export const HUMAN_RESOURCE: Diagram = {
  id: nanoid(6),
  name: "Human Resource Schema",
  type: Database.POSTGRESQL,
  tables: [EMPLOYEES, DEPARTMENTS, POSITIONS, PROJECTS, PROJECT_ASSIGNMENTS],
  relationships: [
    FK_EMPLOYEES_DEPARTMENT,
    FK_EMPLOYEES_POSITION,
    FK_PROJECT_ASSIGNMENT_PROJECT,
    FK_PROJECT_ASSIGNMENTS_EMPLOYEE,
  ],
};
