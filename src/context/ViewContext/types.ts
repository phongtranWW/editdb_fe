export interface ViewState {
  showSider: boolean;
  showMiniMap: boolean;
  showControls: boolean;
  showIssues: boolean;
}

export type ViewAction =
  | { type: "TOGGLE_SIDER" }
  | { type: "TOGGLE_MINIMAP" }
  | { type: "TOGGLE_CONTROLS" }
  | { type: "TOGGLE_ISSUES" };

export interface ViewContextValue {
  state: ViewState;
  dispatch: React.Dispatch<ViewAction>;
}
