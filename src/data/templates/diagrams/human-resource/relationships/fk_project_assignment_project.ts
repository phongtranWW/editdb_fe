import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../../models/diagram-relationship";
import { PROJECT_ASSIGNMENTS } from "../tables/project_assignments";
import { PROJECTS } from "../tables/projects";
import { Relationship } from "../../../../constants";

export const FK_PROJECT_ASSIGNMENT_PROJECT: DiagramRelationship = {
  id: nanoid(6),
  name: "fk_project_assignment_project",
  fromTable: PROJECT_ASSIGNMENTS.id,
  fromColumn: PROJECT_ASSIGNMENTS.columns[1].id, // project_id
  toTable: PROJECTS.id,
  toColumn: PROJECTS.columns[0].id, // id
  type: Relationship.ONE_TO_ONE,
};
