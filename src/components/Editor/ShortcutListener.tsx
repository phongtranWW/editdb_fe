import { useHotkeys } from "react-hotkeys-hook";
import { useEdit } from "../../hooks/useEdit";

export default function ShortcutListener() {
  const { duplicate, remove, undo, redo, createTable, createRelationship } =
    useEdit();
  useHotkeys(
    "ctrl+d",
    () => {
      duplicate();
    },
    { preventDefault: true }
  );

  useHotkeys(["delete", "backspace"], () => {
    remove();
  });

  // useHotkeys(
  //   "ctrl+s",
  //   () => {
  //     save();
  //   },
  //   { preventDefault: true }
  // );

  useHotkeys(
    "ctrl+alt+t",
    () => {
      createTable();
    },
    { preventDefault: true }
  );

  useHotkeys(
    "ctrl+alt+r",
    () => {
      createRelationship();
    },
    { preventDefault: true }
  );

  useHotkeys(
    "ctrl+z",
    () => {
      undo();
    },
    { preventDefault: true }
  );

  useHotkeys(
    "ctrl+y",
    () => {
      redo();
    },
    { preventDefault: true }
  );
  return null;
}
