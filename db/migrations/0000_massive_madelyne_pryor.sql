CREATE TABLE "click_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link_id" uuid NOT NULL,
	"profile_id" uuid NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL,
	"referrer" text,
	"user_agent" text,
	"ip_hash" varchar(128)
);
--> statement-breakpoint
CREATE TABLE "links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"title" varchar(80) NOT NULL,
	"url" text NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"position" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"display_name" varchar(80) NOT NULL,
	"slug" varchar(64) NOT NULL,
	"bio" varchar(240),
	"avatar_url" text,
	"accent_color" varchar(7) DEFAULT '#256d85' NOT NULL,
	"theme" varchar(24) DEFAULT 'clean' NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "click_events" ADD CONSTRAINT "click_events_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "click_events" ADD CONSTRAINT "click_events_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "click_events_link_id_idx" ON "click_events" USING btree ("link_id");--> statement-breakpoint
CREATE INDEX "click_events_profile_id_idx" ON "click_events" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "click_events_occurred_at_idx" ON "click_events" USING btree ("occurred_at");--> statement-breakpoint
CREATE INDEX "links_profile_id_idx" ON "links" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "links_profile_position_idx" ON "links" USING btree ("profile_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "profiles_user_id_unique" ON "profiles" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "profiles_slug_unique" ON "profiles" USING btree ("slug");