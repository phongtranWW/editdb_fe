import type { DatabaseType } from "../types/database-type";
import { Database } from "./constants";

export const SUPPORTED_COLUMN_TYPES: Record<
  DatabaseType,
  Record<
    string,
    {
      allowAutoIncrement: boolean;
      isQuoted: boolean;
      validate?: (value: string) => boolean;
    }
  >
> = {
  [Database.POSTGRESQL]: {
    SMALLINT: {
      allowAutoIncrement: true,
      isQuoted: false,
    },
    INT: {
      allowAutoIncrement: true,
      isQuoted: false,
    },
    BIGINT: {
      allowAutoIncrement: true,
      isQuoted: false,
    },
    DECIMAL: {
      allowAutoIncrement: false,
      isQuoted: false,
    },
    NUMERIC: {
      allowAutoIncrement: false,
      isQuoted: false,
    },
    REAL: {
      allowAutoIncrement: false,
      isQuoted: false,
    },
    CHAR: {
      allowAutoIncrement: false,
      isQuoted: true,
    },
    VARCHAR: {
      allowAutoIncrement: false,
      isQuoted: true,
    },
    TEXT: {
      allowAutoIncrement: false,
      isQuoted: true,
    },
    BOOLEAN: {
      allowAutoIncrement: false,
      isQuoted: false,
    },
    DATE: {
      allowAutoIncrement: false,
      isQuoted: true,
    },
    TIME: {
      allowAutoIncrement: false,
      isQuoted: true,
    },
    TIMETZ: {
      allowAutoIncrement: false,
      isQuoted: true,
    },
    TIMESTAMP: {
      allowAutoIncrement: false,
      isQuoted: true,
    },
    TIMESTAMPTZ: {
      allowAutoIncrement: false,
      isQuoted: true,
    },
  },
};
