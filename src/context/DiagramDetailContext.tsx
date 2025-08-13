import { createContext, useCallback, useEffect, useState } from "react";
import type { RelationshipDto } from "../models/dtos/relationship-dto";
import type { TableDto } from "../models/dtos/table-dto";
import type { DiagramDetailDto } from "../models/dtos/diagram-detail.dto";
import { nanoid } from "nanoid";
import type { ColumnDto } from "../models/dtos/column-dto";

const mockDiagram: DiagramDetailDto = {
  name: "Cosmic Schema",
  description: "Schema mô phỏng hệ thống quản lý khám phá vũ trụ",
  tables: [
    {
      id: nanoid(6),
      name: "star_systems",
      position: { x: 0, y: 0 },
      columns: [
        {
          id: nanoid(6),
          name: "id",
          type: "UUID",
          isPrimary: true,
          isUnique: true,
          isNullable: false,
          default: null,
        },
        {
          id: nanoid(6),
          name: "name",
          type: "VARCHAR",
          isPrimary: false,
          isUnique: true,
          isNullable: false,
          default: null,
        },
        {
          id: nanoid(6),
          name: "galaxy",
          type: "VARCHAR",
          isPrimary: false,
          isUnique: false,
          isNullable: false,
          default: null,
        },
        {
          id: nanoid(6),
          name: "discovered_at",
          type: "TIMESTAMP",
          isPrimary: false,
          isUnique: false,
          isNullable: true,
          default: null,
        },
      ],
    },
    {
      id: nanoid(6),
      name: "planets",
      position: { x: 350, y: 0 },
      columns: [
        {
          id: nanoid(6),
          name: "id",
          type: "UUID",
          isPrimary: true,
          isUnique: true,
          isNullable: false,
          default: null,
        },
        {
          id: nanoid(6),
          name: "name",
          type: "VARCHAR",
          isPrimary: false,
          isUnique: true,
          isNullable: false,
          default: null,
        },
        {
          id: nanoid(6),
          name: "type",
          type: "VARCHAR",
          isPrimary: false,
          isUnique: false,
          isNullable: false,
          default: "terrestrial",
        },
        {
          id: nanoid(6),
          name: "star_system_id",
          type: "UUID",
          isPrimary: false,
          isUnique: false,
          isNullable: false,
          default: null,
        },
        {
          id: nanoid(6),
          name: "has_life",
          type: "BOOLEAN",
          isPrimary: false,
          isUnique: false,
          isNullable: false,
          default: null,
        },
      ],
    },
  ],
  relationships: [
    {
      id: nanoid(6),
      name: "system_planets",
      fromTable: "star_systems",
      fromColumn: "id",
      toTable: "planets",
      toColumn: "star_system_id",
      type: "ONE-TO-MANY",
    },
    {
      id: nanoid(6),
      name: "planet_missions",
      fromTable: "planets",
      fromColumn: "id",
      toTable: "missions",
      toColumn: "planet_id",
      type: "ONE-TO-MANY",
    },
    {
      id: nanoid(6),
      name: "planet_astronauts",
      fromTable: "planets",
      fromColumn: "id",
      toTable: "astronauts",
      toColumn: "planet_id",
      type: "ONE-TO-MANY",
    },
    {
      id: nanoid(6),
      name: "spaceship_missions",
      fromTable: "spaceships",
      fromColumn: "id",
      toTable: "missions",
      toColumn: "spaceship_id",
      type: "ONE-TO-MANY",
    },
  ],
};

interface DiagramDetailState {
  name: string;
  description: string;
  tables: TableDto[];
  relationships: RelationshipDto[];

  // Diagram actions
  updateInfo: (name: string, description: string) => void;

  // Table actions
  getTableName: (id: string) => string;
  getTableNames: () => { id: string; name: string }[];
  getColumnNames: (id: string) => { id: string; name: string }[];
  addTable: (name: string) => void;
  updateTable: (id: string, payload: Partial<TableDto>) => void;
  deleteTable: (id: string) => void;
  addColumn: (id: string, columnName: string) => void;
  updateColumn: (
    id: string,
    columnId: string,
    payload: Partial<ColumnDto>
  ) => void;
  deleteColumn: (id: string, columnId: string) => void;

  // Relationship actions
  addRelationship: (name: string) => void;
  updateRelationship: (id: string, payload: Partial<RelationshipDto>) => void;
  deleteRelationship: (id: string) => void;
}

const DiagramDetailContext = createContext<DiagramDetailState | null>(null);

export const DiagramDetailProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tables, setTables] = useState<TableDto[]>([]);
  const [relationships, setRelationships] = useState<RelationshipDto[]>([]);

  // Diagram actions
  const updateInfo = useCallback((name: string, description: string) => {
    setName(name);
    setDescription(description);
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
  }, []);

  const updateTable = useCallback((id: string, payload: Partial<TableDto>) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, ...payload } : table
      )
    );
  }, []);

  const deleteTable = useCallback((id: string) => {
    setTables((prevTables) => prevTables.filter((table) => table.id !== id));
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
                  default: null,
                },
              ],
            }
          : table
      )
    );
  }, []);

  const updateColumn = useCallback(
    (id: string, columnId: string, payload: Partial<ColumnDto>) => {
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
  }, []);

  const updateRelationship = useCallback(
    (id: string, payload: Partial<RelationshipDto>) => {
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
  }, []);

  useEffect(() => {
    setName(mockDiagram.name);
    setDescription(mockDiagram.description || "");
    setTables(mockDiagram.tables);
    setRelationships(mockDiagram.relationships);
  }, []);

  return (
    <DiagramDetailContext.Provider
      value={{
        name,
        description,
        tables,
        relationships,
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
