import { createContext, useReducer } from "react";
import type { ViewContextValue } from "./types";
import { initialViewState, viewReducer } from "./reducer";

const ViewContext = createContext<ViewContextValue | null>(null);

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(viewReducer, initialViewState);

  return (
    <ViewContext.Provider value={{ state, dispatch }}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContext;
