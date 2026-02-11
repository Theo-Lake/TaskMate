/*
  Warnings:

  - You are about to drop the column `DueDate` on the `Job` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "DueDate",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;
