/*
  Warnings:

  - You are about to drop the column `userId` on the `TaskAssignment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskID,publisherID]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[assignmentID,assigneeID]` on the table `TaskAssignment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assigneeID` to the `TaskAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TaskAssignment" DROP CONSTRAINT "TaskAssignment_userId_fkey";

-- AlterTable
ALTER TABLE "TaskAssignment" DROP COLUMN "userId",
ADD COLUMN     "assigneeID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicture" TEXT NOT NULL DEFAULT 'null';

-- CreateIndex
CREATE UNIQUE INDEX "Task_taskID_publisherID_key" ON "Task"("taskID", "publisherID");

-- CreateIndex
CREATE UNIQUE INDEX "TaskAssignment_assignmentID_assigneeID_key" ON "TaskAssignment"("assignmentID", "assigneeID");

-- AddForeignKey
ALTER TABLE "TaskAssignment" ADD CONSTRAINT "TaskAssignment_assigneeID_fkey" FOREIGN KEY ("assigneeID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
