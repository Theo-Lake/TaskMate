/*
  Warnings:

  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HashtagsToJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TaskTypes" AS ENUM ('tutoring', 'delivery', 'freelance', 'moving', 'tech_support', 'general', 'other');

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_publisherID_fkey";

-- DropForeignKey
ALTER TABLE "JobAssignment" DROP CONSTRAINT "JobAssignment_jobID_fkey";

-- DropForeignKey
ALTER TABLE "JobAssignment" DROP CONSTRAINT "JobAssignment_userId_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagsToJob" DROP CONSTRAINT "_HashtagsToJob_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagsToJob" DROP CONSTRAINT "_HashtagsToJob_B_fkey";

-- DropTable
DROP TABLE "Job";

-- DropTable
DROP TABLE "JobAssignment";

-- DropTable
DROP TABLE "_HashtagsToJob";

-- DropEnum
DROP TYPE "JobTypes";

-- CreateTable
CREATE TABLE "Task" (
    "taskID" SERIAL NOT NULL,
    "publisherID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TaskTypes" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'not_Complete',
    "payment" DECIMAL(65,30) NOT NULL,
    "completedDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("taskID")
);

-- CreateTable
CREATE TABLE "TaskAssignment" (
    "assignmentID" SERIAL NOT NULL,
    "taskID" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TaskAssignment_pkey" PRIMARY KEY ("assignmentID")
);

-- CreateTable
CREATE TABLE "_HashtagsToTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_HashtagsToTask_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_HashtagsToTask_B_index" ON "_HashtagsToTask"("B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_publisherID_fkey" FOREIGN KEY ("publisherID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssignment" ADD CONSTRAINT "TaskAssignment_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "Task"("taskID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssignment" ADD CONSTRAINT "TaskAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagsToTask" ADD CONSTRAINT "_HashtagsToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "Hashtags"("hashtagID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagsToTask" ADD CONSTRAINT "_HashtagsToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("taskID") ON DELETE CASCADE ON UPDATE CASCADE;
