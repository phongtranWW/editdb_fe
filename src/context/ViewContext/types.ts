export interface ViewState {
  showSider: boolean;
  showMiniMap: boolean;
  showControls: boolean;
  showIssues: boolean;
}

export type ViewAction =
  | { type: "SET_SIDER"; payload: boolean }
  | { type: "SET_MINIMAP"; payload: boolean }
  | { type: "SET_CONTROLS"; payload: boolean }
  | { type: "SET_ISSUES"; payload: boolean };

export interface ViewContextValue {
  state: ViewState;
  dispatch: React.Dispatch<ViewAction>;
}
