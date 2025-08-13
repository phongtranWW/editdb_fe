export interface RelationshipDto {
  id: string;
  name: string;
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  type: "ONE-TO-ONE" | "ONE-TO-MANY" | "MANY-TO-ONE";
}
