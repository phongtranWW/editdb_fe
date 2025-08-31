import { useCallback, useContext } from "react";
import IssuesContext from "../context/IssuesContext";
import { IssueType } from "../data/constants";

export const useIssues = () => {
  const context = useContext(IssuesContext);
  if (!context) {
    throw new Error("useIssues must be used within an IssuesProvider");
  }

  const hasNoError = useCallback(() => {
    return !context.issues.some((issue) => issue.type === IssueType.ERROR);
  }, [context.issues]);

  return {
    issues: context.issues,
    hasNoError,
  };
};
