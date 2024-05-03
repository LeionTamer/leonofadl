/*
  Warnings:

  - You are about to drop the column `longitude` on the `GooglePlaces` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GooglePlaces" DROP COLUMN "longitude",
ADD COLUMN     "longtitude" DOUBLE PRECISION,
ALTER COLUMN "latitude" DROP NOT NULL;
