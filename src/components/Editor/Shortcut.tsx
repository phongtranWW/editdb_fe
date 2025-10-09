import { useHotkeys } from "react-hotkeys-hook";
import { useDiagram } from "../../context/DiagramContext/hooks";
import { useSave } from "../../context/SaveContext/hooks";
import { nanoid } from "nanoid";
import { Relationship } from "../../data/constants";

export default function Shortcut() {
  const { dispatch } = useDiagram();
  const { save } = useSave();

  useHotkeys(
    ["ctrl+z"],
    () => {
      dispatch({ type: "UNDO" });
    },
    {
      preventDefault: true,
    },
    [dispatch]
  );

  useHotkeys(
    ["ctrl+y"],
    () => {
      dispatch({ type: "REDO" });
    },
    {
      preventDefault: true,
    },
    [dispatch]
  );

  useHotkeys(
    ["ctrl+alt+t"],
    () => {
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
    {
      preventDefault: true,
    },
    [dispatch]
  );

  useHotkeys(
    ["ctrl+alt+r"],
    () => {
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
    {
      preventDefault: true,
    },
    [dispatch]
  );

  useHotkeys(
    ["ctrl+s"],
    () => {
      save();
    },
    {
      preventDefault: true,
    },
    [save]
  );

  return null;
}
