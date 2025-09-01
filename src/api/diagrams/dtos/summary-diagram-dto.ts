export class SummaryDiagramDto {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  constructor(id: string, name: string, createdAt: string, updatedAt: string) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
