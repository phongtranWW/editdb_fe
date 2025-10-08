export interface SelectionContextValue {
  data: {
    tableIds: string[];
    relationshipIds: string[];
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      tableIds: string[];
      relationshipIds: string[];
    }>
  >;
}
