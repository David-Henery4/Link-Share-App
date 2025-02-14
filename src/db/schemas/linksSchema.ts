import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { profileDetailsTable } from "./profileDetailsSchema";

export const linksTable = pgTable("links_table", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => profileDetailsTable.userId)
    .notNull(),
  url: text("url").notNull(),
  platformId: uuid("platform_id")
    .references(() => platformTable.id)
    .notNull(),
});

export const platformTable = pgTable("platform_table", {
  id: uuid("id").primaryKey(),
  label: text(),
  value: text(),
  icon: text(),
  color: text(),
});

export const linksRelations = relations(linksTable, ({ one }) => ({
  platform: one(platformTable, {
    fields: [linksTable.platformId],
    references: [platformTable.id]
  }),
  user: one(profileDetailsTable, {
    fields: [linksTable.userId],
    references: [profileDetailsTable.userId],
  })
}));

export const platformRelations = relations(platformTable, ({ many }) => ({
  links: many(linksTable),
}));

export type InsertLinks = typeof linksTable.$inferInsert;
export type SelectLinks = typeof linksTable.$inferSelect;

export type InsertPlatform = typeof platformTable.$inferInsert;
export type SelectPlatform = typeof platformTable.$inferSelect;
