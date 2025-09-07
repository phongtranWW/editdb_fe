import { nanoid } from "nanoid";
import type { Diagram } from "../../../../models/diagram";
import { Database } from "../../../constants";
import { STUDENTS } from "./tables/students";
import { COURSES } from "./tables/course";
import { ENROLLMENTS } from "./tables/enrollments";
import { FK_ENROLLMENTS_COURSE } from "./relationships/fk_enrollments_course";
import { FK_ENROLLMENTS_STUDENT } from "./relationships/fk_enrollments_student";

export const MNM: Diagram = {
  id: nanoid(6),
  name: "Many To Many Schema",
  type: Database.POSTGRESQL,
  tables: [STUDENTS, COURSES, ENROLLMENTS],
  relationships: [FK_ENROLLMENTS_COURSE, FK_ENROLLMENTS_STUDENT],
};
