import { relations } from "drizzle-orm";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema";

export const profileDetailsTable = pgTable("profile_details_table", {
  id: uuid("id").primaryKey().unique(),
  userId: uuid("user_id")
    .primaryKey()
    .unique()
    .references(() => usersTable.id),
  userEmail: varchar().references(() => usersTable.email),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profilePicture: text("profile_picture"),
});

export const profileDetailsTableRelations = relations(
  profileDetailsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [profileDetailsTable.userId],
      references: [usersTable.id],
    }),
  })
);
