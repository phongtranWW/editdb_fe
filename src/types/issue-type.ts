import type { IssueType } from "../data/constants";

export type IssueType = (typeof IssueType)[keyof typeof IssueType];
