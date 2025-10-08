import { useCallback } from "react";
import { useDiagram } from "../context/DiagramContext/hooks";
import { useSelection } from "../context/SelectionContext/hooks";
import { nanoid } from "nanoid";
import { Relationship } from "../data/constants";

export const useEdit = () => {
  const { state, dispatch } = useDiagram();
  const { data } = useSelection();

  const undo = useCallback(() => {
    dispatch({
      type: "UNDO",
    });
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch({
      type: "REDO",
    });
  }, [dispatch]);

  const duplicate = useCallback(() => {
    dispatch({
      type: "DUPLICATE_SELECTION",
      payload: data,
    });
  }, [dispatch, data]);

  const remove = useCallback(() => {
    dispatch({
      type: "DELETE_SELECTION",
      payload: data,
    });
  }, [dispatch, data]);

  const createTable = useCallback(() => {
    dispatch({
      type: "ADD_TABLE",
      payload: {
        id: nanoid(6),
        name: `table_${state.data.tables.length + 1}`,
        columns: [],
      },
    });
  }, [dispatch, state.data.tables]);

  const createRelationship = useCallback(() => {
    dispatch({
      type: "ADD_RELATIONSHIP",
      payload: {
        id: nanoid(6),
        name: `relationship_${state.data.relationships.length + 1}`,
        type: Relationship.ONE_TO_ONE,
      },
    });
  }, [dispatch, state.data.relationships]);

  return {
    duplicate,
    remove,
    undo,
    redo,
    createTable,
    createRelationship,
  };
};
