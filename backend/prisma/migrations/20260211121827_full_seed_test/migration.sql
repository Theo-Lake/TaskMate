/*
  Warnings:

  - The values [pedning] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('complete', 'pending', 'in_Progress', 'not_Complete', 'cancelled');
ALTER TABLE "public"."Job" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
ALTER TABLE "Job" ALTER COLUMN "status" SET DEFAULT 'not_Complete';
COMMIT;

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_publisherID_fkey";

-- DropForeignKey
ALTER TABLE "JobAssignment" DROP CONSTRAINT "JobAssignment_jobID_fkey";

-- AlterTable
ALTER TABLE "Hashtags" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_publisherID_fkey" FOREIGN KEY ("publisherID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobAssignment" ADD CONSTRAINT "JobAssignment_jobID_fkey" FOREIGN KEY ("jobID") REFERENCES "Job"("jobID") ON DELETE CASCADE ON UPDATE CASCADE;
