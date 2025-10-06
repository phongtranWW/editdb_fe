import { Button, Dropdown, type MenuProps } from "antd";
import { useMemo } from "react";
import { useDesign } from "../../../hooks/useDesign";
import { nanoid } from "nanoid";
import { Relationship } from "../../../data/constants";
import DropdownLabel from "../../UI/DropdownLabel";
import { useDiagram } from "../../../context/DiagramContext/hooks";

export default function EditDropdown() {
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
              name: `table_${state.data.tables.length + 1}`,
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
              name: `relationship_${state.data.relationships.length + 1}`,
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
      state.data.tables.length,
      state.data.relationships.length,
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
