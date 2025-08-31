import type { RelationshipType } from "../data/constants";

export type RelationshipType =
  (typeof RelationshipType)[keyof typeof RelationshipType];
