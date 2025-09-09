import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";
import { useView } from "../../../hooks/useView";
import { useMemo } from "react";

export default function ViewDropDown() {
  // Hooks
  const { state, dispatch } = useView();

  const viewMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: "Sider",
        key: "sider",
        icon: state.showSider ? <CheckSquareOutlined /> : <BorderOutlined />,
        onClick: () => {
          dispatch({ type: "SET_SIDER", payload: !state.showSider });
        },
      },
      {
        label: "Mini Map",
        key: "minimap",
        icon: state.showMiniMap ? <CheckSquareOutlined /> : <BorderOutlined />,
        onClick: () => {
          dispatch({ type: "SET_MINIMAP", payload: !state.showMiniMap });
        },
      },
      {
        label: "Controls",
        key: "controls",
        icon: state.showControls ? <CheckSquareOutlined /> : <BorderOutlined />,
        onClick: () => {
          dispatch({ type: "SET_CONTROLS", payload: !state.showControls });
        },
      },
      {
        label: "Issues",
        key: "issues",
        icon: state.showIssues ? <CheckSquareOutlined /> : <BorderOutlined />,
        onClick: () => {
          dispatch({ type: "SET_ISSUES", payload: !state.showIssues });
        },
      },
    ],
    [
      state.showSider,
      state.showMiniMap,
      state.showControls,
      state.showIssues,
      dispatch,
    ]
  );

  return (
    <Dropdown menu={{ items: viewMenuItems }} placement="bottomLeft">
      <Button type="text" size="small">
        View
      </Button>
    </Dropdown>
  );
}
