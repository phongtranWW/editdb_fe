import { createContext, useCallback, useEffect, useState } from "react";
import type { Relationship } from "../models/relationship";
import type { Table } from "../models/table";
import { nanoid } from "nanoid";
import type { Column } from "../models/column";
import { diagramService } from "../services/diagramService";

interface DiagramDetailState {
  isSaved: boolean;
  name: string;
  description: string;
  tables: Table[];
  relationships: Relationship[];
  visibility: "PUBLIC" | "PRIVATE" | "SHARED";

  // Actions
  saveDiagram: () => void;
  deleteDiagram: () => void;
  updateVisibility: (visibility: "PUBLIC" | "PRIVATE" | "SHARED") => void;

  // Diagram actions
  updateInfo: (name: string, description: string) => void;

  // Table actions
  getTableName: (id: string) => string;
  getTableNames: () => { id: string; name: string }[];
  getColumnNames: (id: string) => { id: string; name: string }[];
  addTable: (name: string) => void;
  updateTable: (id: string, payload: Partial<Table>) => void;
  deleteTable: (id: string) => void;
  addColumn: (id: string, columnName: string) => void;
  updateColumn: (
    id: string,
    columnId: string,
    payload: Partial<Column>
  ) => void;
  deleteColumn: (id: string, columnId: string) => void;

  // Relationship actions
  addRelationship: (name: string) => void;
  updateRelationship: (id: string, payload: Partial<Relationship>) => void;
  deleteRelationship: (id: string) => void;
}

const DiagramDetailContext = createContext<DiagramDetailState | null>(null);

export const DiagramDetailProvider = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE" | "SHARED">(
    "PRIVATE"
  );
  const [tables, setTables] = useState<Table[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);

  // Actions
  const saveDiagram = useCallback(() => {
    if (isSaved) return;
    diagramService.updateDiagram(id, {
      name,
      description,
      tables,
      relationships,
    });
    setIsSaved(true);
  }, [isSaved, id, name, description, tables, relationships]);

  const deleteDiagram = useCallback(() => {
    diagramService.deleteDiagram(id);
  }, [id]);

  const updateVisibility = useCallback(
    (visibility: "PUBLIC" | "PRIVATE" | "SHARED") => {
      diagramService.updateShareStatus(id, { visibility });
    },
    [id]
  );

  // Diagram actions
  const updateInfo = useCallback((name: string, description: string) => {
    setName(name);
    setDescription(description);
    setIsSaved(false);
  }, []);

  // Table actions
  const getTableName = useCallback(
    (id: string) => {
      const table = tables.find((table) => table.id === id);
      if (!table) return "";
      return table.name;
    },
    [tables]
  );

  const getTableNames = useCallback(() => {
    return tables.map((table) => ({
      id: table.id,
      name: table.name,
    }));
  }, [tables]);

  const getColumnNames = useCallback(
    (id: string) => {
      const table = tables.find((table) => table.id === id);
      if (!table) return [];
      return table.columns.map((column) => ({
        id: column.id,
        name: column.name,
      }));
    },
    [tables]
  );

  const addTable = useCallback((name: string) => {
    setTables((prevTables) => {
      return [
        ...prevTables,
        {
          id: nanoid(6),
          name,
          position: { x: 0, y: 0 },
          columns: [],
        },
      ];
    });
    setIsSaved(false);
  }, []);

  const updateTable = useCallback((id: string, payload: Partial<Table>) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, ...payload } : table
      )
    );
    setIsSaved(false);
  }, []);

  const deleteTable = useCallback((id: string) => {
    setTables((prevTables) => prevTables.filter((table) => table.id !== id));
    setIsSaved(false);
  }, []);

  const addColumn = useCallback((id: string, columnName: string) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id
          ? {
              ...table,
              columns: [
                ...table.columns,
                {
                  id: nanoid(6),
                  name: columnName,
                  type: "VARCHAR",
                  isPrimary: false,
                  isUnique: false,
                  isNullable: false,
                },
              ],
            }
          : table
      )
    );
    setIsSaved(false);
  }, []);

  const updateColumn = useCallback(
    (id: string, columnId: string, payload: Partial<Column>) => {
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === id
            ? {
                ...table,
                columns: table.columns.map((column) =>
                  column.id === columnId ? { ...column, ...payload } : column
                ),
              }
            : table
        )
      );
      setIsSaved(false);
    },
    []
  );

  const deleteColumn = useCallback((id: string, columnId: string) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id
          ? {
              ...table,
              columns: table.columns.filter((column) => column.id !== columnId),
            }
          : table
      )
    );
    setIsSaved(false);
  }, []);

  // Relationship actions
  const addRelationship = useCallback((name: string) => {
    setRelationships((prevRelationships) => {
      return [
        ...prevRelationships,
        {
          id: nanoid(6),
          name,
          fromTable: "",
          fromColumn: "",
          toTable: "",
          toColumn: "",
          type: "ONE-TO-ONE",
        },
      ];
    });
    setIsSaved(false);
  }, []);

  const updateRelationship = useCallback(
    (id: string, payload: Partial<Relationship>) => {
      setRelationships((prevRelationships) =>
        prevRelationships.map((relationship) =>
          relationship.id === id
            ? { ...relationship, ...payload }
            : relationship
        )
      );
    },
    []
  );

  const deleteRelationship = useCallback((id: string) => {
    setRelationships((prevRelationships) =>
      prevRelationships.filter((relationship) => relationship.id !== id)
    );
    setIsSaved(false);
  }, []);

  useEffect(() => {
    const fetchDiagramDetail = async () => {
      const diagramDetail = await diagramService.getDiagramDetail(id);
      if (!diagramDetail) return;
      setName(diagramDetail.name);
      setDescription(diagramDetail.description);
      setVisibility(diagramDetail.visibility);
      setTables(diagramDetail.tables);
      setRelationships(diagramDetail.relationships);
      setIsSaved(true);
    };
    fetchDiagramDetail();
  }, [id]);

  return (
    <DiagramDetailContext.Provider
      value={{
        isSaved,
        name,
        description,
        tables,
        relationships,
        visibility,
        saveDiagram,
        deleteDiagram,
        updateVisibility,
        updateInfo,
        getTableName,
        getTableNames,
        getColumnNames,
        addTable,
        updateTable,
        deleteTable,
        updateColumn,
        addColumn,
        deleteColumn,
        addRelationship,
        updateRelationship,
        deleteRelationship,
      }}
    >
      {children}
    </DiagramDetailContext.Provider>
  );
};

export default DiagramDetailContext;
