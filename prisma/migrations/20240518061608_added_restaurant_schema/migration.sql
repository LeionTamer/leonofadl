-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longtitude" DOUBLE PRECISION NOT NULL,
    "googleURL" TEXT NOT NULL,
    "website" TEXT,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);
