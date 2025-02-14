import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const profileDetailsTable = pgTable("profile_details_table", {
  id: uuid("id").primaryKey().notNull(),
  userId: uuid("user_id").unique().notNull(),
  userEmail: varchar("userEmail", { length: 256 }).notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profilePicture: text("profile_picture"),
});

export type InsertProfileDetails = typeof profileDetailsTable.$inferInsert;
export type SelectProfileDetails = typeof profileDetailsTable.$inferSelect;
