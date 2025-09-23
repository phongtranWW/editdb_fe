import type { DatabaseType } from "../types/database-type";
import { Database } from "./constants";

export const SUPPORTED_COLUMN_TYPES: Record<
  DatabaseType,
  Record<
    string,
    {
      allowAutoIncrement: boolean;
      validate: (value: string) => boolean;
    }
  >
> = {
  [Database.POSTGRESQL]: {
    SMALLINT: {
      allowAutoIncrement: true,
      validate: (value: string) =>
        /^(?:-?(?:[0-9]{1,4}|[1-2][0-9]{4}|3[0-1][0-9]{3}|32[0-6][0-9]{2}|327[0-5][0-9]|3276[0-7]))$/.test(
          value
        ),
    },
    INT: {
      allowAutoIncrement: true,
      validate: (value: string) =>
        /^(?:-?(?:[0-9]{1,9}|1[0-9]{9}|20[0-9]{8}|21[0-3][0-9]{7}|214[0-6][0-9]{6}|2147[0-3][0-9]{5}|21474[0-7][0-9]{4}|214748[0-2][0-9]{3}|2147483[0-5][0-9]{2}|21474836[0-3][0-9]|214748364[0-7]))$/.test(
          value
        ),
    },
    BIGINT: {
      allowAutoIncrement: true,
      validate: (value: string) =>
        /^(?:-?(?:[0-9]{1,18}|9[0-1][0-9]{17}|92[0-1][0-9]{16}|922[0-2][0-9]{15}|9223[0-2][0-9]{14}|92233[0-6][0-9]{13}|922337[0-1][0-9]{12}|9223372[0-9]{11}|92233720[0-9]{10}|922337203[0-5][0-9]{9}|9223372036[0-7][0-9]{8}|92233720368[0-5][0-9]{7}|922337203685[0-3][0-9]{6}|9223372036854[0-7][0-9]{5}|92233720368547[0-5][0-9]{4}|922337203685477[0-5][0-9]{3}|9223372036854775[0-7][0-9]{2}|92233720368547758[0-7][0-9]|922337203685477580[0-7]))$/.test(
          value
        ),
    },
    DECIMAL: {
      allowAutoIncrement: false,
      validate: (value: string) =>
        /^-?(?:\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?$/.test(value),
    },
    NUMERIC: {
      allowAutoIncrement: false,
      validate: (value: string) =>
        /^-?(?:\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?$/.test(value),
    },
    REAL: {
      allowAutoIncrement: false,
      validate: (value: string) =>
        /^-?(?:\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?$/.test(value),
    },
    CHAR: {
      allowAutoIncrement: false,
      validate: (value: string) => true,
    },
    VARCHAR: {
      allowAutoIncrement: false,
      validate: (value: string) => value.length <= 255,
    },
    TEXT: {
      allowAutoIncrement: false,
      validate: (value: string) => true,
    },
    BOOLEAN: {
      allowAutoIncrement: false,
      validate: (value: string) => /^(true|false|t|f|1|0)$/i.test(value),
    },
    DATE: {
      allowAutoIncrement: false,
      validate: (value: string) => {
        const specialLiterals = ["today", "tomorrow", "yesterday"];
        if (specialLiterals.includes(value.toLowerCase())) {
          return true;
        }

        const isoRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
        if (isoRegex.test(value)) {
          const [year, month, day] = value.split("-").map(Number);
          const date = new Date(year, month - 1, day);
          return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
          );
        }

        const monthNameRegex =
          /^(?:\d{1,2}[-/ ])?(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*[-/ ]\d{1,2}[-/ ]\d{4}$/i;
        if (monthNameRegex.test(value)) {
          return true;
        }

        return false;
      },
    },
    TIME: {
      allowAutoIncrement: false,
      validate: (value: string) => {
        const time24hRegex =
          /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?$/;

        const time12hRegex =
          /^(?:0?[1-9]|1[0-2]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?\s?(AM|PM)$/i;

        return time24hRegex.test(value) || time12hRegex.test(value);
      },
    },
    TIMETZ: {
      allowAutoIncrement: false,
      validate: (value: string) => {
        const time24hTzRegex =
          /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?(?:[+-](?:[01]\d|2[0-3])(?::[0-5]\d)?)$/;

        const time12hTzRegex =
          /^(?:0?[1-9]|1[0-2]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?\s?(AM|PM)\s?(?:[+-](?:[01]\d|2[0-3])(?::[0-5]\d)?)$/i;

        return time24hTzRegex.test(value) || time12hTzRegex.test(value);
      },
    },
    TIMESTAMP: {
      allowAutoIncrement: false,
      validate: (value: string) => {
        const ts24hRegex =
          /^\d{4}-\d{2}-\d{2}[ T](?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?$/;

        const ts12hRegex =
          /^\d{4}-\d{2}-\d{2}[ T](?:0?[1-9]|1[0-2]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?\s?(AM|PM)$/i;

        return ts24hRegex.test(value) || ts12hRegex.test(value);
      },
    },
    TIMESTAMPTZ: {
      allowAutoIncrement: false,
      validate: (value: string) => {
        const tsTz24hRegex =
          /^\d{4}-\d{2}-\d{2}[ T](?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?(?:Z|[+-](?:[01]\d|2[0-3]):?[0-5]\d)$/;

        const tsTz12hRegex =
          /^\d{4}-\d{2}-\d{2}[ T](?:0?[1-9]|1[0-2]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?\s?(AM|PM)(?:Z|[+-](?:[01]\d|2[0-3]):?[0-5]\d)$/i;

        return tsTz24hRegex.test(value) || tsTz12hRegex.test(value);
      },
    },
  },
};
