ALTER TABLE "profile_details_table" DROP CONSTRAINT "profile_details_table_user_id_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "profile_details_table" DROP CONSTRAINT "profile_details_table_userEmail_users_table_email_fk";
--> statement-breakpoint
ALTER TABLE "profile_details_table" ADD CONSTRAINT "profile_details_table_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_details_table" ADD CONSTRAINT "profile_details_table_userEmail_users_email_fk" FOREIGN KEY ("userEmail") REFERENCES "auth"."users"("email") ON DELETE no action ON UPDATE no action;