/*
  Warnings:

  - You are about to drop the column `longtitue` on the `GooglePlaces` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `GooglePlaces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GooglePlaces" DROP COLUMN "longtitue",
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
