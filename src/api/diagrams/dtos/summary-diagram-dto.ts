import type { DatabaseType } from "../../../types/database-type";

export class SummaryDiagramDto {
  id: string;
  name: string;
  type: DatabaseType;
  createdAt: string;
  updatedAt: string;

  constructor(
    id: string,
    name: string,
    type: DatabaseType,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
