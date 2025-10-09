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
    INTEGER: {
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
  [Database.MYSQL]: {
    TINYINT: {
      allowAutoIncrement: true,
      regexes: [/^-?(?:\d|[1-9]\d|1[0-1]\d|12[0-7])$/],
    },
    SMALLINT: {
      allowAutoIncrement: true,
      regexes: [
        /^-?(?:\d{1,4}|[1-2]\d{4}|3[0-1]\d{3}|32[0-6]\d{2}|327[0-5]\d|3276[0-8])$/,
      ],
    },
    MEDIUMINT: {
      allowAutoIncrement: true,
      regexes: [
        /^-?(?:\d{1,7}|8[0-2]\d{6}|83[0-7]\d{5}|838[0-7]\d{4}|8388[0-5]\d{3}|83886[0-7]\d{2}|838860[0-7])$/,
      ],
    },
    INT: {
      allowAutoIncrement: true,
      regexes: [
        /^-?(?:\d{1,10}|1\d{10}|20\d{9}|21[0-3]\d{8}|214[0-6]\d{7}|2147[0-3]\d{6}|21474[0-7]\d{5}|214748[0-2]\d{4}|2147483[0-5]\d{3}|21474836[0-3]\d{2}|214748364[0-8])$/,
      ],
    },
    INTEGER: {
      allowAutoIncrement: true,
      regexes: [
        /^-?(?:\d{1,10}|1\d{10}|20\d{9}|21[0-3]\d{8}|214[0-6]\d{7}|2147[0-3]\d{6}|21474[0-7]\d{5}|214748[0-2]\d{4}|2147483[0-5]\d{3}|21474836[0-3]\d{2}|214748364[0-8])$/,
      ],
    },
    BIGINT: {
      allowAutoIncrement: true,
      regexes: [/^-?(?:\d{1,19}|922337203685477580[0-7])$/],
    },
    DECIMAL: {
      allowAutoIncrement: false,
      regexes: [/^-?(?:\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?$/],
    },
    NUMERIC: {
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
    YEAR: {
      allowAutoIncrement: false,
      regexes: [
        /^(0000|19[0-9]{2}|20[0-9]{2}|21[0-4][0-9]|2155)$/,
        /^([0-9]{1,2})$/, // 1-2 digit (0–99)
        /^(NOW\(\)|CURRENT_TIMESTAMP(\(\))?)$/i,
      ],
    },
    DATE: {
      allowAutoIncrement: false,
      regexes: [
        /^(0000-00-00|[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/,
        /^(CURRENT_DATE|CURDATE\(\))$/i, // functions
      ],
    },
    DATETIME: {
      allowAutoIncrement: false,
      regexes: [
        /^(0000-00-00 00:00:00|[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s(2[0-3]|[01]\d):([0-5]\d):([0-5]\d)(\.\d{1,6})?)$/,
        /^(CURRENT_TIMESTAMP(\(\))?|NOW\(\)|LOCALTIME(\(\))?|LOCALTIMESTAMP(\(\))?)$/i,
      ],
    },
    TIMESTAMP: {
      allowAutoIncrement: false,
      regexes: [
        /^(0000-00-00 00:00:00|19[789]\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s(2[0-3]|[01]\d):([0-5]\d):([0-5]\d)(\.\d{1,6})?|20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s(2[0-3]|[01]\d):([0-5]\d):([0-5]\d)(\.\d{1,6})?)$/,
        /^(CURRENT_TIMESTAMP(\(\))?|NOW\(\)|LOCALTIME(\(\))?|LOCALTIMESTAMP(\(\))?)$/i,
      ],
    },
  },
};
