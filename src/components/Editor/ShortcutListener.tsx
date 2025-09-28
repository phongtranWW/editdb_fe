import { useDesign } from "../../hooks/useDesign";
import { useHotkeys } from "react-hotkeys-hook";
import { useDiagram } from "../../hooks/useDiagram";
import { nanoid } from "nanoid";
import { Relationship } from "../../data/constants";

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
          name: `table_${state.tables.length + 1}`,
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
          name: `fk_relationship_${state.relationships.length + 1}`,
          type: Relationship.ONE_TO_ONE,
        },
      });
    },
    { preventDefault: true }
  );
  return null;
}
