export interface Column {
  id: string;
  name: string;
  type: string;
  isPrimary: boolean;
  isUnique: boolean;
  isNullable: boolean;
  default?: string;
}
