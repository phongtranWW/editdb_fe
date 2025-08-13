import { createContext, useCallback, useState } from "react";

interface ViewState {
  showMenu: boolean;
  showMiniMap: boolean;
  showControls: boolean;
  toggleShowMenu: () => void;
  toggleShowMiniMap: () => void;
  toggleShowControls: () => void;
}

const ViewContext = createContext<ViewState | null>(null);

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [showMenu, setShowMenu] = useState(true);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const toggleShowMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const toggleShowMiniMap = useCallback(() => {
    setShowMiniMap((prev) => !prev);
  }, []);

  const toggleShowControls = useCallback(() => {
    setShowControls((prev) => !prev);
  }, []);

  return (
    <ViewContext.Provider
      value={{
        showMenu,
        showMiniMap,
        showControls,
        toggleShowMenu,
        toggleShowMiniMap,
        toggleShowControls,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContext;
