CREATE TABLE "links_table" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"url" text,
	CONSTRAINT "links_table_id_unique" UNIQUE("id"),
	CONSTRAINT "links_table_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "platform_table" (
	"id" uuid PRIMARY KEY NOT NULL,
	"linksId" uuid NOT NULL,
	"label" text,
	"value" text,
	"icon" text,
	"color" text,
	CONSTRAINT "platform_table_id_unique" UNIQUE("id"),
	CONSTRAINT "platform_table_linksId_unique" UNIQUE("linksId")
);
--> statement-breakpoint
CREATE TABLE "profile_details_table" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"userEmail" varchar,
	"first_name" text,
	"last_name" text,
	"profile_picture" text,
	CONSTRAINT "profile_details_table_id_unique" UNIQUE("id"),
	CONSTRAINT "profile_details_table_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_table_id_unique" UNIQUE("id"),
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "links_table" ADD CONSTRAINT "links_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "platform_table" ADD CONSTRAINT "platform_table_linksId_links_table_id_fk" FOREIGN KEY ("linksId") REFERENCES "public"."links_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_details_table" ADD CONSTRAINT "profile_details_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_details_table" ADD CONSTRAINT "profile_details_table_userEmail_users_table_email_fk" FOREIGN KEY ("userEmail") REFERENCES "public"."users_table"("email") ON DELETE no action ON UPDATE no action;