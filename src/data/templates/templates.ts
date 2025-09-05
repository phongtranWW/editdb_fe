import { nanoid } from "nanoid";
import type { Template } from "../../models/template";
import { BLOG } from "./diagrams/blog/blog";
import { HUMAN_RESOURCE } from "./diagrams/human-resource/human-resource";
import { SIMPLE_ECOMMERCE } from "./diagrams/simple-e-commerce/simple-e-commerce";
import { LIBRARY } from "./diagrams/library/library";
import { BANK } from "./diagrams/bank/bank";
import blogImage from "../../assets/templates/blog.jpg";
import humanResourceImage from "../../assets/templates/hr.jpg";
import simpleEcommerceImage from "../../assets/templates/simple-ecommerce.jpg";
import libraryImage from "../../assets/templates/library.jpg";
import bankImage from "../../assets/templates/bank.jpg";
import universityImage from "../../assets/templates/university.jpg";
import { UNIVERSITY } from "./diagrams/university/university";

export const TEMPLATES: Template[] = [
  {
    id: nanoid(6),
    image: blogImage,
    name: "Blog Schema",
    description:
      "A blog database including tables such as posts, users, comments, and tags to facilitate the storage and retrieval of blog-related information.",
    diagram: BLOG,
  },
  {
    id: nanoid(6),
    image: humanResourceImage,
    name: "Human Resource Schema",
    description:
      "A Human Resources (HR) schema designed to manage employee and project related information within an organization.",
    diagram: HUMAN_RESOURCE,
  },
  {
    id: nanoid(6),
    image: simpleEcommerceImage,
    name: "Simple E-Commerce Schema",
    description:
      "An e-commerce schema designed to manage various aspects of an online store, including products, orders, and customers.",
    diagram: SIMPLE_ECOMMERCE,
  },
  {
    id: nanoid(6),
    image: libraryImage,
    name: "Library Schema",
    description:
      "A library schema designed to manage various aspects of a library, including books, patrons, reservations, and genres.",
    diagram: LIBRARY,
  },
  {
    id: nanoid(6),
    image: bankImage,
    name: "Bank Schema",
    description:
      "A bank schema designed to manage various aspects of a bank, including accounts, transactions, transfers, cards, loans, investments, and customers.",
    diagram: BANK,
  },
  {
    id: nanoid(6),
    image: universityImage,
    name: "University Schema",
    description:
      "A university schema designed to manage various aspects of a university, including students, instructors, departments, majors, and enrollments.",
    diagram: UNIVERSITY,
  },
];
