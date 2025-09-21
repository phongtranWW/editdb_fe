import { Database } from "./constants";
import mysqlImage from "../assets/mysql-icon.png";
import postgresImage from "../assets/postgres-icon.png";

export const DATABASE_INFO = {
  [Database.POSTGRESQL]: {
    name: "POSTGRES",
    image: postgresImage,
  },

  [Database.MYSQL]: {
    name: "MYSQL",
    image: mysqlImage,
  },
};
