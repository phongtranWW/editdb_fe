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
  const {
    state: { tables, relationships, type },
  } = useDiagram();
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const initialIssues = getIssues(tables, relationships, type);
    setIssues(initialIssues);
  }, [tables, relationships, type]);

  return (
    <IssuesContext.Provider value={{ issues }}>
      {children}
    </IssuesContext.Provider>
  );
};

export default IssuesContext;
