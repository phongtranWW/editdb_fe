import { Database } from "./constants";
import mysqlImage from "../assets/mysql-icon.png";
import postgresImage from "../assets/postgres-icon.png";

export const DATABASE = {
  [Database.POSTGRESQL]: {
    name: "POSTGRES",
    columnType: [
      // Numeric
      "SMALLINT",
      "INTEGER",
      "BIGINT",
      "DECIMAL",
      "NUMERIC",
      "REAL",
      "DOUBLE PRECISION",

      // Character
      "CHAR(10)",
      "VARCHAR(10)",
      "VARCHAR(50)",
      "VARCHAR(100)",
      "VARCHAR(255)",
      "TEXT",

      // Boolean
      "BOOLEAN",

      // Date/Time
      "DATE",
      "TIME",
      "TIMESTAMP",
      "TIMESTAMPTZ", // timestamp with timezone

      // JSON & Misc
      "UUID",
      "JSON",
      "JSONB",
    ],
    image: postgresImage,
  },

  [Database.MYSQL]: {
    name: "MYSQL",
    columnType: [
      // Numeric
      "TINYINT",
      "SMALLINT",
      "INT",
      "BIGINT",
      "DECIMAL",
      "FLOAT",
      "DOUBLE",

      // Character
      "CHAR(10)",
      "VARCHAR(10)",
      "VARCHAR(50)",
      "VARCHAR(100)",
      "VARCHAR(255)",
      "TEXT",
      "LONGTEXT",

      // Boolean (MySQL thường là TINYINT(1))
      "BOOLEAN",

      // Date/Time
      "DATE",
      "TIME",
      "DATETIME",
      "TIMESTAMP",

      // JSON & Misc
      "UUID",
      "JSON",
    ],
    image: mysqlImage,
  },
};
