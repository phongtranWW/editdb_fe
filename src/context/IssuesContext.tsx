import { createContext, useEffect, useState } from "react";
import type { Issue } from "../models/issue";
import { getIssues } from "../utils/issues/getIssues";
import { useDiagram } from "./DiagramContext/hooks";

interface IssuesContextValue {
  issues: Issue[];
}

const IssuesContext = createContext<IssuesContextValue>({
  issues: [],
});

export const IssuesProvider = ({ children }: { children: React.ReactNode }) => {
  const { state } = useDiagram();
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const initialIssues = getIssues(
      state.data.tables,
      state.data.relationships,
      state.data.type
    );
    setIssues(initialIssues);
  }, [state.data.tables, state.data.relationships, state.data.type]);

  return (
    <IssuesContext.Provider value={{ issues }}>
      {children}
    </IssuesContext.Provider>
  );
};

export default IssuesContext;
