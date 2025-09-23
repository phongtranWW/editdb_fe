import type { DatabaseType } from "../types/database-type";
import { Database } from "./constants";

export const SUPPORTED_COLUMN_TYPES: Record<
  DatabaseType,
  Record<
    string,
    {
      allowAutoIncrement: boolean;
      regexes: RegExp[];
    }
  >
> = {
  [Database.POSTGRESQL]: {
    SMALLINT: {
      allowAutoIncrement: true,
      regexes: [
        /^(?:-?(?:[0-9]{1,4}|[1-2][0-9]{4}|3[0-1][0-9]{3}|32[0-6][0-9]{2}|327[0-5][0-9]|3276[0-7]))$/,
      ],
    },
    INT: {
      allowAutoIncrement: true,
      regexes: [
        /^(?:-?(?:[0-9]{1,9}|1[0-9]{9}|20[0-9]{8}|21[0-3][0-9]{7}|214[0-6][0-9]{6}|2147[0-3][0-9]{5}|21474[0-7][0-9]{4}|214748[0-2][0-9]{3}|2147483[0-5][0-9]{2}|21474836[0-3][0-9]|214748364[0-7]))$/,
      ],
    },
    BIGINT: {
      allowAutoIncrement: true,
      regexes: [/^(?:-?(?:[0-9]{1,18}|922337203685477580[0-7]))$/],
    },
    DECIMAL: {
      allowAutoIncrement: false,
      regexes: [/^-?(?:\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?$/],
    },
    NUMERIC: {
      allowAutoIncrement: false,
      regexes: [/^-?(?:\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?$/],
    },
    REAL: {
      allowAutoIncrement: false,
      regexes: [/^-?(?:\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?$/],
    },
    CHAR: {
      allowAutoIncrement: false,
      regexes: [/^.*$/],
    },
    VARCHAR: {
      allowAutoIncrement: false,
      regexes: [/^.{0,255}$/],
    },
    TEXT: {
      allowAutoIncrement: false,
      regexes: [/^.*$/],
    },
    BOOLEAN: {
      allowAutoIncrement: false,
      regexes: [/^(true|false|t|f|yes|no|y|n|on|off|1|0)$/i],
    },
    DATE: {
      allowAutoIncrement: false,
      regexes: [
        /^\d{4}-\d{1,2}-\d{1,2}$/,
        /^(today|tomorrow|yesterday)$/i,
        /^(?:\d{1,2}[-/ ])?(?:Jan|Feb|Mar|Apr|...|Dec)[a-z]*[-/ ]\d{1,2}[-/ ]\d{4}$/i,
        /^(current_date|now\(\)|current_timestamp|localtimestamp)$/i,
      ],
    },
    TIME: {
      allowAutoIncrement: false,
      regexes: [
        /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?$/,
        /^(?:0?[1-9]|1[0-2]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?\s?(AM|PM)$/i,
        /^(current_time|localtime|now\(\))$/i,
      ],
    },
    TIMETZ: {
      allowAutoIncrement: false,
      regexes: [
        /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?(?:[+-](?:[01]\d|2[0-3])(?::[0-5]\d)?)$/,
        /^(?:0?[1-9]|1[0-2]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?\s?(AM|PM)\s?(?:[+-](?:[01]\d|2[0-3])(?::[0-5]\d)?)$/i,
        /^(current_time|localtime|now\(\))$/i,
      ],
    },
    TIMESTAMP: {
      allowAutoIncrement: false,
      regexes: [
        /^\d{4}-\d{2}-\d{2}[ T](?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)$/,
        /^\d{4}-\d{2}-\d{2}[ T](?:0?[1-9]|1[0-2]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?\s?(AM|PM)$/i,
        /^(now\(\)|current_timestamp|localtimestamp)$/i,
      ],
    },
    TIMESTAMPTZ: {
      allowAutoIncrement: false,
      regexes: [
        /^\d{4}-\d{2}-\d{2}[ T](?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?(?:Z|[+-](?:[01]\d|2[0-3])(?::[0-5]\d)?)$/,
        /^\d{4}-\d{2}-\d{2}[ T](?:0?[1-9]|1[0-2]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?\s?(AM|PM)(?:Z|[+-](?:[01]\d|2[0-3])(?::[0-5]\d)?)$/i,
        /^(now\(\)|current_timestamp|localtimestamp)$/i,
      ],
    },
  },
};
