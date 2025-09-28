import { Button, Dropdown, type MenuProps } from "antd";
import { useMemo } from "react";
import { useDesign } from "../../../hooks/useDesign";
import DropdownLabel from "../../UI/DropDownLabel";
import { useDiagram } from "../../../hooks/useDiagram";
import { nanoid } from "nanoid";
import { Relationship } from "../../../data/constants";

export default function EditDropDown() {
  const { duplicate, remove } = useDesign();
  const { state, dispatch } = useDiagram();

  const editMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: (
          <DropdownLabel content="Create Table" shortcut="Ctrl + Alt + T" />
        ),
        key: "create-table",
        onClick: () => {
          dispatch({
            type: "ADD_TABLE",
            payload: {
              id: nanoid(6),
              name: `table_${state.tables.length + 1}`,
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
          dispatch({
            type: "ADD_RELATIONSHIP",
            payload: {
              id: nanoid(6),
              name: `relationship_${state.relationships.length + 1}`,
              type: Relationship.ONE_TO_ONE,
            },
          });
        },
      },
      {
        label: <DropdownLabel content="Duplicate" shortcut="Ctrl + D" />,
        key: "duplicate",
        onClick: () => {
          duplicate();
        },
      },
      {
        label: <DropdownLabel content="Delete" shortcut="Delete / Backspace" />,
        key: "delete",
        onClick: () => {
          remove();
        },
      },
    ],
    [
      duplicate,
      remove,
      dispatch,
      state.tables.length,
      state.relationships.length,
    ]
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
