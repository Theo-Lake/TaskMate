-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('pending', 'accepted', 'rejected');

-- AlterTable
ALTER TABLE "TaskAssignment" ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'pending';
