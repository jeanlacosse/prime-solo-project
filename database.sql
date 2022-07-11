
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "journal_entry" (
  "id" serial primary key,
  "user_id" INT not null REFERENCES "user",
  "favorited" boolean DEFAULT false,
  "date" DATE,
  "winery_name" VARCHAR (250) not null,
  "varietal" VARCHAR (250) not null,
  "vintage" VARCHAR (250) not null,
  "region" VARCHAR (250) not null
); 

CREATE TABLE "scores" (
	"id" serial primary key,
	"journal_entry_id" INT not null REFERENCES "journal_entry",
	"user_display_name" VARCHAR (250),
	"appearance_score" INT not null,
	"nose_score" INT not null,
	"palate_score" INT not null,
	"overall_score" INT not null,
	"appearance_notes" VARCHAR (500),
	"nose_notes" VARCHAR (500),
	"palate_notes" VARCHAR (500),
	"overall_notes" VARCHAR (500)
);

--sample data to test
INSERT INTO "journal_entry" ("user_id", "favorited", "date", "winery_name", "varietal", "vintage", "region")
VALUES (1, false, '07/05/2022', 'Phelps Creek', 'Pinot Noir', '2015', 'Willamette Valley');

INSERT INTO "scores" ("journal_entry_id", "appearance_score", "nose_score", "palate_score", "overall_score", "appearance_notes", "nose_notes", "palate_notes", "overall_notes")
VALUES (1, 8, 8, 6, 7, 'bright red, relatively clear. Not opaque at all.', 'fresh berries, plum, and slightly peppery.', 'long finish, low tannins, good acid levels.', 'Overall a great wine, light on the tounge but carries a lot of depth.')
