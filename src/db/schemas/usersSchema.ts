import { relations } from "drizzle-orm";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { profileDetailsTable } from "./profileDetailsSchema";

export const usersTable = pgTable("users_table", {
  id: uuid("id").primaryKey().unique(),
  email: varchar({length: 256}).notNull(),
  password: text("password").notNull(),
});

export const usersTableRelations = relations(usersTable, ({ one }) => ({
  profileDetailsTable: one(profileDetailsTable),
}));
