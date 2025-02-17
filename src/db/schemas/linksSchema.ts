import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { profileDetailsTable } from "./profileDetailsSchema";

export const linksTable = pgTable("links_table", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => profileDetailsTable.userId)
    .notNull(),
  url: text("url").notNull(),
  platformId: uuid("platform_id").notNull(),
  platformLabel: text("platform_label").notNull(),
  platformValue: text("platform_value").notNull(),
  platformColor: text("platform_color").notNull(),
});


export type InsertLinks = typeof linksTable.$inferInsert;
export type SelectLinks = typeof linksTable.$inferSelect;

