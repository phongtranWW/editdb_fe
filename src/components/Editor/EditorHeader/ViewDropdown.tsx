import { CheckOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";
import { useMemo } from "react";
import { useView } from "../../../context/ViewContext/hooks";
import DropdownLabel from "../../UI/DropdownLabel";

export default function ViewDropdown() {
  const { state, dispatch } = useView();

  const viewMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: (
          <DropdownLabel
            vaiant="checkbox"
            content="Sider"
            icons={<CheckOutlined />}
            isSelected={state.showSider}
          />
        ),
        key: "sider",
        onClick: () => dispatch({ type: "TOGGLE_SIDER" }),
      },
      {
        label: (
          <DropdownLabel
            vaiant="checkbox"
            content="Mini Map"
            icons={<CheckOutlined />}
            isSelected={state.showMiniMap}
          />
        ),
        key: "minimap",
        onClick: () => dispatch({ type: "TOGGLE_MINIMAP" }),
      },
      {
        label: (
          <DropdownLabel
            vaiant="checkbox"
            content="Controls"
            icons={<CheckOutlined />}
            isSelected={state.showControls}
          />
        ),
        key: "controls",
        onClick: () => dispatch({ type: "TOGGLE_CONTROLS" }),
      },
      {
        label: (
          <DropdownLabel
            vaiant="checkbox"
            content="Issues"
            shortcut="Ctrl + Shift + I"
            icons={<CheckOutlined />}
            isSelected={state.showIssues}
          />
        ),
        key: "issues",
        onClick: () => dispatch({ type: "TOGGLE_ISSUES" }),
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
    <Dropdown
      menu={{ items: viewMenuItems }}
      placement="bottomLeft"
      trigger={["click"]}
    >
      <Button type="text" size="small">
        View
      </Button>
    </Dropdown>
  );
}
