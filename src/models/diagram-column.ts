export interface DiagramColumn {
  id: string;
  name: string;
  type: string;
  isPrimary: boolean;
  isUnique: boolean;
  isNullable: boolean;
  isAutoIncrement: boolean;
  defaultValue?: string;
}
