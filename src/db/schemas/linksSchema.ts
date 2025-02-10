import { pgTable, text,  uuid, json } from "drizzle-orm/pg-core";
// import { usersTable } from "./usersSchema";

export const linksTable = pgTable("links_tables", {
  id: uuid("id").primaryKey().unique(),
  platform: json().default({
    id: text(),
    label: text(),
    value: text(),
    icon: text(),
    color: text(),
  }),
  url: text(),
});

