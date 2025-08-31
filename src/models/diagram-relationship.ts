import type { RelationshipType } from "../types/relationship-type";

export interface DiagramRelationship {
  id: string;
  name: string;
  fromTable?: string;
  fromColumn?: string;
  toTable?: string;
  toColumn?: string;
  type: RelationshipType;
}
