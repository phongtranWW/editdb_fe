import { useHotkeys } from "react-hotkeys-hook";
import { useDiagram } from "../../context/DiagramContext/hooks";
import { useSave } from "../../context/SaveContext/hooks";
import { nanoid } from "nanoid";
import { Relationship } from "../../data/constants";
import { useView } from "../../context/ViewContext/hooks";

export default function Shortcut() {
  const { dispatch: diagramDispatch } = useDiagram();
  const { dispatch: viewDispatch } = useView();

  const { save } = useSave();

  useHotkeys(
    ["ctrl+z"],
    () => {
      diagramDispatch({ type: "UNDO" });
    },
    {
      preventDefault: true,
    },
    [diagramDispatch]
  );

  useHotkeys(
    ["ctrl+y"],
    () => {
      diagramDispatch({ type: "REDO" });
    },
    {
      preventDefault: true,
    },
    [diagramDispatch]
  );

  useHotkeys(
    ["ctrl+alt+t"],
    () => {
      const id = nanoid(6);
      diagramDispatch({
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
    [diagramDispatch]
  );

  useHotkeys(
    ["ctrl+alt+r"],
    () => {
      const id = nanoid(6);
      diagramDispatch({
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
    [diagramDispatch]
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

  useHotkeys(
    ["ctrl+shift+i"],
    () => {
      viewDispatch({ type: "TOGGLE_ISSUES" });
    },
    {
      preventDefault: true,
    },
    [viewDispatch]
  );

  return null;
}
