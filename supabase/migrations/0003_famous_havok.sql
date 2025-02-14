ALTER TABLE "users_table" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "users_table" CASCADE;--> statement-breakpoint
ALTER TABLE "platform_table" DROP CONSTRAINT "platform_table_linksId_unique";--> statement-breakpoint
ALTER TABLE "links_table" DROP CONSTRAINT "links_table_user_id_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "platform_table" DROP CONSTRAINT "platform_table_linksId_links_table_id_fk";
--> statement-breakpoint
ALTER TABLE "profile_details_table" DROP CONSTRAINT "profile_details_table_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "profile_details_table" DROP CONSTRAINT "profile_details_table_userEmail_users_email_fk";
--> statement-breakpoint
ALTER TABLE "links_table" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile_details_table" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile_details_table" ALTER COLUMN "userEmail" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "profile_details_table" ALTER COLUMN "userEmail" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "links_table" ADD COLUMN "platform_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "links_table" ADD CONSTRAINT "links_table_user_id_profile_details_table_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profile_details_table"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "links_table" ADD CONSTRAINT "links_table_platform_id_platform_table_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."platform_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "platform_table" DROP COLUMN "linksId";--> statement-breakpoint
ALTER TABLE "links_table" ADD CONSTRAINT "links_table_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "profile_details_table" ADD CONSTRAINT "profile_details_table_user_id_unique" UNIQUE("user_id");