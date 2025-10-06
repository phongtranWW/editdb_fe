import type { ViewAction, ViewState } from "./types";
import { produce } from "immer";

export const initialViewState: ViewState = {
  showSider: true,
  showMiniMap: false,
  showControls: true,
  showIssues: false,
};

export const viewReducer = produce((draft: ViewState, action: ViewAction) => {
  switch (action.type) {
    case "SET_SIDER":
      draft.showSider = action.payload;
      break;
    case "SET_MINIMAP":
      draft.showMiniMap = action.payload;
      break;
    case "SET_CONTROLS":
      draft.showControls = action.payload;
      break;
    case "SET_ISSUES":
      draft.showIssues = action.payload;
      break;
  }
});
