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
    case "TOGGLE_SIDER":
      draft.showSider = !draft.showSider;
      break;
    case "TOGGLE_MINIMAP":
      draft.showMiniMap = !draft.showMiniMap;
      break;
    case "TOGGLE_CONTROLS":
      draft.showControls = !draft.showControls;
      break;
    case "TOGGLE_ISSUES":
      draft.showIssues = !draft.showIssues;
      break;
  }
});
