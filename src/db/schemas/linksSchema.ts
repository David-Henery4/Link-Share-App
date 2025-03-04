import { pgTable, text, uuid, integer } from "drizzle-orm/pg-core";
import { profileDetailsTable } from "./profileDetailsSchema";

export const linksTable = pgTable("links_table", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => profileDetailsTable.userId)
    .notNull(),
  url: text("url").notNull(),
  orderNumber: integer("order_number").notNull(),
  platformId: uuid("platform_id").notNull(),
  platformLabel: text("platform_label").notNull(),
  platformValue: text("platform_value").notNull(),
  platformColour: text("platform_colour").notNull(),
});


export type InsertLinks = typeof linksTable.$inferInsert;
export type SelectLinks = typeof linksTable.$inferSelect;

