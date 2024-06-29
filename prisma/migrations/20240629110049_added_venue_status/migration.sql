-- CreateEnum
CREATE TYPE "VenueStatus" AS ENUM ('COMING_SOON', 'OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "status" "VenueStatus" NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "venueType" TEXT NOT NULL DEFAULT '';
