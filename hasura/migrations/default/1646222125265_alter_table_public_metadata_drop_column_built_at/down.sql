alter table "public"."metadata" alter column "built_at" drop not null;
alter table "public"."metadata" add column "built_at" date;
