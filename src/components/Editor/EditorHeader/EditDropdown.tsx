import { Button, Dropdown, type MenuProps } from "antd";
import { useMemo } from "react";
import DropdownLabel from "../../UI/DropdownLabel";
import { useDiagram } from "../../../context/DiagramContext/hooks";
import { nanoid } from "nanoid";
import { Relationship } from "../../../data/constants";

export default function EditDropdown() {
  const { dispatch } = useDiagram();

  const editMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: <DropdownLabel content="Undo" shortcut="Ctrl + Z" />,
        key: "undo",
        onClick: () => dispatch({ type: "UNDO" }),
      },
      {
        label: <DropdownLabel content="Redo" shortcut="Ctrl + Y" />,
        key: "redo",
        onClick: () => dispatch({ type: "REDO" }),
      },
      {
        label: <DropdownLabel content="Clear" />,
        key: "clear",
        onClick: () => dispatch({ type: "CLEAR" }),
      },
      {
        label: <DropdownLabel content="Reset" />,
        key: "reset",
        onClick: () => dispatch({ type: "RESET" }),
      },
      {
        label: (
          <DropdownLabel content="Create Table" shortcut="Ctrl + Alt + T" />
        ),
        key: "create-table",
        onClick: () => {
          const id = nanoid(6);
          dispatch({
            type: "ADD_TABLE",
            payload: {
              id,
              name: `table_${id}`,
              columns: [],
            },
          });
        },
      },
      {
        label: (
          <DropdownLabel
            content="Create Relationship"
            shortcut="Ctrl + Alt + R"
          />
        ),
        key: "create-relationship",
        onClick: () => {
          const id = nanoid(6);
          dispatch({
            type: "ADD_RELATIONSHIP",
            payload: {
              id,
              name: `relationship_${id}`,
              type: Relationship.ONE_TO_ONE,
            },
          });
        },
      },
    ],
    [dispatch]
  );

  return (
    <Dropdown
      menu={{ items: editMenuItems }}
      placement="bottomLeft"
      trigger={["click"]}
    >
      <Button type="text" size="small">
        Edit
      </Button>
    </Dropdown>
  );
}
