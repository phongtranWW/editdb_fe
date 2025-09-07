import { nanoid } from "nanoid";
import type { Diagram } from "../../../../models/diagram";
import { Database } from "../../../constants";
import { USERS } from "./tables/users";
import { API_KEYS } from "./tables/api_keys";
import { API_LOGS } from "./tables/api_logs";
import { MIGRATIONS } from "./tables/migrations";
import { PASSWORD_RESETS } from "./tables/password_resets";
import { FK_API_KEYS_USER } from "./relationships/fk_api_keys_user";
import { FK_API_LOGS_USER } from "./relationships/fk_api_logs_user";

export const SCREENLY: Diagram = {
  id: nanoid(6),
  name: "Screenly Schema",
  type: Database.MYSQL,
  tables: [USERS, API_KEYS, API_LOGS, MIGRATIONS, PASSWORD_RESETS],
  relationships: [FK_API_KEYS_USER, FK_API_LOGS_USER],
};
