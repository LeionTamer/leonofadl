/*
  Warnings:

  - You are about to drop the `GooglePlaces` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `leonNotes` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Made the column `website` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'FRIEND');

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "leonNotes" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "website" SET NOT NULL;

-- DropTable
DROP TABLE "GooglePlaces";
