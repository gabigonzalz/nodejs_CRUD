-- CreateTable
CREATE TABLE "liked_artists" (
    "id" SERIAL NOT NULL,
    "artists" VARCHAR NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "liked_artists_pk" PRIMARY KEY ("id")
);
