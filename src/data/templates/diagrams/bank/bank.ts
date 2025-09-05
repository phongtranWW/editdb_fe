import { nanoid } from "nanoid";
import type { Diagram } from "../../../../models/diagram";
import { Database } from "../../../constants";
import { CUSTOMERS } from "./tables/customers";
import { ACCOUNTS } from "./tables/accounts";
import { TRANSACTIONS } from "./tables/transactions";
import { TRANSFERS } from "./tables/transfers";
import { CARDS } from "./tables/cards";
import { LOANS } from "./tables/loans";
import { INVESTMENTS } from "./tables/inverstments";
import { FK_ACCOUNTS_CUSTOMER } from "./relationships/fk_accounts_customer";
import { FK_CARDS_CUSTOMER } from "./relationships/fk_cards_customer";
import { FK_LOANS_CUSTOMER } from "./relationships/fk_loans_customer";
import { FK_INVESTMENTS_CUSTOMER } from "./relationships/fk_investments_customer";
import { FK_TRANSACTIONS_ACCOUNT } from "./relationships/fk_transactions_account";
import { FK_TRANSFERS_TO } from "./relationships/fk_transfers_to";
import { FK_TRANSFERS_FROM } from "./relationships/fk_transfers_from";

export const BANK: Diagram = {
  id: nanoid(6),
  name: "Bank",
  type: Database.POSTGRESQL,
  tables: [
    CUSTOMERS,
    ACCOUNTS,
    TRANSACTIONS,
    TRANSFERS,
    CARDS,
    LOANS,
    INVESTMENTS,
  ],
  relationships: [
    FK_ACCOUNTS_CUSTOMER,
    FK_CARDS_CUSTOMER,
    FK_LOANS_CUSTOMER,
    FK_INVESTMENTS_CUSTOMER,
    FK_TRANSACTIONS_ACCOUNT,
    FK_TRANSFERS_TO,
    FK_TRANSFERS_FROM,
  ],
};
