import { Button, Dropdown, type MenuProps } from "antd";
import { useMemo } from "react";
import DropdownLabel from "../../UI/DropdownLabel";
import { useEdit } from "../../../hooks/useEdit";

export default function EditDropdown() {
  const { duplicate, remove, undo, redo, createTable, createRelationship } =
    useEdit();

  const editMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: <DropdownLabel content="Undo" shortcut="Ctrl + Z" />,
        key: "undo",
        onClick: () => undo(),
      },
      {
        label: <DropdownLabel content="Redo" shortcut="Ctrl + Y" />,
        key: "redo",
        onClick: () => redo(),
      },
      {
        label: (
          <DropdownLabel content="Create Table" shortcut="Ctrl + Alt + T" />
        ),
        key: "create-table",
        onClick: () => createTable(),
      },
      {
        label: (
          <DropdownLabel
            content="Create Relationship"
            shortcut="Ctrl + Alt + R"
          />
        ),
        key: "create-relationship",
        onClick: () => createRelationship(),
      },
      {
        label: <DropdownLabel content="Duplicate" shortcut="Ctrl + D" />,
        key: "duplicate",
        onClick: () => duplicate(),
      },
      {
        label: <DropdownLabel content="Delete" shortcut="Delete / Backspace" />,
        key: "delete",
        onClick: () => remove(),
      },
    ],
    [undo, redo, createTable, createRelationship, duplicate, remove]
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
