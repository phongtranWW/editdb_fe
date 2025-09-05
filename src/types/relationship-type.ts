import type { Relationship } from "../data/constants";

export type RelationshipType = (typeof Relationship)[keyof typeof Relationship];
