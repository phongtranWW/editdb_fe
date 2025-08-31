import type { ViewAction, ViewState } from "./types";

export const initialViewState: ViewState = {
  showSider: true,
  showMiniMap: false,
  showControls: true,
  showIssues: false,
};

export function viewReducer(state: ViewState, action: ViewAction): ViewState {
  switch (action.type) {
    case "SET_SIDER":
      return { ...state, showSider: action.payload };
    case "SET_MINIMAP":
      return { ...state, showMiniMap: action.payload };
    case "SET_CONTROLS":
      return { ...state, showControls: action.payload };
    case "SET_ISSUES":
      return { ...state, showIssues: action.payload };
    default:
      return state;
  }
}
