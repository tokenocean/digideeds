CREATE TABLE "public"."metadata" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "artwork_id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "built_at" date NOT NULL, "maintenance_fee_monthly" integer NOT NULL, "property_address" text NOT NULL, "bedroom_number" integer NOT NULL, "bathroom_number" integer NOT NULL, "property_title" text, "building_type" text, "annual_taxes" bigint, "appliences_included" boolean, "window_coverings" boolean, "floor_space" integer, "fire_protection" text, "amenities_nearby" text, PRIMARY KEY ("id") , FOREIGN KEY ("artwork_id") REFERENCES "public"."artworks"("id") ON UPDATE restrict ON DELETE restrict);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_metadata_updated_at"
BEFORE UPDATE ON "public"."metadata"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_metadata_updated_at" ON "public"."metadata" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
