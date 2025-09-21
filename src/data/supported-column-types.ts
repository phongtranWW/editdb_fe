import type { DatabaseType } from "../types/database-type";
import { Database } from "./constants";

export const SUPPORTED_COLUMN_TYPES: Record<
  DatabaseType,
  Record<
    string,
    {
      allowAutoIncrement: boolean;
      allowDefault: boolean;
      isQuoted: boolean;
    }
  >
> = {
  [Database.POSTGRESQL]: {
    SMALLINT: {
      allowAutoIncrement: true,
      allowDefault: true,
      isQuoted: false,
    },
    INT: {
      allowAutoIncrement: true,
      allowDefault: true,
      isQuoted: false,
    },
    BIGINT: {
      allowAutoIncrement: true,
      allowDefault: true,
      isQuoted: false,
    },
    DECIMAL: {
      allowAutoIncrement: false,
      allowDefault: true,
      isQuoted: false,
    },
    NUMERIC: {
      allowAutoIncrement: false,
      allowDefault: true,
      isQuoted: false,
    },
    REAL: {
      allowAutoIncrement: false,
      allowDefault: true,
      isQuoted: false,
    },
    CHAR: {
      allowAutoIncrement: false,
      allowDefault: true,
      isQuoted: true,
    },
    VARCHAR: {
      allowAutoIncrement: false,
      allowDefault: true,
      isQuoted: true,
    },
    TEXT: {
      allowAutoIncrement: false,
      allowDefault: true,
      isQuoted: true,
    },
    BOOLEAN: {
      allowAutoIncrement: false,
      allowDefault: true,
      isQuoted: false,
    },
    DATE: {
      allowAutoIncrement: false,
      allowDefault: true,
      isQuoted: true,
    },
    TIME: {
      allowAutoIncrement: false,
      allowDefault: true,
      isQuoted: true,
    },
    TIMETZ: {
      allowAutoIncrement: false,
      allowDefault: true,
      isQuoted: true,
    },
    TIMESTAMP: {
      allowAutoIncrement: false,
      allowDefault: true,
      isQuoted: true,
    },
    TIMESTAMPTZ: {
      allowAutoIncrement: false,
      allowDefault: true,
      isQuoted: true,
    },
  },
};
