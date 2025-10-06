import { useDesign } from "../../hooks/useDesign";
import { useHotkeys } from "react-hotkeys-hook";
import { nanoid } from "nanoid";
import { Relationship } from "../../data/constants";
import { useDiagram } from "../../context/DiagramContext/hooks";

export default function ShortcutListener() {
  const { state, dispatch } = useDiagram();
  const { remove, duplicate, save } = useDesign();

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

  useHotkeys(
    "ctrl+s",
    () => {
      save();
    },
    { preventDefault: true }
  );

  useHotkeys(
    "ctrl+alt+t",
    () => {
      dispatch({
        type: "ADD_TABLE",
        payload: {
          id: nanoid(6),
          name: `table_${state.data.tables.length + 1}`,
          columns: [],
        },
      });
    },
    { preventDefault: true }
  );

  useHotkeys(
    "ctrl+alt+r",
    () => {
      dispatch({
        type: "ADD_RELATIONSHIP",
        payload: {
          id: nanoid(6),
          name: `fk_relationship_${state.data.relationships.length + 1}`,
          type: Relationship.ONE_TO_ONE,
        },
      });
    },
    { preventDefault: true }
  );

  useHotkeys(
    "ctrl+z",
    () => {
      dispatch({ type: "UNDO" });
    },
    { preventDefault: true }
  );

  useHotkeys(
    "ctrl+y",
    () => {
      dispatch({ type: "REDO" });
    },
    { preventDefault: true }
  );
  return null;
}
