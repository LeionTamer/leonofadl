-- CreateTable
CREATE TABLE "GooglePlaces" (
    "placeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longtitue" DOUBLE PRECISION NOT NULL,
    "googleURL" TEXT NOT NULL,
    "website" TEXT,

    CONSTRAINT "GooglePlaces_pkey" PRIMARY KEY ("placeId")
);
