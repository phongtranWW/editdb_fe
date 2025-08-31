import type { IssueContext } from "../issue-context";

interface IssueHandler {
  setNext(handler: IssueHandler): IssueHandler;
  handle(context: IssueContext): void;
}

export abstract class BaseIssueHandler implements IssueHandler {
  private nextHandler?: IssueHandler;

  setNext(handler: IssueHandler): IssueHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(context: IssueContext): void {
    if (this.nextHandler) {
      this.nextHandler.handle(context);
    }
  }
}
