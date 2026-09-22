CREATE TABLE "cap_challenges" (
	"sig" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"answer" jsonb,
	"used_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "issues" (
	"id" serial PRIMARY KEY NOT NULL,
	"uid" varchar(11) NOT NULL,
	"name" varchar(50) NOT NULL,
	"class" varchar(50) NOT NULL,
	"phone" varchar(11) NOT NULL,
	"problem" text NOT NULL,
	"reg_time" timestamp (0) with time zone NOT NULL,
	"app_time" date NOT NULL,
	"closed" boolean DEFAULT false NOT NULL,
	"closed_time" timestamp (0) with time zone
);
