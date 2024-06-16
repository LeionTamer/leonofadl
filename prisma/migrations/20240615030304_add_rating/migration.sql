-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'MYTHIC');

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "rating" "Rating" NOT NULL DEFAULT 'COMMON';
