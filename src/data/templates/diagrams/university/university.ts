import { nanoid } from "nanoid";
import type { Diagram } from "../../../../models/diagram";
import { Database } from "../../../constants";
import { STUDENTS } from "./tables/students";
import { COURSES } from "./tables/courses";
import { ENROLLMENTS } from "./tables/enrollments";
import { INSTRUCTORS } from "./tables/instructors";
import { DEPARTMENTS } from "./tables/departments";
import { MAJORS } from "./tables/majors";
import { FK_ENROLLMENTS_STUDENT } from "./relationships/fk_enrollments_student";
import { FK_ENROLLMENTS_COURSE } from "./relationships/fk_enrollments_course";
import { FK_INSTRUCTORS_DEPARTMENT } from "./relationships/fk_instructors_department";
import { FK_COURSES_DEPARTMENT } from "./relationships/fk_courses_department";
import { FK_STUDENTS_MAJOR } from "./relationships/fk_students_major";

export const UNIVERSITY: Diagram = {
  id: nanoid(6),
  name: "University Schema",
  type: Database.POSTGRESQL,
  tables: [STUDENTS, COURSES, ENROLLMENTS, INSTRUCTORS, DEPARTMENTS, MAJORS],
  relationships: [
    FK_ENROLLMENTS_STUDENT,
    FK_ENROLLMENTS_COURSE,
    FK_INSTRUCTORS_DEPARTMENT,
    FK_COURSES_DEPARTMENT,
    FK_STUDENTS_MAJOR,
  ],
};
