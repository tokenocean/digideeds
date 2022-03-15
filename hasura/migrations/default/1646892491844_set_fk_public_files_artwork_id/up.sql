alter table "public"."files"
  add constraint "files_artwork_id_fkey"
  foreign key ("artwork_id")
  references "public"."artworks"
  ("id") on update cascade on delete cascade;
