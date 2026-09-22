CREATE TABLE "cap_challenges" (
	"sig" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"answer" jsonb,
	"used_at" timestamp with time zone
);
