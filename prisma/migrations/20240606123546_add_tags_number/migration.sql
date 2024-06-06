-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
