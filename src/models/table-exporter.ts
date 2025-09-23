export type TableExporter = {
  name: string;
  columns: Map<
    string,
    {
      name: string;
      type: string;
      isPrimary: boolean;
      isUnique: boolean;
      isNullable: boolean;
      isAutoIncrement: boolean;
      defaultValue?: string;
    }
  >;
};
