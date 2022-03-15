CREATE TABLE "public"."files" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "artwork_id" uuid NOT NULL, "hash" text NOT NULL, "type" text NOT NULL, "filename" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
